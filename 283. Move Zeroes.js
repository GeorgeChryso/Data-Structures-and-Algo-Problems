// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Example:

// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Note:

// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.


var moveZeroes = function(A) {
  
    for (let i = 0,last=0; i < A.length; i++) {
        if(A[i]){
            let c=A[i]
            A[i]=A[last]
            A[last]=c
            last++
        }
        
    }
    return A
};

var moveZeroes = function(A) {       
    let Nonzeroes=A.reduce((acc,curr)=>curr?acc+1:acc,0)
    for (let i = 0,k=0; i < A.length; i++) {
        if(A[i]&&k<=Nonzeroes){
            A[k++]=A[i]
        }
    }
    for (let i = Nonzeroes; i < A.length; i++) {
        A[i]=0
    }
    return A
};
console.log(moveZeroes(

  [0,0,1]  ))