// A valid parentheses string is either empty(""), "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

// A valid parentheses string S is primitive if it is nonempty, and there does not exist a way to split it into S = A + B, with A and B nonempty valid parentheses strings.

// Given a valid parentheses string S, consider its primitive decomposition: S = P_1 + P_2 + ... + P_k, where P_i are primitive valid parentheses strings.

// Return S after removing the outermost parentheses of every primitive string in the primitive decomposition of S.

var removeOuterParentheses = function (S) {
    let c = 0
    let arr = ''
    var k=1
    for (let i = 0; i < S.length;i++) {
        if (S.charAt(i)=='(') {
            c++
            
        }
        else {
            c--
        }
     

        if (c == 0) {

            arr+=S.slice(k, i)        
            k = i + 2
        }
            
        
        
    }
    
    return arr

};

console.log(removeOuterParentheses(
    "()()"
))