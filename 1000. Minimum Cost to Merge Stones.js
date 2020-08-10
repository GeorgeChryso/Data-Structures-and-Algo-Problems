// There are N piles of stones arranged in a row.  The i-th pile has stones[i] stones.

// A move consists of merging exactly K consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these K piles.

// Find the minimum cost to merge all piles of stones into one pile.  If it is impossible, return -1.

 

// Example 1:

// Input: stones = [3,2,4,1], K = 2
// Output: 20
// Explanation: 
// We start with [3, 2, 4, 1].
// We merge [3, 2] for a cost of 5, and we are left with [5, 4, 1].
// We merge [4, 1] for a cost of 5, and we are left with [5, 5].
// We merge [5, 5] for a cost of 10, and we are left with [10].
// The total cost was 20, and this is the minimum possible.
// Example 2:

// Input: stones = [3,2,4,1], K = 3
// Output: -1
// Explanation: After any merge operation, there are 2 piles left, and we can't merge anymore.  So the task is impossible.
// Example 3:

// Input: stones = [3,5,1,2,6], K = 3
// Output: 25
// Explanation: 
// We start with [3, 5, 1, 2, 6].
// We merge [5, 1, 2] for a cost of 8, and we are left with [3, 8, 6].
// We merge [3, 8, 6] for a cost of 17, and we are left with [17].
// The total cost was 25, and this is the minimum possible.
 

// Note:

// 1 <= stones.length <= 30
// 2 <= K <= 30
// 1 <= stones[i] <= 100












// IMPORTANT
// /(j-i)%(K-1) == 0 tests if the subarray [i..j] can be merged into 1 pile. Do you see it?


//Range DP
// ERROR, needs prefix sum. future
var mergeStones = function(stones, K) {
    if(K>stones.length)return -1

    let n=stones.length
    let dp=[...Array(n+1)].map(d=>[...Array(n+1)].map(q=>Infinity))

    //dp[i][j] is the minimum cost to merge piles from i to j
    
    //basecase
    //dp[i][i+K-1]= (stones[i]+stones[i+1]+...stones[i+K-1])  (k stones)
    dp[0][K-1]=0
    for (let j = 0; j <K; j++) {
        dp[0][K-1]+=stones[j]            
    }           
    for (let i = 1; i <= n- K; i++) {
        dp[i][i+K-1]=dp[i-1][i+K-2]+stones[i+K-1]-stones[i-1]
    }

    for (let len = K; len < n; len++) {
        for (let i = 0; i <n-len; i++) {
            let j=i+len-1           
            for (let cut = i; cut <j; cut+=K-1) {
                console.log(len,i,j,cut)
                dp[i][j]=Math.min(dp[i][j],dp[i][cut]+dp[cut][j])                
            }
        }
    }
    console.log(dp)


};

console.log(
    mergeStones(
         // [3,2,4,1],2
        //[3,2,4,1],3
        [3,5,1,2,6],3
    )
)