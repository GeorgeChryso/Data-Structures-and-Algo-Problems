// A valid parentheses string is either empty(""), "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

// A valid parentheses string S is primitive if it is nonempty, and there does not exist a way to split it into S = A + B, with A and B nonempty valid parentheses strings.

// Given a valid parentheses string S, consider its primitive decomposition: S = P_1 + P_2 + ... + P_k, where P_i are primitive valid parentheses strings.

// Return S after removing the outermost parentheses of every primitive string in the primitive decomposition of S.

var removeOuterParentheses = function (S) {
    let c = 0
    let arr = ''
    let k =''
    for (let i = 0; i < S.length;i++) {
        c+=S[i]=='('?1:-1
        k+=S[i]

     if ( c == 0 ){
            arr=arr + k.slice(1, -1)
            k=''
            
        }
            
        
        
    }
    return arr

};

console.log(removeOuterParentheses(
    '(()())(())'
))


