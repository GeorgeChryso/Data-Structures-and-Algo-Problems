// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Example:

// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Note:

// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.


var moveZeroes = function(A) {
    let z=[]
    for (let i = A.length-1 ; i >=0; i--) {
       
        if(!A[i]){
            z.push(A[i])
        }
        else{
            z.unshift(A[i])
        }

    }
    A.forEach((d,i)=>A[i]=z[i])

    return A
};

console.log(moveZeroes(

    [0,0,1]
    ))