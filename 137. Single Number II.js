
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

// bitsolution
// essentially I construct my result bit by bit, knowing that
// its ones must appear x times such that x&3!=0
var singleNumber=A=>{
    let result=''
    let x,sum
    for (let i = 0; i < 32; i++) {
        // Find sum of set bits at ith position in all
        // array elements
        sum=0

        x=1<<i//doing this to test for the i-th bit

        // sum essentially counts how many 
        // of my items' i-th bits are 1 
        for (const item of A) {
            if( (item&x)!==0 )sum++
        }

        // The bits with sum not multiple of 3, are the
        // bits of the element with single occurrence.
        //if(sum%3)result=result|x //set result's i-th bit to one

        //if the sum of the i-th ones is divisible by 3, that means that 
        //the i-th bit of the single number is not amongst them,therefore is 0
        //otherwise
        if(sum%3!=0)result=result|(1<<i)//set result's i-th bit to one

        //essentially says 
         //if(sum%3==1)result='1'+result  // the bit appeared only once, so it must be on, on my target
         //else result='0'+result // the bit appeared 3 times already, therefore i dont want it
         // but doesnt work for negatives, whereas  result=result|x does
    }
    return result
    //return parseInt(result,2)

}

// essentially mimicking the finite automaton behaviour with a set
var singleNumber=A=>{
  
    let handler=function(){
        this.ones=new Set()
        this.twos=new Set()
        this.result=0

        this.newVal=(val)=>{
            if(this.ones.has(val)){
                if(this.twos.has(val)){
                    this.result=val
                    return true
                }
                else{
                    this.ones.delete(val)
                    this.twos.add(val)
                }
            }
            else if(!this.twos.has(val)) this.ones.add(val)     
            
            return false
        }

    }
    let handle=new handler()

    for (const item of A) {
       if(handle.newVal(item))return handle.result
       
    }
    return handle.ones.keys().next().value
}




// AIM: USE A 2 BIT STORE, TO LOOP EVERY 3D INPUT
// essentially using SoP Karnaugh Map to create  2 formulas for the 2 outputs( a,b)
// using 3 inputs( a,b, A[i])
//truthtable- circuit design - boolean algebra
var singleNumber=A=>{

          //we need to implement a tree-time counter(base 3) that if a bit appears three time ,it will be zero.
        //#curent  income  ouput
        //# ab      c/c       ab/ab
        //# 00      1/0       01/00
        //# 01      1/0       10/01
        //# 10      1/0       00/10

        // a=~abc+a~b~c;
        // b=~a~bc+~ab~c;
        let a=0;
        let b=0;
        for(c of A){
           let ta=(~a&b&c)|(a&~b&~c);// careful, i need to create this temporary
            //let ta=(c&b)^(~a)
            b=(~a&~b&c)|(~a&b&~c);
            a=ta;

            //or, you can make it automatically
            // so no third variable is needed
           // [a,b]=[(~a&b&c)|(a&~b&~c),(~a&~b&c)|(~a&b&~c)]
        }
        //we need find the number that is 01,10 => 1, 00 => 0.


// You need the temporary variable because you need to calculate both a and b on their old values.

// You return a | b since that will give you the number that isn't a part of a triplet: it either occurs twice (10) or once (01), but you don't know if it's stored in a (for twice) or b (for once). However, you do know that one of them is the number you're looking for, and the other is just 0 - thus you can just OR them together to make sure you return the right number.
       
    return a|b;
}


console.log(singleNumber(
    [2,2,3,2]
))

//Generalization:
// Given an array of integers everye lement appears k>1 times.
// One of the elements instead, appears p times, p%k!==0 p>=1 Find that single element


// First time number appear -> save it in "ones"
// Second time -> clear "ones" but save it in "twos" for later check
// Third time -> try to save in "ones" but value saved in "twos" clear it.

// k-map solution
// 00->10->01->00

/* 3-state counter */
// 'A'  'twos'  'ones'    'twos'  'ones'
//  0      0       0    |    0       0
//  0      0       1    |    0       1
//  0      1       0    |    1       0
//  1      0       0    |    0       1
//  1      0       1    |    1       0
//  1      1       0    |    0       0

var singleNumber = function(A) {

    // these are the XOR (^) sets of items seen once and twice respectively
    let seenOnce = 0,
        seenTwice = 0;
    
    for (let i = 0; i < A.length; i++) {

        //IF(seenonce doesnt have A[i]){ //
            // if its not in the set  seenTwice 
                // add it to seenonce (seenOnce^A[i])
        // else {
            // remove it from seenonce (seenOnce^A[i]) removes it  when seenOnce contains A[i]

        seenOnce =  (seenOnce ^ A[i]) & ~seenTwice; //represents the first bit
        // means, clear every value seen in seenTwice from (seenOnce^A[i])

        // if seenTwice doesnt have A[i]{
        //      Add it to seenTwice if and oly if 'seenOnce' does not have it
        // }
        // else{
        //       Remove it from seenTwice
        // }
        seenTwice =  (seenTwice ^ A[i])& ~seenOnce;// represents the second bit
    }
    
    //when I m done, every element will have passed from seenTwice 3 times, 
    // firstly it will be ignored, because seenOnce has it,
    // the next time it will be added because seenOnce will have removed it
    // the next time it will be removed
    // so when the loop is finished seenTwice will be 0
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





