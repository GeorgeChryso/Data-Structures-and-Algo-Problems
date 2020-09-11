// Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

// Example 1:

// Input: [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:

// Input: [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.


//prefix product, reduced to O(n) for the best case, similar to Kadane's but for Product. 
var maxProduct = function(nums) {
    let minpos=Infinity,maxneg=-Infinity,curr=0,result=-Infinity
    for (let i = 0; i < nums.length; i++) {
        if(nums[i]==0) //reset them all
            minpos=Infinity,maxneg=-Infinity,curr=0
        else if(curr==0)
            curr=nums[i]
        else
            curr*=nums[i]

        result=Math.max(result,curr/(minpos==Infinity?1:minpos),curr/(maxneg!=-Infinity?maxneg:1),curr)

        if(curr>0)
            minpos=Math.min(minpos,curr)
        else if(curr<0)
            maxneg=Math.max(maxneg,curr)
    }
    return result
};
console.log(maxProduct([-2]))