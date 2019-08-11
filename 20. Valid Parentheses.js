// Share
// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.

// Example 1:

// Input: "()"
// Output: true
// Example 2:

// Input: "()[]{}"
// Output: true



var isValid = function(s) {
    if (s === null || s.length <= 0) return true;
    var expect = [];                    // I create an array that will serve as 
    for (var c of s) {                  // the expected value 
        if (c == '[') expect.push(']');     // I Iterate, saving the expected value
        else if (c == '{') expect.push('}'); // each time i see the relevant element
        else if (c == '(') expect.push(')');
        else if (expect.length == 0 || c != expect.pop()) return false;
        // If I see a closing element, and it's not what I expect, I return false 
        // Otherwise, I pop one element and expect the next one

    }
    if (expect.length == 0) return true; // If the iteration finishes with no elements
                                        // in expected, I return true
    return false;                       // else False
};





var isValid=(s)=>{
    if (s === null || s.length <= 0) return true;
while ( /\(+\)/.test(s) || /\{+\}/.test(s) || /\[+\]/.test(s) ){
    s = s.replace("()", "").replace('{}', "").replace('[]', "")

}

return s==''
}
console.log(isValid(
    "([][]()))[()]"
    ))

