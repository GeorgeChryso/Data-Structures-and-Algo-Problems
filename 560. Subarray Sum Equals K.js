// Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.


// naive O(N^2)

var subarraySum = function(A, K) {
    var result=0

    for (let i = 0; i < A.length; i++) {
        var sum=0
        for (let j = i; j < A.length; j++) {
            sum+=A[j]
            if (sum===K) {
                console.log(i,j)
                result++
            }
        }        
    }


    return result
};
