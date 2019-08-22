'use strict'

// Given an integer array, return the k-th smallest distance among all the pairs. The distance of a pair (A, B) is defined as the absolute difference between A and B.

// Example 1:
// Input:
// nums = [1,3,1]
// k = 1
// Output: 0 
// Explanation:
// Here are all the pairs:
// (1,3) -> 2
// (1,1) -> 0
// (3,1) -> 2
// Then the 1st smallest distance pair is (1,1), and its distance is 0.


var smallestDistancePair = function(nums, k) {
    let cont=[]
        nums.sort((a,b)=>a-b)
    let
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            cont.push(Math.abs(nums[i]-nums[j]))     
                   
        }
        
    }
   return cont.sort((a,b)=>b-a)[k-1]
};