
// Alex and Lee continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 

// Alex and Lee take turns, with Alex starting first.  Initially, M = 1.

// On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).

// The game continues until all the stones have been taken.

// Assuming Alex and Lee play optimally, return the maximum number of stones Alex can get.





var stoneGameII=(A)=>{
    let n=A.length,
        prefixSum=[0]
    for (let i = 0; i < n; i++) 
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])        
    let sumfromto=(i,j)=>prefixSum[j+1]-prefixSum[i]

    let dp=[...Array(n)].map(d=>[...Array((n+1)>>1)].map(d=>-Infinity))
    //dp[i][m]= The max difference the curr palyer can achieve with M=m over his opponent
    // from i: onwards


    //basecase
    for (let m = 1; m <= (n)>>1 ; m++) 
        for (let i = n-1; i>=n-m; i--){
            dp[i][m]=sumfromto(i,n-1)            
        }
        
    for (let i = n-1; i >=0; i--) 
        for (let m = 1; m <=(n>>1); m++) // the max m at any time can be n/2 at most
            for (let x = 1; x <=2*m&&i+x<n; x++) 
                dp[i][m]=Math.max(dp[i][m],sumfromto(i,i+x) - dp[i+x][Math.max(m,x)])           
    console.log(dp)
    return dp[0][1] 
}

    console.log(stoneGameII(
        [2,7,9,4,4]
        )
    )