// Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together. You may assume the given string consists of lowercase English letters only and its length will not exceed 10000.

 

// Example 1:

// Input: "abab"
// Output: True
// Explanation: It's the substring "ab" twice.
// Example 2:

// Input: "aba"
// Output: False
// Example 3:

// Input: "abcabcabcabc"
// Output: True
// Explanation: It's the substring "abc" four times. (And the substring "abcabc" twice.)


var repeatedSubstringPattern = function(s) {
    let n=s.length
    for (let len = 1; len <n; len++) {
        if(n%len==0&&s[len-1]==s[n-1]&&s[0]===s[n-len]){
            for (let j = len; j <n; j++) {
               if(s[j]!==s[j%len])break
               if(j==s.length-1)return true
            }
        }        
    }
    return false
};

//kmp to add