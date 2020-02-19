// Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.


//slow but passes
var rangeBitwiseAnd = function(m, n) {
    if(m==0)return 0
    let i=m
    let sum=m
    while(i<=n){
        sum&=i
        if(sum==0)return 0//early termination
        i++
    }
    return sum
};


// 
var rangeBitwiseAnd = function(m, n) {
    let a = 0;
    while(m != n) {
        m >>= 1;
        n >>= 1;
        a++;
    }
    return m<<a; 
//or return n<<a
};



console.log(~0)