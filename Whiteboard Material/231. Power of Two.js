// Given an integer, write a function to determine if it is a power of two.



var isPowerOfTwo = function(n) {
    if(n<0)return false //negative numbers have at least 2 set bits
    let counter=0
    while(n!==0){
        counter+=n&1
        n=n>>>1
    }
    return counter===1 // a number is a power of 2 if it only has 1 set bit int is binary representation
};


var isPowerOfTwo = function(n) {
    if(n<0)return false
    let counter=0
    while(!n==0){
        counter++
        n=n&(n-1) // unset the last set bit
    }
    return counter===1 // a number is a power of 2 if it only has 1 set bit int is binary representation
};

var isPowerOfTwo=(n)=>n>0&&((n&-n)==n)
//false when the number is negative
// true when I turn it into the number with only the first of its set bit,set and it equals itself


var isPowerOfTwo=(n)=>n>0&&((n&(n-1))===0)
//false when the number is negative
// true when I unset the only bit it has


console.log(isPowerOfTwo(-2147483648))