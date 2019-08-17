// A valid parentheses string is either empty(""), "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

// A valid parentheses string S is primitive if it is nonempty, and there does not exist a way to split it into S = A + B, with A and B nonempty valid parentheses strings.

// Given a valid parentheses string S, consider its primitive decomposition: S = P_1 + P_2 + ... + P_k, where P_i are primitive valid parentheses strings.

// Return S after removing the outermost parentheses of every primitive string in the primitive decomposition of S.

var removeOuterParentheses = function (S) {
    let c = 0
    let arr = ''
    let k=1
    for (let i = 0; i < S.length;i++) {
        if (S[i]=='(') {
            c++
            
        }
        else {
            c--
        }
     

        if (c == 0) {
            console.log(i)
            console.log(i == S.length-1)

            S = S.slice(0, i ) + S.slice(i + 1, S.length )
            c--
            i++
            // arr+=S.slice(k, i)        
            // k = i + 2
           // if (i == S.length - 1) { return S.slice(1, S.length) }
        }
            
        
        
    }
    return S.slice(1, S.length)
    return arr

};

console.log(removeOuterParentheses(
    '(()())(())'
))


