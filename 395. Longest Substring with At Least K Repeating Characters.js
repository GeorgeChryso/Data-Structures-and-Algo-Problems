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
