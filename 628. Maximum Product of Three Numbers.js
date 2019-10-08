// Given an integer array, find three numbers whose product is maximum and output the maximum product.

// Example 1:

// Input: [1,2,3]
// Output: 6
 

// Example 2:

// Input: [1,2,3,4]
// Output: 24
 

// Note:

// The length of the given array will be in range [3,104] and all elements are in the range [-1000, 1000].
// Multiplication of any three numbers in the input won't exceed the range of 32-bit signed integer.


var maximumProduct = function(A) {
   var max=-Infinity

   for (let i = 0; i < A.length; i++) {
        for (let j = i+1; j < A.length; j++) {
            for (let k = j+1; k < A.length; k++) {
                A[i]*A[j]*A[k]>max?max=A[i]*A[j]*A[k]:null;
                
            }            
        }       
   }
   return max
};