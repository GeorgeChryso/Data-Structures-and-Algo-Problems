// Given a circular array C of integers represented by A, find the maximum possible sum of a non-empty subarray of C.

// Here, a circular array means the end of the array connects to the beginning of the array.  (Formally, C[i] = A[i] when 0 <= i < A.length, and C[i+A.length] = C[i] when i >= 0.)

// Also, a subarray may only include each element of the fixed buffer A at most once.  (Formally, for a subarray C[i], C[i+1], ..., C[j], there does not exist i <= k1, k2 <= j with k1 % A.length = k2 % A.length.)


// O(n^2) prefix sum  BF TLE
var maxSubarraySumCircular = function(A) {
    if(A.every(d=>d<=0))return Math.max(...A) 
    let prefix=[0]
    let sum=0
    for (let i = 0; i < 2*A.length; i++) {
        sum+=A[i%A.length]      
        prefix.push(sum)  
    }
    let result=-1
    for (let i = 0; i < prefix.length; i++) {
         for (let j = i-prefix.length<0?0:i-prefix.length; j <=i; j++) {
                if(i-j<=A.length){
                    console.log(prefix[i],prefix[j],i-j)
                    result=Math.max(result,prefix[i]-prefix[j])
                }
         }       
    }
    return result
};

console.log(maxSubarraySumCircular(
    [5,-3,5]
))