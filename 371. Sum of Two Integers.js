// Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.

//bit manipulation 
var getSum = function(a, b) {
    return b==0?a:getSum(a^b,(a&b)<<1)
};


//clear

var getSum=(a,b)=>{
    if(b===0)return a
    return getSum(a^b,(a&b)<<1)
}


//sums two positive integers
var getSum=(a,b)=>{
    let result=0
    let carry=0
    let i=1 // this will be the potential element I need to OR my result with or not, and will left shift 31 times for each potential bit that needs to be set or not
    while(i!=Math.pow(2,30)){
        //if the xor of all the values is 1 , that means that my bit needs to be set
        result|= ((a&1)^(b&1)^carry)?i:0


        //there are two cases where carry needs to be one,
        // the first is both of the first bits of a and b being one
        // and the second is having 1 of them (or two) as one but carrying one bit from the previous loop
        if((carry&&((a&1)||(b&1)) )||((a&1)&(b&1)) ){
            carry=1
        }
        else{
            carry=0
        }

        // rightshifting a,b so i can check their first bit next round
        a>>>=1
        b>>>=1
        // left shifting i so to consider the next bit to the left for the next round
        i<<=1
    }
    return result
}

console.log(getSum(20
    ,30))