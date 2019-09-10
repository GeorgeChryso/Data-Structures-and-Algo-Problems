// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Example:

// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Note:

// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.


var moveZeroes = function(A) {
    for (let i = 0; i < A.length; i++) {
        if(!A[i]){
            for (let j = i+1; j < A.length; j++){
                if(A[j]){
                    A[i]=A[j]
                    A[j]=0
                    break;
                }   
            }
        }       
    }
return A

};