// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

// How many possible unique paths are there?



//dp

//Intuition: The number of distinct ways to reach dp[m][n] cell is the sum of distinct ways of reaching the cell on its top and left
var uniquePaths = function(m, n) {
    
    let dp=Array(n).fill(null).map(d=>Array(m).fill(0))

    dp[0][0]=1// Im already at the start

    for (let i = 0; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
             if(i==0&&j==0)continue //base case
             if(j-1>=0)dp[i][j]+=dp[i][j-1] //I can only reach a cell from top
             if(i-1>=0)dp[i][j]+=dp[i-1][j] // or left side
        }        
    }

    return dp[n-1][m-1]
};

// backtracking

