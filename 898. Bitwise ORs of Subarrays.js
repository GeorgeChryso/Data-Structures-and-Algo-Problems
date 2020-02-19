// We have an array A of non-negative integers.

// For every (contiguous) subarray B = [A[i], A[i+1], ..., A[j]] (with i <= j), we take the bitwise OR of all the elements in B, obtaining a result A[i] | A[i+1] | ... | A[j].

// Return the number of possible results.  (Results that occur more than once are only counted once in the final answer.)

 
// TLE
var subarrayBitwiseORs = function(A) {
    let bucket=new Set()
    let result=0
    let earlytermination=1

    for (let i = 0; i < 31; i++) {
        earlytermination=(earlytermination<<1)&1
    }

    console.log(earlytermination)
    for (let i = 0; i < A.length; i++) {
        let total=A[i]
        for (let j = i; j < A.length; j++) {
            total|=A[j]
            if(!bucket.has(total)){
                result++
                bucket.add(total)
            }            
            if(total===earlytermination)break
        }        
    }
    return result
};



console.log(
    subarrayBitwiseORs([1,1,2]
))




console.log(
   ( 5|3)&(~5)
)