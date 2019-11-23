// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// Example:

// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
// Follow up:

// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.


var maxSubArray = function(nums) {
    
    for (let i = 1; i < nums.length; i++){
       nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
   } 


 return Math.max(...nums)  
};


var maxSubArray=(A)=>{
    var result=0
    var start=0
    var prefixSum=[]
    var currSum=0

    //prefix Sum
    for (let end = 0; end < A.length; end++) {
        currSum+=A[end]
        prefixSum[end]=currSum
    }
    console.log(prefixSum)
    var stack=[]
    for (let i = 0; i < prefixSum.length; i++) {
        if(!stack.length||prefixSum[i]>=stack[stack.length-1]){
            stack.push(prefixSum[i])
            result=Math.max(result,prefixSum[i]-stack[0])
        }
        else{
            while(prefixSum[i]<stack[stack.length-1] && stack.length){
                stack.pop()
            }
            stack.push(prefixSum[i])

        }        
    }

    return result

}

console.log(maxSubArray(
    [-2,1,-3,4,-1,2,1,-5,4]
))
