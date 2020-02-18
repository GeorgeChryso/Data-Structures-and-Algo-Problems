// We have an array A of non-negative integers.

// For every (contiguous) subarray B = [A[i], A[i+1], ..., A[j]] (with i <= j), we take the bitwise OR of all the elements in B, obtaining a result A[i] | A[i+1] | ... | A[j].

// Return the number of possible results.  (Results that occur more than once are only counted once in the final answer.)

 

var subarrayBitwiseORs = function(A) {
  //prefix sum
    let start=0
    let PrefixSum=Array(A.length).fill(0)
    let bucket=new Set()
    let result=0

    for (let i = 0; i < A.length; i++) {
        start^=A[i]
        PrefixSum[i]=start
        if(!bucket.has(PrefixSum[i])){
            result++
            bucket.add(PrefixSum[i])
        }       
    }
    
    for (let i = 0; i < A.length; i++) {
        for (let j = i ; j < A.length; j++) {
            if(!bucket.has(PrefixSum[i]^PrefixSum[j])){
                result++
                bucket.add(PrefixSum[i]^PrefixSum[j])
            }            
        }        
    }

    return result
};