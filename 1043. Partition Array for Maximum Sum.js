// Given an integer array A, you partition the array into (contiguous) subarrays of length 
//at most K. 
// After partitioning, each subarray has their values changed to become the maximum value of that subarray.

// Return the largest sum of the given array after partitioning.

 

// Example 1:

// Input: A = [1,   15 ,9,2,5,10], K = 3
// Output: 84
// Explanation: A becomes [15,15,15,9,10,10,10]



var maxSumAfterPartitioning = function(A, K) {
    let dp =  Array(A.length+1).fill(0);


    for (var i in dp) {

        let maximum=0
        let stop=Math.min(i,K) // I can move back until i-stop elements


        for (let j = 1 ; j <=stop ; j++) {

                maximum=Math.max(maximum, A[i-j])
                
                dp[i] = Math.max(dp[i], dp[i - j] + maximum * j);
        }



    }
    return dp[A.length];
}; 



var maxSumAfterPartitioning = function(A, K) {
    let dp =  Array(A.length+1).fill(0);


    for (var i in dp) {

        let maximum=0
        let stop=Math.min(i,K) // I can move back until i-stop elements


        for (let j = 1 ; j <=stop ; j++) {

                maximum=Math.max(maximum, A[i-j])
                
                dp[i] = Math.max(dp[i], dp[i - j] + maximum * j);
        }



    }
    function dp(i){
        if(i==0)return A[i]
        if(i==1)return Math.max(A[0]+A[1],A[1]*2,A[0]*2)


        let max=0
        
    }
    return dp[A.length];
}; 





console.log(
    maxSumAfterPartitioning(
        [5,2,7,8,3,1,9],3
    )
)

