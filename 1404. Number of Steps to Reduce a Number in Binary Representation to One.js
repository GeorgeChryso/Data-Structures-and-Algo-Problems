// Given a number s in their binary representation. Return the number of steps to reduce it to 1 under the following rules:

// If the current number is even, you have to divide it by 2.

// If the current number is odd, you have to add 1 to it.

// It's guaranteed that you can always reach to one for all testcases.


//using bigint
var numSteps = function(s) {
    let z=BigInt(0)
    s=s.split('')
    let idx=0
    while(s.length){
        if(s[s.length-1]=="0"){idx++}
        else{
            z+=BigInt(2**idx)
            idx++
        }
        s.pop()
    }
    let result=0
   
    while(z!=1n){
        result++
        if(z%2n==0n){
            z/=2n
        }
        else{
           z+=1n
        }
    }
    return result
};
