// Find the length of the longest substring T of a given string (consists of lowercase letters only) such that every character in T appears no less than k times.

var longestSubstring = function(A, K) {
  A = A.split("");
  var result = 0;
  var dictionary = {};
  var currSet = new Set();
  var start = 0;
  for (var end = 0; end < K; end++) {
    dictionary[A[end]] = dictionary[A[end]] || 0 + 1;
    currSet.add(A[end]);
  }

  if (currSet.size == 1) {
    currSet = new Set();
    result = K;
  }

  for (end; end < A.length; end++) {
    dictionary[A[end]] = dictionary[A[end]] || 0 + 1;

    if (dictionary[A[end]] >= K) {
      if (currSet.has(A[end])) currSet.delete(A[end]);
      if (!currSet.size) {
        result = Math.max(result, end - start + 1);
      }
    } 
    else {
        currSet.add(A[end])    
    }
  }

  return result;
};

console.log(longestSubstring("ABC"));
