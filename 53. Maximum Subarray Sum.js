// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// Example:

// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
// Follow up:

// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

var maxSubArray = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
    }

    return Math.max(...nums);
};

var maxSubArray = A => {
    if (A.length == 1) return A[0];
    var result = -Infinity;
    var prefixSum = [];
    var currSum = 0;

    //prefix Sum
    for (let i = 0; i < A.length; i++) {
        currSum += A[i];
        prefixSum[i] = currSum;
    }
    console.log(prefixSum);

    // 
    var stack = [];
    for (let i = 0; i < prefixSum.length; i++) {
        if (!stack.length || prefixSum[i] >= stack[stack.length - 1]) {
            stack.push(prefixSum[i]);
            if (stack.length == 1) {
                result = Math.max(stack[0], result);
            } else {
                result = Math.max(result, prefixSum[i] - stack[0]);
            }
        } else {
            while (prefixSum[i] < stack[stack.length - 1] && stack.length) {
                result = Math.max(result, prefixSum[i] - stack.pop());
            }
            stack.push(prefixSum[i]);
        }
    }

    return Math.max(result, Math.max(...prefixSum));
};

console.log(
    maxSubArray(
        // [-1]
        // [1,2]
        //[-2,-1]
       // [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    )
);
