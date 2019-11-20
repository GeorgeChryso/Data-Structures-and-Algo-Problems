// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

function minWindow(s, t) {
  var ans = "";

  // 1. process hashmap
  var map = {};
  // store the "letter":"frequency" of T
  t.split("").forEach(ch => (map[ch] = (map[ch] || 0) + 1));
  // The count of the different letters of t
  var count = Object.keys(map).length;

  // 2. traverse s to find boundaries
  // both l & r are inclusive
  var l = 0;
  var r = -1;

  while (r < s.length) {
    if (count === 0) {
      // good condition
      // l~r contains t

      // update ans
      if (!ans || r - l + 1 < ans.length) {
        ans = s.slice(l, r + 1);
      }

      // get rid of curr ch and then move l
      if (map[s[l]] !== undefined) {
        map[s[l]]++;
      }
      if (map[s[l]] > 0) {
        count++;
      }
      l++;
    } else {
      // bad condition
      // l~r doesn't contain t

      // move r and add new ch
      r++;
      if (map[s[r]] !== undefined) {
        map[s[r]]--;
      }
      if (map[s[r]] === 0) {
        count--;
      }
    }
  }
  return ans;
}

var minWindow = function(s, t) {
  const map = {};
  for (const c of t) {
    map[c] = (map[c] || 0) + 1;
  }

  let counter = t.length;
  let start = 0;
  let end = 0;
  let minLen = Infinity;
  let minStart = 0;

  while (end < s.length) {
    const eChar = s[end];
    if (map[eChar] > 0) {
      counter--;
    }
    map[eChar] = (map[eChar] || 0) - 1;
    end++;

    while (counter === 0) {
      if (end - start < minLen) {
        minStart = start;
        minLen = end - start;
      }
      const sChar = s[start];
      map[sChar] = (map[sChar] || 0) + 1;
      if (map[sChar] > 0) {
        counter++;
      }

      start++;
    }
  }
  if (minLen !== Infinity) {
    return s.substring(minStart, minStart + minLen);
  }

  return "";
};

var minWindow = function(S, T) {
  S = S.split("");

  //So basically here I will store all the key:value pairs of characters of T
  // where
  // Keys(character):Values(number of Times witnessed in T)
  var dictionary = {};
  T = T.split("");
  T.forEach(d => (dictionary[d] = dictionary[d] || 0 + 1));
  console.log(S, T);
  // Here is the number of different characters in T
  var countOfDiff = Object.keys(dictionary).length;
  // Essentially countOfDiff will mean: How many more elements till my current window has the same characters as T

  var result = {
    start: 0, // start index of my result window
    end: 0, // end index of my result window
    length: Infinity // end-start+1 ( the length of my result window)
  };
  var start = 0;
  var end = 0;

  for (var end = 0; end < S.length; end++) {
    if (countOfDiff !== 0) {
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
    console.log(S.slice(start,end+1))
    while (countOfDiff === 0) {
      // Means that my current Window contains all the Characters in T

      // so I update the result length
      if (result.length >( end - start + 1)) {
        result.start = start;
        result.end = end;
        result.length = end - start + 1;
      }

      if (dictionary[S[start]] !== undefined) {
        dictionary[S[start]]++;
      }

      if( dictionary[S[start]]>0){
         countOfDiff++
      }
      start++;
    }
  }
  console.log(result);
  return S.slice(result.start, result.end+1).join('')
};

console.log(minWindow("ADOBECODEBANC", "ABC"));
