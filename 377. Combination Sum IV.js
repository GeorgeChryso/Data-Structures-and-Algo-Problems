// Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.

// Example:

// nums = [1, 2, 3]
// target = 4

// The possible combination ways are:
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)

// Note that different sequences are counted as different combinations.

// Therefore the output is 7.




var combinationSum4 = function(nums, target) {
    let dp=Array(target+1).fill(null).map(d=>0)
    dp[0]=1
    var maxItems=Math.floor( target/ Math.min(...nums))//maximum times I can use an item
    nums.unshift(0) // I can choose not to use an item
    let result=0 // Here i will be adding every dp[target] for each different nubmer of items used
    
    for (let times = 0; times <=maxItems ; times++) {
        for (let i = target; i>=0; i--) {
            dp[i]=0 //ESSENTIAL beware
            for (const value of nums) {
                if(i>=value)dp[i]+=dp[i-value]
            }
            if(i==target)result+=dp[target]
        }
    }
        
    return result
};

console.log(combinationSum4([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    ,10))