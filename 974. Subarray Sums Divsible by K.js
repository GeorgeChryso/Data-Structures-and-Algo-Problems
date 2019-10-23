// Given an array A of integers, return the number of (contiguous, non-empty) subarrays that have a sum divisible by K.


// 1 <= A.length <= 30000
// -10000 <= A[i] <= 10000
// 2 <= K <= 10000

// O(N^2),BRUTE FORCE , NAIVE
var subarraysDivByK = function(A, K) {
    var result=0

    for (let i = 0; i < A.length; i++) {
        var sum=0
        for (let j = i; j < A.length; j++) {
            sum+=A[j]
            if (sum%K===0) {
                console.log(i,j)
                result++
            }
        }        
    }


    return result
};




