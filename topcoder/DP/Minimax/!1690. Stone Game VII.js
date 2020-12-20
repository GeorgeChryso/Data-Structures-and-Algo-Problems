


// interval dp
// dp[i][j] the best diff when the players play on [i,j]
var stoneGameVII = function(A) {
    let prefix=[0],n=A.length
    for(let i=0;i<n;i++)
        prefix.push(prefix[prefix.length-1]+A[i])
    
    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    //basecase
    for(let i=0;i<n;i++)
        dp[i][i]=0
    for (let len = 2; len <= n; len++) 
        for (let i = 0; i <= n-len; i++) 
           j=i+len-1,
          dp[i][j]=Math.max(prefix[j+1]-prefix[i+1]-dp[i+1][j], prefix[j]-prefix[i]-dp[i][j-1])  
        
    
    dp.forEach(d=>console.log(d+''))
    return dp[0][n-1]
};



console.log(stoneGameVII(
    
[5,3,1,4,2]
))