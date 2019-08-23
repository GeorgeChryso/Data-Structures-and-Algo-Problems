// Given an integer array A, you partition the array into (contiguous) subarrays of length 
//at most K. 
// After partitioning, each subarray has their values changed to become the maximum value of that subarray.

// Return the largest sum of the given array after partitioning.

 

// Example 1:

// Input: A = [1,   15 ,9,2,5,10], K = 3
// Output: 84
// Explanation: A becomes [15,15,15,9,10,10,10]

/*var maxSumAfterPartitioning = function(A, K) {
    let l = A.length;
    let dp = new Array(l + 1).fill(0);


    for (let i = 1 ; i < l + 1; i++) {
        console.log(dp)
        let m = Number.MIN_VALUE;
        for (let j = 1; j < Math.min(i, K) + 1; j++){
            
            m = Math.max(m, A[i - j]);
            
            dp[i] = Math.max(dp[i], dp[i - j] + m * j);
            console.log(m)
            console.log(dp)
        }
    }
    return dp[l];
}; */




function maxSumAfterPartitioning( A,  K) {
    var N = A.length,
        dp=new Array(N).fill(0) // edw apothi

    for (let i = 0; i < N; i++) {
        var curMax = 0;
        for (let k = 1; k <= K && i - k + 1 >= 0; k++) {

            curMax = Math.max(curMax, A[i - k + 1]);
            dp[i] = Math.max(dp[i], (i >= k ? dp[i - k] : 0) + curMax * k);
        }
    }
    return dp[N - 1];
}

console.log(maxSumAfterPartitioning(
    [1,15,7,9,2,5,10],3
))