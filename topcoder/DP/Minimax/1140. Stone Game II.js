
// Alex and Lee continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 

// Alex and Lee take turns, with Alex starting first.  Initially, M = 1.

// On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).

// The game continues until all the stones have been taken.

// Assuming Alex and Lee play optimally, return the maximum number of stones Alex can get.



// recursion O(n^3) + memoization
var stoneGameII = (A) => {
    let n = A.length,
        prefixSum = [0]
    for (let i = 0; i < n; i++)
        prefixSum.push(prefixSum[prefixSum.length - 1] + A[i])
    let sumfromto = (i, j) => prefixSum[j + 1] - prefixSum[i]

    let dp = [...Array(n+1)].map(d => [...Array(n+1)])
    //dp[i][m]= The max difference the curr palyer can achieve with M=m over his opponent,
    // from i  onwards

    let getMaxDiff=(i,M)=>{
        if(i>=n) 
            return 0 //the max diff is 0
        if(dp[i][M]===undefined){
            dp[i][M]=-Infinity
            for (let x = 1; x <=2*M&&i+x<=n; x++) //the first player chooses a number X from 1 to 2M
                //the second player will choose a number between 1 and 2*X, essentially raising the upper bound
                // of his choices
                dp[i][M]=Math.max(dp[i][M],sumfromto(i,i+x-1)-getMaxDiff(i+x,Math.max(x,M)) )            
        }      
        return dp[i][M]
    }

    let delta=getMaxDiff(0,1), // delta=my_score-opponet_score
        totalSum=prefixSum[n] // total=my_score+opponetnt_score
    return (delta +totalSum)/2// my_score=(delta+total)/2
}


var stoneGameII = (A) => {
    let n = A.length,
        prefixSum = [0]
    for (let i = 0; i < n; i++)
        prefixSum.push(prefixSum[prefixSum.length - 1] + A[i])
    let sumfromto = (i, j) => prefixSum[j + 1] - prefixSum[i]

    let dp = [...Array(n+1)].map(d => [...Array(n+1)].map(d => -Infinity))
    //dp[i][m]= The max difference the curr palyer can achieve with M=m over his opponent
    // from i: onwards

    //basecase
    for (let m = 0; m <= n; m++)
        dp[n][m] = 0

    for(let i = n - 1; i >= 0; i--)
        for(let M = 1; M <= n; M++) //for each potential M 
            for(let x = 1; x <= 2 * M && i + x <= n; x++) // THe current player can choose a number x
                //take the x first stones, but then the opponent will immediately choose
                // the next best choice, which is dp[i+x][Math.max(x,M)], making the difference:
                dp[i][M] = Math.max(dp[i][M], sumfromto(i,i+x-1) - dp[i + x][Math.max(x, M)]);
            
        
    return (prefixSum[n]+dp[0][1] )/2
}
console.log(stoneGameII(
    [1, 2, 3, 4, 5, 100]
    //[2,7,9,4,4]
)
)