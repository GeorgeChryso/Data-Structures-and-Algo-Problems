// Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.

// 1 <= k <= n <= 30,000.
// Elements of the given array will be in the range [-10,000, 10,000].


// Sliding Window, R:O(N), SP:O(1)
var findMaxAverage = function(A, K) {
    var result=-Infinity
    var currSum=0
    //find the sum of the first window, of size K
    for (let end= 0; end< K; end++) {
        currSum+=A[end]
    }
    //set it as Max
    result=Math.max(currSum/K,result)

    //keep moving the window rightwards
    for (let end = K; end < A.length; end++) {
        // adding the new element and subtracting the removed one (the old start of the window)
        currSum+=A[end]-A[end-K]
        result=Math.max(currSum/K,result)
    }

    return result
};