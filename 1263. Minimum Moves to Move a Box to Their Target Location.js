

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
// 0-1 BFS
// 0 represents the cost of distance travelled by the human
// 1 represents the cost  of pushes the human has to perform to the box
var minPushBox = function(G) {

    //find T target S start and B box 
    let T,S,B
    for (let i = 0; i < G.length; i++) {
        for (let j = 0; j < G[i].length; j++) {
            if(G[i][j]==='T')T=[i,j]
            if(G[i][j]==='B')B=[i,j]
            if(G[i][j]==='S')S=[i,j]
        }        
    }


    let seen=[...Array(G.length)].map(d=>[...Array(G[0].length)].map(d=>new Set()))
    let distances=[ [0,1],[0,-1],[1,0],[-1,0] ]

    let q=[ [S,B,0] ]
    while(q.length){

        let temp=[]

        while(q.length){

        
            let [[ci,cj],[bi,bj],steps]=q.shift()

            let areValid=(i,j)=>i<G.length&&i>=0&&j<G[0].length&&j>=0&&G[i][j]!=='#'&&(i!==bi||j!==bj)


            if(seen[ci][cj].has(''+bi+','+bj+','+steps+''))continue

            seen[ci][cj].add(''+bi+','+bj+','+steps+'')

            if(bi===T[0]&&bj===T[1])return steps
            

            for (const [x,y] of distances) {
            
                if( areValid(ci+x,cj+y) ){
                    temp.push([[ci+x,cj+y],[bi,bj],steps])
                }
                if(ci+x===bi && cj+y===bj && areValid(bi+x,bj+y))temp.push([[bi,bj],[bi+x,bj+y],steps+1])

            }
        
        }
        q=temp
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
        

        [
            [".",".","#",".",".",".",".","#"],
            [".","B",".",".",".",".",".","#"],
            [".",".","S",".",".",".",".","."],
            [".","#",".",".",".",".",".","."],
            [".",".",".",".",".",".",".","."],
            [".",".",".","T",".",".",".","."],
            [".",".",".",".",".",".",".","#"],
            [".","#",".",".",".",".",".","."]
        ]

    )
)


