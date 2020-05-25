var maxUncrossedLines = function(A, B) {
    let dp=[...Array(A.length+1)].map(d=>Array(B.length+1).map(q=>0))

    let m = A.length, n = B.length

    for(let i = 1; i <= m; ++i){
        
        for(let j = 1; j <= n; ++j){
            if (A[i - 1] == B[j - 1])
            dp[i][j] = 1 + dp[i - 1][j - 1];
       else
            dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
    }

            
    return dp[m][n];
};