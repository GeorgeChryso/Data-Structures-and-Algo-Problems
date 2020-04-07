// Given the array nums, obtain a subsequence of the array whose sum of elements is strictly greater than the sum of the non included elements in such subsequence. 

// If there are multiple solutions, return the subsequence with minimum size and if there still exist multiple solutions, return the subsequence with the maximum total sum of all its elements. A subsequence of an array can be obtained by erasing some (possibly zero) elements from the array. 

// Note that the solution with the given constraints is guaranteed to be unique. Also return the answer sorted in non-increasing order.


var minSubsequence = function(nums) {
    nums.sort((a,b)=>b-a)
    let totalSum=nums.reduce((a,b)=>a+b)
    let result=[]
    let sum=0
    

    for (let i = 0; i < nums.length; i++) {

        sum+=nums[i]
        result.push(nums[i])
        if(sum>totalSum-sum)break
    }
    return result
};