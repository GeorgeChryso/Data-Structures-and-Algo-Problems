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

//same thinking,the & of all the numbers in range will retain the intersection of bits from the start and unset all the rest
// for example 
// 5=101
// 7=111
//   ---
//   100=5&6&7
// so essentially  i take the xor of 5^7=010 and i count how many right shifts i need to make that number equal to zero, then i left shift one of my numbers and right shift it back on to fill the length with 0. 
var rangeBitwiseAnd = function(m, n) {
    
    let xor=m^n
    let a = 0; // counts how many zeroes are needed to make the xor ==0
    // and by extension the zeroes of my result

    while(xor!=0){
        xor>>=1
        a++
    }
   
    return (n>>>a)<<a; 
};


console.log(
    rangeBitwiseAnd(5,7)
)