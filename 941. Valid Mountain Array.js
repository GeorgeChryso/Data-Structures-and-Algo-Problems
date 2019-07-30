// Given an array A of integers, return true if and only if it is a valid mountain array.

// Recall that A is a mountain array if and only if:

// A.length >= 3
// There exists some i with 0 < i < A.length - 1 such that:
// A[0] < A[1] < ... A[i-1] < A[i]
// A[i] > A[i+1] > ... > A[A.length - 1]
 

// Example 1:

// Input: [2,1]
// Output: false
// Example 2:

// Input: [3,5,5]
// Output: false
// Example 3:

// Input: [0,3,2,1]
// Output: true
 


var validMountainArray = function(A) {
    if(A.length<3){
          return false
      }
      
      for (var i = 0; i < A.length; i++) {
          if(A[i]<A[i+1]){
              continue;
              }
          break;
      }
      if  (i ==A.length-1 || i==0){
          return false;
      }
  
      for (i; i < A.length-1; i++)
      { if(A[i]>A[i+1]){
          continue
          }
         return false
      }
      return true;
  
  
  };

console.log(
    validMountainArray(
        
        [0,1,2,3,4,5,6,7,8,9]
    )
)