// Given an array of non-negative integers, you are initially positioned at the first index of the array.

// Each element in the array represents your maximum jump length at that position.

// Determine if you are able to reach the last index.

var canJump = function(nums) {
    if(nums.length==0)return false
    let start=nums[0]
    
    if(nums.length==1)return true
    if(nums[0]===0)return false

    for (let i = 1; i <nums.length; i++) {
        let temp=Math.max(nums[i],nums[i-1]-1)
        if(temp<=0){
            return i==nums.length-1
        }  
        nums[i]=temp
    }
    return true
};