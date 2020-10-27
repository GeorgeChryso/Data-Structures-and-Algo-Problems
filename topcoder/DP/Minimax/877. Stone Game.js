// Alex and Lee play a game with piles of stones.  There are an even number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].

// The objective of the game is to end with the most stones.  The total number of stones is odd, so there are no ties.

// Alex and Lee take turns, with Alex starting first.  Each turn, a player takes the entire pile of stones from either the beginning or the end of the row.  This continues until there are no more piles left, at which point the person with the most stones wins.

// Assuming Alex and Lee play optimally, return True if and only if Alex wins the game


//minimax : dp[i][j] the maximum difference the current player can achieve over his opponent
            // if he has to choose in the interval [i,j]
var stoneGame = function(A) {
    let n=A.length,
        dp=[...Array(n)].map(d=>[...Array(n)].map(d=>-Infinity))

    for (let i = 0; i < n; i++) 
        dp[i][i]=0       
    
    for (let len = 2; len <= n; len++) 
        for (let i = 0; i <= n-len; i++) 
            j=i+len-1,                
            // minus here, because the opponent will choose the next best course of action
            // which in the first case will be dp[i+1][j] and the second case dp[i][j-1]
            dp[i][j]=Math.max(dp[i][j],A[i]-dp[i+1][j],A[j]-dp[i][j-1])

    return dp[0][n-1]>0
};
console.log( stoneGame(
    [5,3,4,5]

))