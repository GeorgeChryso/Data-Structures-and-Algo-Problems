


//   Word Break II
//   Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.
  
//   Note:
  
//   The same word in the dictionary may be reused multiple times in the segmentation.
//   You may assume the dictionary does not contain duplicate words.
//   Example 1:
  
//   Input:
//   s = "catsanddog"
//   wordDict = ["cat", "cats", "and", "sand", "dog"]
//   Output:
//   [
//     "cats and dog",
//     "cat sand dog"
//   ]
//   Example 2:
  
//   Input:
//   s = "pineapplepenapple"
//   wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
//   Output:
//   [
//     "pine apple pen apple",
//     "pineapple pen apple",
//     "pine applepen apple"
//   ]
//   Explanation: Note that you are allowed to reuse a dictionary word.
//   Example 3:
  
//   Input:
//   s = "catsandog"
//   wordDict = ["cats", "dog", "sand", "and", "cat"]
//   Output:
//   []



var wordBreak = function(s, wordDict) {
    var res = [], from = [], wordDict = new Set(wordDict);
    from[0] = [0];
    for (var i = 1; i <= s.length; i++) {
      from[i] = [];
      for (var j = 0; j < i; j++) {
        if (from[j].length && wordDict.has(s.substring(j, i))) {
          from[i].push(j);
        }
      }
    }

    
    build(s.length, '');
    return res;
  
    function build(idx, suffix) {
      if (!idx) return res.push(suffix);
      from[idx].forEach(function(from) {
        build(from, suffix === '' ? s.substring(from, idx) : s.substring(from, idx) + ' ' + suffix);
      })
    }
  };




  //dfs +dp (top down dp)
  var wordBreak = function(s, wordDict) {
      let memo={}
      // memo[substring] gives an array of potential splits such that 
      // substring can be cut into some pieces that exist in wordDict

      memo['']=[''] //essential basecase '' can be written as '' obviously

      let dfs=(word)=>{
          if(memo[word]!==undefined)
            return memo[word]
          let res=[]
          // see if ur word can be written as dword+sth
          // if sth has actual words in wordDict, its length wont be 0
          // so the result for this specific word will be dword+ every word in sth
          for (const dword of wordDict) {
              let len=dword.length, secondpart=[]
              if(word.slice(0,len)==dword)
                secondpart=dfs(word.slice(len))

              if(secondpart.length){
                secondpart.forEach(d=> 
                  d?res.push(dword+' '+d):res.push(dword)
                  )
              }
          }

          memo[word]=res // which i cache, so i dont recompute it 
          return memo[word]
      }
      return dfs(s)
  };

console.log(
  wordBreak(
    `catsanddog`,
    ["cat", "cats", "and", "sand", "dog"]
  )
)
