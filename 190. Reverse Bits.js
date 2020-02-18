// Reverse bits of a given 32 bits unsigned integer.



var reverseBits = function(n) {
    let result=0
    console.log(parseInt(n))
    while(n!=0){
        result=(result<<1)|(n&1)
        n=(n>>>1)
    }
    console.log(result)
    return result
};


console.log(reverseBits(
    00000010100101000001111010011100
))