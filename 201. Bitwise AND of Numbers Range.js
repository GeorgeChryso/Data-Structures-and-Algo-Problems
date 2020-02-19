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


// the xand of m through n, retains the same part between m and n, whereas making anything else 0
var rangeBitwiseAnd = function(m, n) {
    let a = 0; // counts how much zeroes there are ( how many )
    while(m != n) {
        m >>= 1;
        n >>= 1;
        a++;
    }
    return m<<a; 
//or return n<<a
};

var rangeBitwiseAnd = function(m, n) {
    if(m==n)return m
    if(m==0||n==0)return 0

    let a = 0; // counts how much zeroes there are ( how many )
    let xor= ~(m^n)

    //counts the number of consecutive ones at the start( the same )
    while(xor!=0){
        xor>>>=1
        a++
    }
    a++
    a=Math.min(Math.abs(31-a),a)
    return (n>>>a)<<a; 
//or return n<<a
};


console.log(
    rangeBitwiseAnd(0,4)
)