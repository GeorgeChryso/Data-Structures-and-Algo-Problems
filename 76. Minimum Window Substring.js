// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).


var minWindow = function(S, T) {

  var result = ''

  //So basically here I will store all the key:value pairs of characters of T
  // where
  // Keys(character):Values(number of Times witnessed in T)
  var dictionary = {};
  T=T.split("");
  T.forEach(d => (dictionary[d] =(dictionary[d] || 0 )+ 1));
  // Here is the number of different characters in T
  var countOfDiff = Object.keys(dictionary).length;
  // Essentially countOfDiff will mean: How many more elements till my current window has the same characters as T

  var start = 0;
  var end = -1;

  while (end < S.length) {
    
 
    if (countOfDiff === 0) {
      // Means that my current Window contains all the Characters in T

      // so I update the result length
      if (!result||result.length > (end - start + 1)) {
        result=S.slice(start,end+1)
      }

      if (dictionary[S[start]] !== undefined) {
        dictionary[S[start]]++;
      }

      if (dictionary[S[start]] > 0) {
        countOfDiff++;
      }
      start++;
    }
    else{
      end++
      // that means that the current window I'm examining
      // must contain some more characters in order for it
      // to have the same characters in T

      // If curr character belongs in T
      // reduce the total count needed
      if (dictionary[S[end]] !== undefined) {
        dictionary[S[end]]--;
      }

      // if by that reduction the count reached 0 that means that I have 1 less character to worry about
      if (dictionary[S[end]] === 0) {
        countOfDiff--;
      }
    }
  }
  console.log(result);
  return result
   
};

console.log(
  minWindow(
  // "ADOBECODEBANC", "ABC"
  //"a","aa"
  //"a","a"
  //"aa","aa"

  // "a","b"
  )
);
