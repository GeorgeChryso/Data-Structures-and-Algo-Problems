// Given an array of integers A, We need to sort the array performing a series of pancake flips.

// In one pancake flip we do the following steps:

// Choose an integer k where 0 <= k < A.length.
// Reverse the sub-array A[0...k].
// For example, if A = [3,2,1,4] and we performed a pancake flip choosing k = 2, we reverse the sub-array [3,2,1], so A = [1,2,3,4] after the pancake flip at k = 2.

// Return an array of the k-values of the pancake flips that should be performed in order to sort A. Any valid answer that sorts the array within 10 * A.length flips will be judged as correct.
// Example 1:

// Input: A = [3,2,4,1]
// Output: [4,2,4,3]
// Explanation:
// We perform 4 pancake flips, with k values 4, 2, 4, and 3.
// Starting state: A = [3, 2, 4, 1]
// After 1st flip (k = 4): A = [1, 4, 2, 3]
// After 2nd flip (k = 2): A = [4, 1, 2, 3]
// After 3rd flip (k = 4): A = [3, 2, 1, 4]
// After 4th flip (k = 3): A = [1, 2, 3, 4], which is sorted.
// Notice that we return an array of the chosen k values of the pancake flips.
// Example 2:

// Input: A = [1,2,3]
// Output: []
// Explanation: The input is already sorted, so there is no need to flip anything.
// Note that other answers, such as [3, 3], would also be accepted.

// Constraints:

// 1 <= A.length <= 100
// 1 <= A[i] <= A.length
// All integers in A are unique (i.e. A is a permutation of the integers from 1 to A.length).


//ok the logic here is: 
// on each iteration:
// choose the highest element,and reverse on that idx
// after that, ,reverse on the idx the element should go
// then, work your way to the lower elements in the same manner
var pancakeSort = function(A) {
    let  result = [],
        n = A.length;

    for (let i = n; i >=1; i--) {

        //the element n should go to index n-1
        let idx = A.indexOf(i);
        if (idx == 0 &&i==1) break;
        if (idx ===i- 1) continue;

        result.push(idx + 1,i);
        console.log(i,idx,A)

        for (let j = 0; j <=idx >> 1; j++)
            [A[j], A[idx - j]] = [A[idx - j], A[j]];
        console.log(A)

        for (let j = 0; j <i >> 1; j++)
            [A[j], A[i - j-1]] = [A[i- j-1], A[j]];
        console.log(A)
    }
    return result;
};

console.log(pancakeSort([3, 2, 4, 1]));
