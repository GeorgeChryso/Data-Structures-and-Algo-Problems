
// Given an integer n, return a string with n characters such that each character in such string occurs an odd number of times.

// The returned string must contain only lowercase English letters. If there are multiples valid strings, return any of them.  

 


var generateTheString = function(n) {
    
    let result=''

    if(n%2==0){
        for (let i = 0; i <n-1; i++) {
            result+='x'
        }
        result+='y'
    }
    else {
        for (let i = 0; i <n; i++) {
            result+='y'
        }

    }
    return result
};