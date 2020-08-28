// Suppose you had an n by n chess board and a super piece called a kingknight. Using only one move the kingknight denoted 'K' below can reach any of the spaces denoted 'X' or 'L' below:
// .......
// ..L.L..
// .LXXXL.
// ..XKX..
// .LXXXL.
// ..L.L..
// .......
// In other words, the kingknight can move either one space in any direction (vertical, horizontal or diagonally) or can make an 'L' shaped move. An 'L' shaped move involves moving 2 spaces horizontally then 1 space vertically or 2 spaces vertically then 1 space horizontally. In the drawing above, the 'L' shaped moves are marked with 'L's whereas the one space moves are marked with 'X's. In addition, a kingknight may never jump off the board.


// Given the size of the board, the start position of the kingknight and the end position of the kingknight, your method will return how many possible ways there are of getting from start to end in exactly numMoves moves. start and finish are int[]s each containing 2 elements. The first element will be the (0-based) row position and the second will be the (0-based) column position. Rows and columns will increment down and to the right respectively. The board itself will have rows and columns ranging from 0 to size-1 inclusive.

//!!!
// Note, two ways of getting from start to end are distinct if their respective move sequences differ in any way. In addition, you are allowed to use spaces on the board (including start and finish) repeatedly during a particular path from start to finish. We will ensure that the total number of paths is less than or equal to 2^63-1 (the upper bound for a long).


// Constraints
// -	size will be between 3 and 100 inclusive
// -	start will contain exactly 2 elements
// -	finish will contain exactly 2 elements
// -	Each element of start and finish will be between 1 and size-1 inclusive
// -	numMoves will be between 1 and 50 inclusive
// -	The total number of paths will be at most 2^63-1.


//classic DP
let SuperKing=(N,start,finish,numMoves)=>{
    let [sx,sy]=start,[ex,ey]=finish
    let moves=[[-2,-1],[-2,1],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-1],[0,1],[1,-2],[1,-1],[1,0],[1,2],[2,-1],[2,1]]

    let dp1=[...Array(N)].map(d=>[...Array(N)].map(d=>0))
    let dp2=[...Array(N)].map(d=>[...Array(N)].map(d=>0))

    //basecase
    dp1[sx][sy]=1//already at this poosition
    dp2[sx][sy]=1//already at this poosition

    for (let k = 0; k < numMoves; k++) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j <N; j++) {
               for (const [dx,dy] of moves) {
                 if(i-dx>=0&&i-dx<N&&j>=dy&&j-dy<N)
                    dp2[i][j]+=dp1[i-dx][j-dy]      
               }
            }            
        }
        dp1=dp2
    }

    return dp2[ex][ey]
}


let tests=[
    [3,[0,0],[1,0],1],//1
    [3,[0,0],[1,2],1],//1
    [3,[0,0],[2,2],1],//0
    [3,[0,0],[0,0],2],//5
    [100,[0,0],[0,99],50]//243 097 320 072 600
]

tests.forEach(
    ([N,S,F,M])=>console.log(SuperKing(N,S,F,M))
)