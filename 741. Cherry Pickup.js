// You are given an n x n grid representing a field of cherries, each cell is one of three possible integers.

// 0 means the cell is empty, so you can pass through,
// 1 means the cell contains a cherry that you can pick up and pass through, or
// -1 means the cell contains a thorn that blocks your way.
// Return the maximum number of cherries you can collect by following the rules below:

// Starting at the position (0, 0) and reaching (n - 1, n - 1) by moving right or down through valid path cells (cells with value 0 or 1).
// After reaching (n - 1, n - 1), returning to (0, 0) by moving left or up through valid path cells.
// When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell 0.
// If there is no valid path between (0, 0) and (n - 1, n - 1), then no cherries can be collected.


// n == grid.length
// n == grid[i].length
// 1 <= n <= 50
// grid[i][j] is -1, 0, or 1.
// grid[0][0] != -1
// grid[n - 1][n - 1] != -1

var cherryPickup = function(A) {
    let [n,m]=[A.length,A[0].length],
        dp=[...Array(2*n)].map(d=>[...Array(n)].map(d=>[...Array(n)].map(d=>-Infinity)))
        dp[0][0][0]=A[0][0]
    //dp[i][i1][i2]
    let dirs=[[0,-1],[-1,0]]
    for(let i=1;i<dp.length;i++)
        for (let i1 = 0; i1 <= i; i1++) n
            for (let i2 = 0; i2 <= i; i2++) 
                for( let [dx1,dx2] of dirs)
                    for( let [dx3,dx4] of dirs){
                        let j2=Math.abs(i-i2),j1=Math.abs(i-i1)
                        if(i1+dx1>=0&&i2+dx3>=0&&j1+dx2>=0&&j2+dx4>=0&&i1+dx1<n&&j1+dx2<n&&i2+dx3<n&&j2+dx4<n&&A[i1+dx1][j1+dx2]!==-1&&A[i2+dx3][j2+dx4]!==-1&&i1<n&&j1<n&&j2<n&&i2<n)
                        dp[i][i1][i2]=Math.max(
                            dp[i][i1][i2],
                            dp[i-1][i1+dx1][i2+dx3]+ A[i1][j1] + Number(i2!==i1&&j2!==j1)*A[i2][j2]
                        )
                    }
    return Math.max(0,dp[2*n-2][n-1][n-1])
};
console.log(
    cherryPickup(
        [[1,1,1,1,1,1,0,1,1,-1,-1,1,1,-1,0,1,1,-1,0,-1],[1,1,1,0,1,1,0,1,0,1,1,-1,1,1,1,1,-1,0,1,0],[1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,-1],[1,1,1,0,0,-1,1,1,1,1,0,1,1,0,1,1,-1,1,1,1],[1,-1,-1,1,0,0,1,1,0,1,1,1,1,1,1,0,-1,1,1,1],[1,-1,1,0,1,-1,-1,0,1,-1,1,1,0,1,1,1,1,1,-1,1],[0,0,-1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1],[1,0,-1,1,0,1,1,1,0,1,0,0,1,-1,1,1,1,1,-1,1],[0,-1,0,1,1,1,1,1,1,-1,-1,1,1,1,0,1,1,1,1,0],[1,1,1,1,1,0,0,1,1,1,1,0,1,1,-1,0,-1,0,1,0],[0,1,-1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,-1,0],[0,0,1,1,1,1,1,0,0,1,1,1,1,-1,1,1,1,0,1,-1],[1,1,1,1,1,-1,1,1,0,1,1,1,1,1,1,-1,-1,0,1,0],[-1,-1,1,1,-1,1,1,1,1,1,1,1,-1,1,0,0,1,0,1,1],[0,1,-1,-1,1,-1,0,1,1,-1,-1,1,1,1,0,1,0,-1,1,-1],[1,1,1,-1,1,-1,1,1,0,-1,1,1,1,1,1,1,1,1,1,-1],[1,1,-1,1,1,1,1,1,1,1,0,-1,1,-1,1,1,1,1,1,1],[1,1,1,-1,0,1,0,-1,1,0,1,1,1,0,1,1,1,0,0,1],[1,1,0,0,-1,1,1,0,-1,1,1,1,1,-1,1,1,0,-1,0,1],[0,0,0,1,1,1,-1,1,0,1,0,1,1,0,1,0,0,1,1,1]]  )
)