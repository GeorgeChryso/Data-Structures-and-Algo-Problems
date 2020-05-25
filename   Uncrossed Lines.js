// We write the integers of A and B (in the order they are given) on two separate horizontal lines.

// Now, we may draw connecting lines: a straight line connecting two numbers A[i] and B[j] such that:

// A[i] == B[j];
// The line we draw does not intersect any other connecting (non-horizontal) line.
// Note that a connecting lines cannot intersect even at the endpoints: each number can only belong to one connecting line.

// Return the maximum number of connecting lines we can draw in this way.

 


// LCS-like DP
var maxUncrossedLines = function(A, B) {
    let dp=[...Array(A.length+1)].map(d=>[...Array(B.length+1)].map(q=>0))

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

console.log(maxUncrossedLines(
    [1,4,2],
[1,2,4]
))