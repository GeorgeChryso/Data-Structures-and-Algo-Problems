// We have an array A of non-negative integers.

// For every (contiguous) subarray B = [A[i], A[i+1], ..., A[j]] (with i <= j), we take the bitwise OR of all the elements in B, obtaining a result A[i] | A[i+1] | ... | A[j].

// Return the number of possible results.  (Results that occur more than once are only counted once in the final answer.)

 
// TLE 80/83
// update: this doesnt get tled anymore, fixed line 13 from ~0 to reduce
var subarrayBitwiseORs = function(A) {
    let bucket=new Set()
    let result=0
    let earlytermination=A.reduce((a,b)=>a|b) // if this was ~0 instead it wouldnt terminate early, because the highest OR accumulation i can get is the OR of all the items in the array. gets TLED if this was ~0

    for (let i = 0; i < A.length; i++) {
        let total=A[i]
        for (let j = i; j < A.length; j++) {
            total|=A[j]
            if(!bucket.has(total)){
                result++
                bucket.add(total)
            }            
            if(total===earlytermination)break //important step, prevents tle
        }        
    }
    return result
};

var subarrayBitwiseORs = function(A) {
    const s = [];
    
    for (let i = 0, counter = 0; i < A.length; i++) {
         let tempLength = s.length;
         s.push(A[i]);

        while (counter < tempLength) {

            let v = s[counter] | A[i];

            if (v !== s[s.length - 1]) s.push(v);
            counter++
        }

    }
    
    return new Set(s).size;
  };

// O(30 N) allegedly because a|b>=a,b
var subarrayBitwiseORs=A=>{
    let total=new Set()
    let previous=new Set()

    for (const item of A) {
        let next= new Set([item])
        for (const j of previous) {
            next.add(item|j)
        }
        previous=next

        for (const j of previous) {
            total.add(j)
        }
    }
    return total.size
}

console.log(
    subarrayBitwiseORs([1,1,2]
))



