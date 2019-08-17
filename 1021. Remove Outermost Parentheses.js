// A valid parentheses string is either empty(""), "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

// A valid parentheses string S is primitive if it is nonempty, and there does not exist a way to split it into S = A + B, with A and B nonempty valid parentheses strings.

// Given a valid parentheses string S, consider its primitive decomposition: S = P_1 + P_2 + ... + P_k, where P_i are primitive valid parentheses strings.

// Return S after removing the outermost parentheses of every primitive string in the primitive decomposition of S.

var removeOuterParentheses = function (S) {
    let c = 0
    let arr = []
    var k=1
    for (let i in S) {
        if (S.charAt(i)=='(') {
            c++
            
        }
        else {
            c--
        }
        console.log(i,S.charAt(i), c)

        if (c == 0) { 
            arr.push(S.slice(k, (Number(i) < S.length  )? Number(i) : Number(i)-1)) 
            k = Number(i) + 2
        }
        else {
            S
        }
    }
    return arr.join('')

};

console.log(removeOuterParentheses(
  '(()())(())'
))