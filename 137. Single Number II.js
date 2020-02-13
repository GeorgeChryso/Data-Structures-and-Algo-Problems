
// Given a non-empty array of integers, every element appears three times except for one, which appears exactly once. Find that single one.

// Note:

// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memo


var singleNumber=A=>{
    let dict={}

    A.forEach(d=>dict[d]=(dict[d]||0)+1)
    
    for (const d of Object.keys(dict)) {
        if(dict[d]==1)return d
    }
}

var singleNumber=A=>{

    let start=0n

    A.forEach(d=>start^=(1n>>BigInt(d)))
    console.log(start.toString(2))

    for (let i = 0; i < start.toString(2).length; i++,start>>=1n) {
        if(start&1n)return i
    }
}

var singleNumber = function(A) {

    let negativebucket=0
    let negativetotal=0

    let bucket=0 //only the XOR repeated numbers appear here
    let total=0  //all the XOR appears here

    for (let i = 0; i < A.length; i++) {
        if(A[i]<0){

            if(((negativebucket^A[i])!==negativebucket) && ((negativebucket^A[i])!==0)){
                negativebucket=negativebucket^A[i]
                console.log(A[i])
            }
            

            negativetotal=negativetotal^A[i]

          //  console.log(negativebucket,negativetotal)

        }   
        else{
            if(((total^A[i])===total)||((total^A[i])===0)){
                if((bucket^A[i])!==bucket&&(bucket^A[i])!==0)bucket=bucket^A[i]
            }        
            total=total^A[i]

        }

      
    }
    console.log(bucket^total)
    return negativebucket^negativetotal^bucket^total
};



//Generalization:
// Given an array of integers everye lement appears k>1 times.
// One of the elements instead, appears p times, p%k!==0 p>=1 Find that single element


// First time number appear -> save it in "ones"
// Second time -> clear "ones" but save it in "twos" for later check
// Third time -> try to save in "ones" but value saved in "twos" clear it.
var singleNumber = function(A) {

    // these are the XOR (^) sets of items seen once and twice respectively
    let seenOnce = 0,
        seenTwice = 0;
    
    for (let i = 0; i < A.length; i++) {

        //IF(seenonce doesnt have A[i]){ //
            // if its not in the set  seenTwice 
            // add it to seenonce (seenOnce^A[i]) adds it to the set when seenOnce  doesnt have A[i]
        // else {
            // remove it from seenonce (seenOnce^A[i]) removes it  when seenOnce contains A[i]

        seenOnce = ~seenTwice & (seenOnce ^ A[i]);


        // if seenTwice doesnt have A[i]{
        // Add it to seenTwice if and oly if 'seenOnce' does not have it
        // }
        // else{
        //  Remove it from seenTwice
        // }
        seenTwice = ~seenOnce & (seenTwice ^ A[i]);
    }
    
    return seenOnce;
};

console.log(
    singleNumber(
    //[0,1,0,1,0,1,99]
     //   [2,2,3,2]
    // [-2,-2,1,1,-3,1,-3,-3,-4,-2]
     [-19,-46,-19,-46,-9,-9,-19,17,17,17,-13,-13,-9,-13,-46,-28]
    )
)


