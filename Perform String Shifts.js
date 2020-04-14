// You are given a string s containing lowercase English letters, and a matrix shift, where shift[i] = [direction, amount]:

// direction can be 0 (for left shift) or 1 (for right shift). 
// amount is the amount by which string s is to be shifted.
// A left shift by 1 means remove the first character of s and append it to the end.
// Similarly, a right shift by 1 means remove the last character of s and add it to the beginning.
// Return the final string after all operations.


//just do it
var stringShift = function(s, shift) {
    s=s.split('')
    for (var [dir,amount] of shift) {
        while(amount--)dir?s.unshift(s.pop()):s.push(s.shift())
    }
    return s.join('')
};

//left shift cancels right shift
var stringShift = function(s, shift) {
    s=s.split('')
    let z=shift.reduce((acc,[dir,amount])=>acc+(-1)**dir*amount,0)
    console.log(z)
    while(z){
        if(z>0){
            s.push(s.shift())
            z--
        }
        if(z<0){
            s.unshift(s.pop())
            z++
        }
    }
    return s.join('')
};

console.log(
    stringShift(
        "abc",[[0,1],[1,2]]
    )
)