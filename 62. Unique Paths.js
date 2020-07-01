// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

// How many possible unique paths are there?


// backtracking-TLE? cos there s no memoization
var uniquePaths=(m,n)=>{
    if (m==1&&n==1)return 1
    if (m<1||n<1)return 0
    let cur=0
    if(m>=2)cur+=uniquePaths(m-1,n)
    if(n>=2)cur+=uniquePaths(m,n-1)
    return cur
}

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
//1 row space dp optimization
var uniquePaths = function(m, n) {
    
    let dp=Array(n).fill(null).map(d=>0)

    dp[0]=1// Im already at the start

    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
             dp[j]+=dp[j-1]
        }        
    }

    return dp[n-1]
};


// Combinatorics problem.
// To get to the target, the robot needs to move exactly m-1+ n-1 steps. 
// wE NEED THE TOTAL NUMBER OF PERMUTATIONS 
// (m-1+n-1)! /(m-1)!(n-1)!

var uniquePaths = function(m, n) {
    let result=1
    let running=1
    let down=1
    for (let i = 1; i <=m+n-2; i++) {
        running*=i
        if(i===m+n-2)result=running     
        if(i==m-1||i==n-1)down*=running
        if(m==n&&i==m-1)down*=running //case of m===n

    }

    return result/down
};

console.log(uniquePaths(
    3,2
))