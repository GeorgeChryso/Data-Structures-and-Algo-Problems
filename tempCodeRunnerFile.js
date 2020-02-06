var climbStairs = function(n) {

    //3 because its either 0, 1 or 2 
    let dp=Array(3).fill(null).map(d=>Array(n+1).fill(0))

    // dp[i][j] is how many distinct ways Can i reach cell j using i steps

    //base case 
    dp[0][0]=1
        for (let j = 0; j < dp[i].length; j++) {
            for (let i = 0; i < 3; i++) {
                if(j>=i)dp[i][j]+=dp[i][j-i]
            }
        }        
    
    return dp[0][n]+dp[1][n]+dp[2][n]

};