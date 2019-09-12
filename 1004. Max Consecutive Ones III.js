// Given an array A of 0s and 1s, we may change up to K values from 0 to 1.

// Return the length of the longest (contiguous) subarray that contains only 1s. 

 

// Example 1:

// Input: A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
           

// Output: 6
// Explanation: 
// [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1.  The longest subarray is underlined.


var longestOnes = function(A, K) {
    let neo=[]
    var count0=0
    var count1=0
    A.push(!A[A.length-1])
    for (let i = 0; i < A.length; i++) {
        if(A[i]){
            count1++
          if(count0){
              neo.push([count0])
              count0=0
          }
        }
        else{
            count0++
            if(count1){
                neo.push(count1)
                count1=0
            }
        }
    }
    return neo
};

console.log(longestOnes(
    [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1]))

