// There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

// In each round of the game, Alice divides the row into two non-empty rows (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice's score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.

// The game ends when there is only one stone remaining. Alice's is initially zero.

// Return the maximum score that Alice can obtain.
// Example 1:

// Input: stoneValue = [6,2,3,4,5,5]
// Output: 18
// Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11.
// In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5).
// The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.
// Example 2:

// Input: stoneValue = [7,7,7,7,7,7,7]
// Output: 28
// Example 3:

// Input: stoneValue = [4]
// Output: 0
 

// Constraints:

// 1 <= stoneValue.length <= 500
// 1 <= stoneValue[i] <= 10^6


// prefix sum, + interval dp 
var stoneGameV = function(stoneValue) {
    // prefix Sum for O(1) range sum queries
    let prefixSum=[0],n=stoneValue.length
    for(let i=0;i<n;i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+stoneValue[i])

    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))

    //basecases
    for(let i=0;i<n;i++)
        dp[i][i]=0
    
    for (let len = 2; len <= n; len++) 
        for (let i = 0; i <n-len+1; i++) {
            let j=i+len-1
            for (let k = 0; k < j; k++) {
                let leftSum=prefixSum[k+1]-prefixSum[i],
                    rightSum=prefixSum[j+1]-prefixSum[k+1]
                // only take the minimum prefixsum choice every time
                if(leftSum>rightSum) //you can only pick right
                    dp[i][j]=Math.max(dp[i][j],dp[k+1][j]+rightSum)
                else if(leftSum<rightSum)
                    dp[i][j]=Math.max(dp[i][j],dp[i][k]+leftSum)
                else
                    //if they re equal, we need to consider the overall gain instead
                    // cos we re considering both intervals
                    dp[i][j]=Math.max(
                                    dp[i][j],
                                    dp[i][k]+leftSum,
                                    dp[k+1][j]+rightSum
                                )
            }            
        }        
    return dp[0][n-1]
};
        

//Knuth Optimization
var stoneGameV = function(stoneValue) {
    let prefixSum=[0],n=stoneValue.length
    for(let i=0;i<n;i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+stoneValue[i])

    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0)),
            h=[...Array(n)].map(d=>[...Array(n)].map(d=>0)) //argmax(dp[i][j])

    for(let i=0;i<n;i++)
        dp[i][i]=0,
        h[i][i]=i
    
    for (let len = 2; len <= n; len++) 
        for (let i = 0; i <n-len+1; i++) {
            let j=i+len-1
            for (let k = Math.max(h[i][j-1]-1,0); k < Math.min(j,h[i+1][j]+2); k++) {
                let leftSum=prefixSum[k+1]-prefixSum[i],
                    rightSum=prefixSum[j+1]-prefixSum[k+1]
                if(leftSum>rightSum) 
                    if(dp[i][j]<dp[k+1][j]+rightSum)
                        dp[i][j]=dp[k+1][j]+rightSum,
                        h[i][j]=k
                    
                if(leftSum<rightSum)
                    if(dp[i][j]<dp[i][k]+leftSum)
                        dp[i][j]=dp[i][k]+leftSum,
                        h[i][j]=k
                    
                if(leftSum===rightSum)
                    if(dp[i][j]<Math.max(dp[i][k]+leftSum,dp[k+1][j]+rightSum))
                        dp[i][j]=Math.max(dp[i][k]+leftSum,dp[k+1][j]+rightSum),
                        h[i][j]=k
            }            
        }        

    return dp[0][n-1]
};


console.log(stoneGameV(
    //[2,3,1,4] //7
    [6,2,3,4,5,5] //18
))

console.log(stoneGameV(
    //[2,3,1,4] //7
    [6,2,3,4,5,5] //18
))