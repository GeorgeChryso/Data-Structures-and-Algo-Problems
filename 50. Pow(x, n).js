




// Logn exponential using the bitwise representation of the power
// effectively computing powers 1 ,2 ,4, 8, 16....
// I CAN MAKE ANY NUMBER USING THOSE POWERS.

var myPow = function(x, n) {
    if(n===0)return 1
    let result=1
    // if n is negative i m gonna compute the positive power
    // and return 1/result
    let q=Math.max(n,-n)
    while(q){
        if(q&1)result*=x
        q>>>=1
        x*=x
    }
    
    return n<0?result:1/result
};