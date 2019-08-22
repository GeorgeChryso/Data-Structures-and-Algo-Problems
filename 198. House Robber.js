'use strict'

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

// Example 1:

// Input: [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
//              Total amount you can rob = 1 + 3 = 4.



var rob =(nums)=> {
 
  
    if (nums.length==0){
      return 0
    }
   var prev1=0
     var prev2=0
   
  for (let i = 0; i < nums.length; i++){
     
   
       let temp=prev1
        prev1=Math.max(prev2+nums[i],prev1)  
       prev2=temp
       
     
   
     
  }
   
     return  prev1
   
  
 };  

 console.log(rob([1,3,45,3,2,1]))