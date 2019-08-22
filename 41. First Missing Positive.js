'use strict'

// Given an unsorted integer array, find the smallest missing positive integer.

// Example 1:

// Input: [1,2,0]
// Output: 3

var firstMissingPositive = function(nums) {
    let z=  Math.max(... nums.filter(
    (d)=>d>0?d:0));
      
    for (var i=1; i<=z; i++){
        
      if  (nums.includes(i)){
        
      } 
       else{
         break;
       
       }
        
    } 
      
        return i
        
    };

console.log(
    firstMissingPositive(
        [1,2,0]
    )
)