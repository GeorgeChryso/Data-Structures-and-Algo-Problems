// Given an input string, reverse the string word by word.

// Input: "the sky is blue"
// Output: "blue is sky the"
// A word is defined as a sequence of non-space characters.
// Input string may contain leading or trailing spaces. However, your reversed string should not contain leading or trailing spaces.
// You need to reduce multiple spaces between two words to a single space in the reversed string.




var reverseWords = function(s) {
    
    s=s.split(' ')
    s=s.filter(d=>d!==''&&d!==' ')
    s.reverse()
    return s.join(' ')
};

console.log(reverseWords(
    "  hello world!  "
))