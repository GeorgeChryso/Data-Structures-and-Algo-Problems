// Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.

// 1 <= k <= n <= 30,000.
// Elements of the given array will be in the range [-10,000, 10,000].

var findMaxAverage = function(A, K) {
    var result=-Infinity
    var currSum=0
    for (let i = 0; i < K; i++) {
        currSum+=A[i]
    }
    result=Math.max(currSum/K,result)
    for (let i = K; i < A.length; i++) {
        currSum+=A[i]-A[i-K]
        result=Math.max(currSum/K,result)
    }

    return result
};