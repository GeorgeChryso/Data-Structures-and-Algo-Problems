// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.





// Binary search for the correct answer
// if n effort is possible, search below it,else search above it
// O(M*NlogW)
var minimumEffortPath = function(heights) {
    let n=heights.length,m=heights[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        lo=0,hi=1e6,result=Infinity

    //iterative dfs
    let dfs=(effort)=>{
        let seen=new Set(),stack=[[0,0]]
        seen.add([0,0].toString())
        while(stack.length){
            let [r,c]=stack.pop()
            if(r==n-1&&c==m-1) //reached my target with maxEffort<=effort
                return true

            for (const [dx,dy] of moves) 
                if( r+dx>=0&&r+dx<n&&c+dy>=0&&c+dy<m  &&   //inbound neighbor
                    !seen.has([r+dx,c+dy].toString()) &&    // not  explored
                    Math.abs(heights[r+dx][c+dy]-heights[r][c])<=effort //with good diff
                    )
                    seen.add([r+dx,c+dy].toString()), //explore it 
                    stack.push([r+dx,c+dy])
        }
        return false
    }

    while(lo<=hi){
        let mid=(lo+hi)>>1
        if(dfs(mid))//is mid possible? through dfs
            result=Math.min(result,mid),
            hi=mid-1
        else
            lo=mid+1
    }

    return result
};




//dijkstras
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

var minimumEffortPath = function(A) {
    let n=A.length,m=A[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        distance=[...Array(n)].map(d=>[...Array(m)].map(d=>Infinity))
        pq=new minBinaryHeap()
    pq.comparator=( (a,b)=>a[0]-b[0])

    pq.push([0,0,0])
    distance[0][0]=0
    while(pq.length()){
        let [d,i,j]=pq.poll()
        if(i==n-1&&j==m-1)
            return d
        for (const [dx,dy] of moves) 
            if( i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m){
                let ni=i+dx,nj=j+dy,
                    nd=Math.max(d,Math.abs(A[ni][nj]-A[i][j]))
                if(nd<distance[ni][nj])
                    distance[ni][nj]=nd,
                    pq.push([nd,ni,nj])

            }
    }
};



// Kruskal's DSU
class UnionFind {

    constructor(size){
        //the total count of different elements(not groups) in this union find
        this.count=size
        //tracks the sizes of each of the components(groups/sets)
        //groupsize[a] returns how many elements the component with root a has 
        this.groupSize=[...Array(size)] 
        //number of components(groups) in the union find
        this.numComponents=size
        //points to the parent of i, if parent[i]=i, i is a root node
        this.parent=[...Array(size)]  //which is also the index of the group

        //put every element into its own group
        // rooted at itself
        for (let i = 0; i < size; i++) {
            this.groupSize[i]=i     
            this.parent[i]=i            
        }
    }

    //returns to which component (group) my element belongs to 
    // α(n) --Amortized constant time 
    // Update: Also compresses the paths so that each child points to its 
    // parent
    find(element){
        let root=element
        //find the parent of the group the elemnt belongs to
        // When root===parent[root] is always the parent of that group (root)
        while(root!=this.parent[root])
            root=this.parent[root]

        // Compression, point the element to its parent if its not already pointed
        // Tldr: Not only do I point my element to its actual root, i point any
        // inbetween elements to that root aswell
        while(element!=root){
            let next=this.parent[element]
            this.parent[element]=root
            element=next
        }
        
        return root
    }   

    //Unifies the sets containing A and B
    // if not already unified 
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A) //parent of A
            ,root2=this.find(B) //parent of B
        if(root1===root2) //already unified
            return
        // I want to put the set with fewer elements 
        // to the one with more elemenets
        if(this.groupSize[root1]<this.groupSize[root2]){
            this.groupSize[root2]+=this.groupSize[root1]
            this.parent[root1]=this.parent[root2]
        }
        else {
            this.groupSize[root1]+=this.groupSize[root2]
            this.parent[root2]=this.parent[root1]
        }

        this.numComponents-- //cos 1 less group, since i merged 2
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}
var minimumEffortPath = function(A) {
    let n=A.length,m=A[0].length,
        moves=[[0,1],[0,-1],[1,0],[-1,0]],
        distance=[...Array(n)].map(d=>[...Array(m)].map(d=>Infinity))
    
};
console.log(minimumEffortPath(
    [[1,2,2],[3,8,2],[5,3,5]]
))