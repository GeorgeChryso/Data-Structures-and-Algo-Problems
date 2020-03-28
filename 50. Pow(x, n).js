




// Logn exponential using the bitwise representation of the power
// effectively computing powers 1 ,2 ,4, 8, 16....
// I CAN MAKE ANY NUMBER USING THOSE POWERS.

var myPow = function(x, n) {
    if(n===0)return 1
    let result=1
    let flag=true
    // if n is negative i m gonna compute the positive power
    // and return 1/result
    if(n<0){
        flag=false
        n=-n
    }
    while(n){
        if(n&1)result*=x
        n>>>=1
        x*=x
    }
    
    return flag?result:1/result
};