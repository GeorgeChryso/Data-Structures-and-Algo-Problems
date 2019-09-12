// Given an array A of 0s and 1s, we may change up to K values from 0 to 1.

// Return the length of the longest (contiguous) subarray that contains only 1s. 

 

// Example 1:

// Input: A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
           

// Output: 6
// Explanation: 
// [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1.  The longest subarray is underlined.


var longestOnes = function(A, K) {
   var zeroes=0,start=0,res=0,end=0
   while (end<A.length){
       if (!A[end])zeroes+=1
       while (zeroes>K){
           if (!A[start])zeroes--
           start++
       }
       
       res=Math.max(res,end-start+1)
       end++
    }
    return res
 };


 var longestOnes=function(A,K){
    var i = 0
    for (var j = 0; j < A.length ; j++) {
        if (A[j] == 0) K--;
        if (K < 0 && A[i++] == 0) K++;
    }
    return j - i;

 }

console.log(longestOnes(
    [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1]
    ))

