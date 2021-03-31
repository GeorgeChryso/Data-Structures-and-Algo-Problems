// A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

// For example, these are arithmetic sequences:

// 1, 3, 5, 7, 9
// 7, 7, 7, 7
// 3, -1, -5, -9
// The following sequence is not arithmetic.

// 1, 1, 2, 5, 7
 
// A zero-indexed array A consisting of N numbers is given. A subsequence slice of that array is any sequence of integers (P0, P1, ..., Pk) such that 0 ≤ P0 < P1 < ... < Pk < N.

// A subsequence slice (P0, P1, ..., Pk) of array A is called arithmetic if the sequence A[P0], A[P1], ..., A[Pk-1], A[Pk] is arithmetic. In particular, this means that k ≥ 2.

// The function should return the number of arithmetic subsequence slices in the array A.

// The input contains N integers. Every integer is in the range of -231 and 231-1 and 0 ≤ N ≤ 1000. The output is guaranteed to be less than 231-1.

 
// Example:

// Input: [2, 4, 6, 8, 10]

// Output: 7

// Explanation:
// All arithmetic subsequence slices are:
// [2,4,6]
// [4,6,8]
// [6,8,10]
// [2,4,6,8]
// [4,6,8,10]
// [2,4,6,8,10]
// [2,6,10]



//dp[i][diff]= The number of subsequences that end at A[i] that have a diff of diff
var numberOfArithmeticSlices = function(A) {
    let n=A.length,result=0,dp=[...Array(n)].map(d=>new Object)
    for(let i=0;i<n;i++)
        for(let j=0;j<i;j++){
            let diff=A[i]-A[j]
            if(dp[i][diff]===undefined)
                dp[i][diff]=0
            if(dp[j][diff]===undefined)
                dp[j][diff]=0
            dp[i][diff]+=1+dp[j][diff]
            result+=dp[j][diff]
        }
    return result
};
console.log(numberOfArithmeticSlices([2,2,4,6]))


// 2 4 6, 
// 2 4 6 8,
// 