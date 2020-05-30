// Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

// doesnt handle zeroes
var maxProduct = function(nums) {
    
    let prefix=[1]
    let result=-Infinity

    let total=1
    for (let i = 0; i < nums.length; i++) {
        total*=nums[i]
        result=Math.max(result,total,nums[i])
        prefix.push(total)
    }
    for (let i = 0; i < prefix.length; i++) {
        for (let j = i+1; j < prefix.length; j++) {
            prefix[i]?result=Math.max(result,prefix[j]/prefix[i]):null
        }        
    }
    return result
};



var maxProduct = function(nums) {
    let prevMax = nums[0];
    let prevMin = nums[0];
    let result = nums[0];
    for (let i=1;i<nums.length;i++) {
        // given the new number, the new maximun can have 3 conditions
        // 1. number(+) * prevMax(+) is the largest
        // 2. number(+) it self is the largest
        // 3. number(-) * prevMin(-) is the largest 
        curMax = Math.max(nums[i] * prevMax, nums[i], nums[i] * prevMin);
        
        curMin = Math.min(nums[i] * prevMin, nums[i], nums[i] * prevMax);

		// updating the prevMax & prevMin, these two may swap locations
        prevMax = curMax
        prevMin = curMin

        result = Math.max(curMax, result);
    }
    return result;
}