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

// Works O(N),but is overcomplicated , i use prefix sum + a stack to keep track of the minimum prefix sum
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

// Intuition find a pair (minSum, result)
// such that the minSum is the leftside minimum prefix Sum of Result, the maximum Prefix Sum of the array
// Essentially, on each Prefix Sum, I'm searching for the leftmost minmimum element so their difference (PrefixSum - leftminimum) yields the highest result( sum of the corresponding subarray)

var maxSubArray = A => {
    if(!A.length)return 0
    var minSum = A[0];
    var PrefixSum = [minSum];
    var result = minSum;

    for (let i = 0; i < A.length; i++) {
        PrefixSum[i + 1] = PrefixSum[i] + A[i];
        result = Math.max(result, PrefixSum[i + 1] - minSum);
        minSum = Math.min(minSum, PrefixSum[i + 1]);
    }

    return result;
};

console.log(
    maxSubArray(
      //  [-1]
        // [1,2]
        //[-2,-1]
        // [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    )
);
