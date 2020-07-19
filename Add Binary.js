// Given two binary strings, return their sum (also a binary string).

// The input strings are both non-empty and contains only characters 1 or 0.




var addBinary = function(a, b) {
    let result=[]
    let carry=0
    let n=Math.max(a.length,b.length)
    for (let i = 0; i < n; i++) {
        let n1=a.length>i?Number(a[a.length-1-i]):0
        let n2=b.length>i?Number(b[b.length-1-i]):0
        if(n1+n2+carry==3){
            result.unshift('1')
            carry=1
        }
        else if(n1+n2+carry==2){
            result.unshift('0')
            carry=1
        }
        else {
            result.unshift(String(n1+n2+carry))
            carry=0
        }
    }
    if(carry)result.unshift('1')
    return result.join('')
};

console.log(
    addBinary(
        '1010','1011'
    )
)