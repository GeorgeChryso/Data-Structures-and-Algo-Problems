// Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.

//bit manipulation 
var getSum = function(a, b) {
    return b==0?a:getSum(a^b,(a&b)<<1)
};


