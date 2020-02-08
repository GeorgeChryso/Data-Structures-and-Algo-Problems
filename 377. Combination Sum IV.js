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
    nums.sort((a, b) => a - b); 
    let dp=Array(target+1).fill(null).map(d=>0)
    dp[0]=1
    var maxItems=Math.floor( target/ nums[0]==0?1:nums[0])//maximum times I can use an item
    nums.unshift(0) // I can choose not to use an item
    let result=0 // Here i will be adding every dp[target] for each different nubmer of items used

    //using 3 fors
    for (let times = 0; times <=maxItems ; times++) {
        for (let i = target; i>=0; i--) {
            dp[i]=0 //ESSENTIAL beware
            for (const value of nums) {
                if(i>=value)dp[i]+=dp[i-value]
                else break
            }
            if(i==target)result+=dp[target]
        }
    }
        
    return result
};


//sorted Need to study using 2 loops
var combinationSum4 = function(nums, target) {
    nums.sort((a, b) => a - b);   //I sort it so I can have an early termiantion of my inner loop
    let dp = new Array(target+1).fill(0);
    for (let i = 1; i<= target; i++){
        for (let j = 0; j<nums.length;j++){
            if(nums[j] > i) break;//early termination due to sorting
            if(i == nums[j]){
                dp[i] += 1; 
            }
            dp[i] += dp[i-nums[j]]; 
        }    
    }
    return dp[dp.length-1];
    
};

var combinationSum4 = function(nums, target) {
    nums.sort((a, b) => a - b); 
    let dp=new Array(target+1).fill(0)//dp[i] is the number of possible combinations that add up to i

    //base case dp[0]=0

    for (let i = 1; i<=target; i++) {

        for (const value of nums) { //essentially trying to end up on sum=i from dp[i-value]
            if(i>=value){
                dp[i]+=(dp[i-value]  +(i==value)?1:0)
            }
            else break //early termination
        }
    }
    
        
    return dp[dp.length-1]
};



//solve it recursively too, top down and bottomuup

console.log(combinationSum4([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    ,10))