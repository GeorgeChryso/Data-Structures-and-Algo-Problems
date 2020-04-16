// Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

// Any left parenthesis '(' must have a corresponding right parenthesis ')'.
// Any right parenthesis ')' must have a corresponding left parenthesis '('.
// Left parenthesis '(' must go before the corresponding right parenthesis ')'.
// '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.
// An empty string is also valid.

// The string size will be in the range [1, 100].




var checkValidString = function(s) {
    let cmin=0,cmax=0
    for (let i = 0; i < s.length; ++i) {
        let c = s.charAt(i);
        if (c == '(') {
            cmax++;
            cmin++;
        } else if (c == ')') {
            cmax--;
            cmin = Math.max(cmin - 1, 0);
        } else {
            cmax++;
            cmin = Math.max(cmin - 1, 0);
        }
        if (cmax < 0) return false;
    }
    return cmin == 0;
}



console.log(checkValidString(
    "*()(())*()(()()((()(()()*)(*(())((((((((()*)(()(*)"
        ))