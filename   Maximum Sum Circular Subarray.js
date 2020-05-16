// Given a circular array C of integers represented by A, find the maximum possible sum of a non-empty subarray of C.

// Here, a circular array means the end of the array connects to the beginning of the array.  (Formally, C[i] = A[i] when 0 <= i < A.length, and C[i+A.length] = C[i] when i >= 0.)

// Also, a subarray may only include each element of the fixed buffer A at most once.  (Formally, for a subarray C[i], C[i+1], ..., C[j], there does not exist i <= k1, k2 <= j with k1 % A.length = k2 % A.length.)


// O(n^2) prefix sum  BF TLE 103/109
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

//2 cases O(n)
var maxSubarraySumCircular = function(A) {
    //1st case, maximum array is within array A (Kadane's algorithm)
    if(A.every(d=>d<=0))return Math.max(...A) 
    let maxSoFar=0
    let maxEndingHere=0
    for (let i = 0; i <A.length; i++) {
        maxEndingHere=Math.max(0,maxEndingHere+A[i%A.length])
        maxSoFar=Math.max(maxSoFar,maxEndingHere)
    }
    //2nd case( maximum subarray contains the last element of A )
    let sum1=0,sum2=0
    let prefix=[0], suffix=[0]
    for (let i = 0; i < A.length; i++) {
        sum1+=A[i]
        prefix.push(Math.max(sum1,prefix[prefix.length-1]))
        sum2+=A[A.length-1-i]
        suffix.unshift(Math.max(sum2,suffix[0]))
    }

    for (let i = 0; i < prefix.length; i++) {
        maxSoFar=Math.max(maxSoFar,prefix[i]+suffix[i])        
    }

    return maxSoFar
};

//cleaner code
var maxSubarraySumCircular = function(A) {
    //1st case, maximum array is within array A (Kadane's algorithm)
    if(A.every(d=>d<=0))return Math.max(...A) 
    let maxSoFar=0, maxEndingHere=0, sum1=0,sum2=0,prefix=[0], suffix=[0]
    for (let i = 0; i <A.length; i++) {
        maxEndingHere=Math.max(0,maxEndingHere+A[i%A.length])
        maxSoFar=Math.max(maxSoFar,maxEndingHere)
        sum1+=A[i]
        prefix.push(Math.max(sum1,prefix[prefix.length-1]))
        sum2+=A[A.length-1-i]
        suffix.unshift(Math.max(sum2,suffix[0]))
    }

    for (let i = 0; i < prefix.length; i++) {
        maxSoFar=Math.max(maxSoFar,prefix[i]+suffix[i])        
    }

    return maxSoFar
};
console.log(maxSubarraySumCircular(
    [5,-3,5]
))