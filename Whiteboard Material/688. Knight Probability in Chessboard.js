// On an NxN chessboard, a knight starts at the r-th row and c-th column and attempts to make exactly K moves. The rows and columns are 0 indexed, so the top-left square is (0, 0), and the bottom-right square is (N-1, N-1).

// A chess knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.






// Well it was a knapsack, but The formula was difficult.
var knightProbability = function(N, K, r, c) {
    let previous=Array(N).fill(null).map(d=>Array(N).fill(0))
    previous[r][c]=1 //probability of reaching cell i j
    //Let previous[r][c] be the probability of being on square (r, c) after steps steps. Based on how a knight moves, we have the following recursion:
    //next[r][c]=Sum(...previous[r+dr][c+dc])/8
    for (var time = 0; time < K; time++) {
        let next=Array(N).fill(null).map(d=>Array(N).fill(0))
        for (let i = 0; i < N; i++) {
            for (let j = 0; j< N; j++) {
                let q= [
                    [i-2,j-1],
                    [i-2,j+1],
                    [i-1,j-2],
                    [i-1,j+2],
                    [i+1,j-2],
                    [i+1,j+2],
                    [i+2,j-1],
                    [i+2,j+1],
                ]
                q.forEach(([a,b])=>
                    next[i][j]+=a<0||b<0||a>=N||b>=N?0:(previous[a][b]/8) //thats the most important line.
                )
            }            
        }
        console.log(next)
        previous=next
    }


    return previous.reduce((acc,curr)=>acc+curr.reduce((a,b)=>a+b),0) 
};
console.log(
    knightProbability(3,2,0,0)
)