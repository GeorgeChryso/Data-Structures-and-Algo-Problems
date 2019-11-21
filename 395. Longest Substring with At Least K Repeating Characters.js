// Find the length of the longest substring T of a given string (consists of lowercase letters only) such that every character in T appears no less than k times.

var longestSubstring = function(A, K) {
  A = A.split("");

  var dictionary={}
  var count=0
  var countOfDiff=0
  var result=0
  var start =0
  var end=0 
  var done=0

  while(end<A.length){
    
    if(dictionary[end]===undefined){
        countOfDiff++
        dictionary[end]=1
    }
    else{
        dictionary[end]++
        if(dictionary[end]==K){
            done++
        }
    }    

    if(done==countOfDiff)break

  }

  result=Math.max(result,end-start+1)

  while(end<A.length){
        while(done==countOfDiff){
            end++
            if(dictionary[end]===undefined){
                countOfDiff++
                dictionary[end]=1
            }
            else{
                dictionary[end]++
                if(dictionary[end]>=K){
                    result=Math.max(result,end-start+1)
                }
            }    
        }



  }

  return result;
};

console.log(longestSubstring("ABC"));


var longestSubstringSlidingWindow = function(s, k) {
    var ls = function(u) {
        let start = 0, end = 0, curU = 0, curK = 0, max = 0; 
        let hash = {};
        while(end<s.length) {;
            hash[s[end]] = hash[s[end]]+1||1;
            if (hash[s[end]]==1) curU++;
            if (hash[s[end]]==k) curK++;
            end++;

            // extra letter coming in, so we shrink left
            while(curU > u) {
                if (hash[s[start]]-- == k) curK--; // start will be < k
                if (hash[s[start++]] == 0) curU--; // start is 0
            }

            if (curU == curK && curU == u) {
                max = Math.max((end-start), max);
            }
        }
        return max;
    }

    let max = 0;
    for (let i=0;i<26;i++) {
        max = Math.max(max, ls(i+1));
    }
    return max;
};