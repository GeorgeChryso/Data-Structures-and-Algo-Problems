// 1771. Maximize Palindrome Length From Subsequences



var lps=A=>{
    let n=A.length,
        dp=[...Array(n)].map((d,i)=>[...Array(n)].map((d,j)=>i===j?1:-Infinity))
    for(let len=2;len<=n;len++)
        for(let i=0;i<n-len+1;i++)
            dp[i][i+len-1]=Math.max(
                    dp[i][i+len-1],
                    A[i]===A[i+len-1]? 
                    (i+1>i+len-2?0:dp[i+1][i+len-2])+2:-Infinity,
                    dp[i+1][i+len-1],
                    dp[i][i+len-2]
                )
    return dp
}
var longestCommonSubsequence = function(A, B) {
    let n=A.length,m=B.length,dp=[...Array(n+1)].map(d=>[...Array(m+1)].map(q=>0))
    for (let i = 1; i <=n; i++) 
        for (let j = 1; j <=m; j++) 
            if(A[i-1]===B[j-1])
                dp[i][j]=dp[i-1][j-1]+1
            else 
                dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])              
    return dp
};

var longestPalindromeUsingBothAandB = function(A, B) {
    let n=A.length,m=B.length,
        lpsA=lps(A),lpsB=lps(B),
        lcs=longestCommonSubsequence(A,[...(B.split(''))].reverse()),
        result=lcs[n][m]!==0?Math.max(lcs[n][m]*2,lcs[n-1][m]*2+1,lcs[n][m-1]*2+1):0

    for(let i=0;i<n;i++)
        if(lcs[i][m]!==0)
            result=Math.max(result,2*lcs[i][m]+lpsA[i][n-1])
    for(let i=0;i<m;i++)
        if(m-1-i>=0&&lcs[n][m-1-i]!==0)
            result=Math.max(result,2*lcs[n][m-1-i]+lpsB[0][i])
    return result
};

console.log(longestPalindromeUsingBothAandB(
    "afaaadacb",
    "ca"
))