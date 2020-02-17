// Write a function that takes an unsigned integer and return the number of '1' bits it has (also known as the Hamming weight).



//flipping the last set bit to 0 method
var hammingWeight = function(n) {
   
    let result=0
    while(n!=0){
        result++
        n=n&(n-1)//flips the last set(1) bit to 0
    }
    return result
};

//the given input is a 32 bit integer so I check each of the first 32 bits,
// it never  becomes 0 for some reason even after tons of right shifts. so that's why \
// I need a different 32-counter, if it was in binary or normal decimal form, i Wouldnt
var hammingWeight = function(n) {
   
    let result=0
    let counter=32 // Normally it shouldnt be the case,but it works like that
    while(n!=0&&counter>0){
        if(n&1){ //check the bit
            result++
        }
        n=n>>1 //den tha ginei pote 0 an to prwto bit einai 1
         //ok, prosekse, telika den douleve giati hthela 0fill right shift (>>>)
        // pou sta aristera vazei 0, enw to >> sta aristera vazei o,ti upirxe prin to shift( 0 or 1 ), gia afto me gamouse, alliws den hthela ton 32 bit counter opws vlepeis parakatw
        counter--
    }
    return result
};

// normal pramata me n>>>1
var hammingWeight = function(n) {
   
    let result=0
    while(n!=0){
        if(n&1)result++
        n=n>>>1 //zero fill gia na ginei kapote 0
    }
    return result
};


//recursion with extra input and the 32bit search method
var hammingWeight = (n,acc=0,k=32)=>n===0||k==0?acc:hammingWeight(n>>1,acc+(n&1),k-1)

//recursion after realizing the zero fill right shift
var hammingWeight=(n,acc=0)=>n===0?acc:hammingWeight(n>>>1,acc+Number(n&1) )

//recursion with the flipping the last set bit to 0 method
var hammingWeight=(n,acc=0)=>n==0?acc:hammingWeight(n&(n-1),acc+1)

console.log(
    hammingWeight(
        00000000000000000000000000001011
    )
)