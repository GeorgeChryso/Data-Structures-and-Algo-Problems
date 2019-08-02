// Given an array of integers A, consider all non-empty subsequences of A.

// For any sequence S, let the width of S be the difference between the maximum and minimum element of S.

// Return the sum of the widths of all subsequences of A. 

// As the answer may be very large, return the answer modulo 10^9 + 7.

 

// Example 1:

// Input: [2,1,3]
// Output: 6
// Explanation:
// Subsequences are [1], [2], [3], [2,1], [2,3], [1,3], [2,1,3].
// The corresponding widths are 0, 0, 0, 1, 1, 2, 2.
// The sum of these widths is 6.
 

// Note:

// 1 <= A.length <= 20000
// 1 <= A[i] <= 20000


var sumSubseqWidths = function(A) {
    A.sort((a,b)=>a-b)
    let c=Math.abs(A[0]-A[A.length-1]);

    for (let i = 0; i < A.length; i++) {
            for (let j = i+1; j < A.length; j++) {
                
                c+=A[j]-A[i]
            }        
    }




return c
};


console.log
(sumSubseqWidths(
    [1,2,3,4,5,6,7,8]
))