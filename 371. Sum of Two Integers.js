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
    let temp=a&b
    let result=0
    let carry=0
    let i=1
    while(i!=Math.pow(2,30)){
        result|= (((a&1)^(b&1))^carry)?i:0

        if((carry&&((a&1)||(b&1)) )||((a&1)&(b&1)) ){
            carry=1
        }
        else{
            carry=0
        }

        console.log(result.toString(2),carry)
        a>>>=1
        b>>>=1
        i<<=1
    }
    return result
}

console.log(getSum(20
    ,30))