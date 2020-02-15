// Given a column title as appear in an Excel sheet, return its corresponding column number.

// For example:

//     A -> 1
//     B -> 2
//     C -> 3
//     ...
//     Z -> 26
//     AA -> 27
//     AB -> 28 



var titleToNumber = function(s) {
   
    let result=0
    for (let i = 0; i < s.length; i++) {
        result+=(26**(s.length-1-i))*(Math.abs(65-s.charCodeAt(i))+1)
    }
  
    return result
};    


var titleToNumber=s=>s.split('').reduce((acc,curr,i)=>acc+(26**(s.length-1-i))*(Math.abs(65-s.charCodeAt(i))+1),0)


console.log(titleToNumber(
    'AB'
))