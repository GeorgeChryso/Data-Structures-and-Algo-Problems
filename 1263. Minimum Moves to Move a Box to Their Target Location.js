// Storekeeper is a game in which the player pushes boxes around in a warehouse trying to get them to target locations.

// The game is represented by a grid of size m x n, where each element is a wall, floor, or a box.

// Your task is move the box 'B' to the target position 'T' under the following rules:

// Player is represented by character 'S' and can move up, down, left, right in the grid if it is a floor (empy cell).
// Floor is represented by character '.' that means free cell to walk.
// Wall is represented by character '#' that means obstacle  (impossible to walk there).
// There is only one box 'B' and one target cell 'T' in the grid.
// The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a push.
// The player cannot walk through the box.
// Return the minimum number of pushes to move the box to the target. If there is no way to reach the target, return -1.

// Solution 1:
// Standard BFS with 2 reduntant branches optimizations TLEs.. Way to go
var minPushBox = function(G) {
    //find T target S start and B box
    let T, S, B;
    for (let i = 0; i < G.length; i++) {
        for (let j = 0; j < G[i].length; j++) {
            if (G[i][j] === 'T') T = [i, j];
            if (G[i][j] === 'B') B = [i, j];
            if (G[i][j] === 'S') S = [i, j];
        }
    }

    let seen = [...Array(G.length)].map(d =>
        [...Array(G[0].length)].map(d => new Set())
    );
    let directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    let result = Infinity;

    let q = [[S, B, 0]];
    while (q.length) {
        let [[ci, cj], [bi, bj], steps] = q.shift();

        let areValid = (i, j) =>
            i < G.length &&
            i >= 0 &&
            j < G[0].length &&
            j >= 0 &&
            G[i][j] !== '#' &&
            (i !== bi || j !== bj);
        

        // Trim Unnecessary Paths logic
        // Seen paths are reduntant
        // Paths with higher amount of steps than curr best are reduntant
        //
        if (
            seen[ci][cj].has('' + bi + ',' + bj + ',' + steps + '')||steps>result
            ) continue;

        seen[ci][cj].add('' + bi + ',' + bj + ',' + steps + '');

        if (bi === T[0] && bj === T[1]){
            result = Math.min(result, steps);
        } 

        for (const [x, y] of directions) {
            // just move
            if (areValid(ci + x, cj + y)) {
                q.push([[ci + x, cj + y], [bi, bj], steps]);
            }
            //push the box
            if (ci + x === bi && cj + y === bj && areValid(bi + x, bj + y)) {
                q.push([[bi, bj], [bi + x, bj + y], steps + 1]);
            }
        }
    }
    return result===Infinity?-1:result
};



class minBinaryHeap{
    constructor(){
        this.heap=[]
        //this is the simplest comparator between a and b and returns 
        // a positive number if a >b
        // a negative number if a < b
        // or 0 when a ===b, 
        // adjusting this for every situation will allow me to use heaps outside of the 
        // just numbers context
        this.comparator=(a,b)=>a-b
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length

    peek=()=>this.heap[0]

    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))<0)){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1)return this.heap.pop()

        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&(this.comparator(this.heap[index],this.getLeftChild(index))>0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))>0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))<=0){
                    //and swap
                    this.swap(index,index*2+1)
                    index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  this.swap(index,index*2+2)
                  index=index*2+2

                }
                
            }
        }
    }
    swap=(a,b)=>{
        if(a===b)return
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}

// A star search (Heuristic: Manhattan Distance)
var minPushBox = function(G) {
    //find T target S start and B box
    let T, S, B;
    for (let i = 0; i < G.length; i++) {
        for (let j = 0; j < G[i].length; j++) {
            if (G[i][j] === 'T') T = [i, j];
            if (G[i][j] === 'B') B = [i, j];
            if (G[i][j] === 'S') S = [i, j];
        }
    }
    
    //Manhattan Distance
    let heuristic=([x,y])=>Math.abs(x-T[0])+Math.abs(y-T[1])

    let directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];


    let seen = [...Array(G.length)].map(d =>
        [...Array(G[0].length)].map(d => new Set())
    );


    let pq=new minBinaryHeap()
    pq.comparator=(a,b)=>a[0]-b[0]


    pq.push([heuristic([S[0],S[1]]),S,B,0])

    while (pq.length()) {

        let [_,[ci, cj], [bi, bj], steps] = pq.poll();


        if (bi === T[0] && bj === T[1]){
            return steps
        } 
        if ( seen[ci][cj].has('' + bi + ',' + bj ))continue;

        seen[ci][cj].add('' + bi + ',' + bj );

        let areValid = (i, j) =>
            i < G.length &&
            i >= 0 &&
            j < G[0].length &&
            j >= 0 &&
            G[i][j] !== '#' 
        

        for (const [x, y] of directions) {
            let new_person=[ci + x, cj + y]
            if(!areValid(new_person[0],new_person[1]))continue        
            //push the box
            if (ci + x === bi && cj + y === bj && areValid(bi + x, bj + y)) {
                pq.push([ heuristic([bi + x, bj + y])+steps+1,[bi, bj], [bi + x, bj + y], steps + 1]);
                continue
            }
            if (areValid(ci + x, cj + y)) {
                pq.push([heuristic([ci + x, cj + y])+steps,[ci + x, cj + y], [bi, bj], steps]);
            }
        }
    }
    return -1
};



console.log(
    minPushBox(
        // [
        //     ["#",".",".","#","#","#","#","#"],
        //     ["#",".",".","T","#",".",".","#"],
        //     ["#",".",".",".","#","B",".","#"],
        //     ["#",".",".",".",".",".",".","#"],
        //     ["#",".",".",".","#",".","S","#"],
        //     ["#",".",".","#","#","#","#","#"]

        // ]

        // [
        //     ['.', '.', '#', '.', '.', '.', '.', '#'],
        //     ['.', 'B', '.', '.', '.', '.', '.', '#'],
        //     ['.', '.', 'S', '.', '.', '.', '.', '.'],
        //     ['.', '#', '.', '.', '.', '.', '.', '.'],
        //     ['.', '.', '.', '.', '.', '.', '.', '.'],
        //     ['.', '.', '.', 'T', '.', '.', '.', '.'],
        //     ['.', '.', '.', '.', '.', '.', '.', '#'],
        //     ['.', '#', '.', '.', '.', '.', '.', '.']
        // ]

        [
            ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
            ["#",".",".",".",".",".",".",".",".",".",".",".","#","#","#","#"],
            ["#",".","#","#","#","#",".","#","#","#","#",".","#","#","#","."],
            ["#",".",".",".",".",".",".","#","T","#",".",".","#","#","#","."],
            ["#",".",".",".","#",".",".",".",".",".",".",".","#","#","#","."],
            ["#",".",".",".",".",".","B",".",".",".",".",".","#","#","#","."],
            ["#",".","#","#","#","#","#","#","#","#","#",".","#","#","#","."],
            ["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],
            ["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],
            ["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],
            ["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],
            ["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],
            ["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],
            ["#",".",".",".",".",".",".",".","S",".",".",".",".",".",".","."],
            ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]
        ]
    )
);
