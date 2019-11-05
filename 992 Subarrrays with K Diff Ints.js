// Given an array A of positive integers, call a (contiguous, not necessarily distinct) subarray of A good if the number of different integers in that subarray is exactly K.

// (For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.)

// Return the number of good subarrays of A.

function subarraysWithKDistinct(A, K) {
    function atMostK(k) {
      let start= 0;
      let res = 0;
      const count = {};
  
      for (let end= 0; end < A.length; end++) {
            if (count[A[end]] == null) count[A[end]] = 0;
            if (count[A[end]] === 0) k--;
            count[A[end]]++;
    
            while (k < 0) {
                count[A[start]]--; // shorten the window
                if (count[A[start]] === 0) k++; //if a characters stops existing, increase the total count of distinct characters
                start++; // shorten the window
            }
            res += end -start + 1;//add the subsequence count with k distinct characters
      }
      return res;
    }
  
    return atMostK(K) - atMostK(K - 1);
  }



  
console.log(subarraysWithKDistinct(
    [1,2,1,2,3],2
))



