// A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself).

// Given a string s. Return the longest happy prefix of s .

// Return an empty string if no such prefix exists.


//passes. Brute force
var longestPrefix = function(s) {
    if (s.length === 1) return '';
    for (let i = s.length - 1; i >= 1; i--) {
      const pre = s.slice(0, i);
      const suf = s.slice(s.length - i);
      if (pre === suf) {
        return pre;
      }
    }
    return '';
  };