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


var subarraySum = function(A, k) {
    const map = new Map([[0, 1]]);
    const obj={}
    let sum = 0;
    let result = 0;
    for (let num of nums) {
        sum = sum + num;
        result+=(obj[sum-k]||0)

        result += (map.get(sum - k) || 0);
        map.set(sum, (map.get(sum) || 0) + 1);
        obj[sum]=(obj[sum]||0)+1
    }
    
    return result;
};

var subarraySum = function(A, k) {
    const obj={0:1}
    let sum = 0;
    let result = 0;
    
    for (let num of A) {
        sum = sum + num;
        result+=(obj[sum-k]||0)
        obj[sum]=(obj[sum]||0)+1
    }
    
    return result;
};

