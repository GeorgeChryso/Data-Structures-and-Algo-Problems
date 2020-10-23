// Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].

// Return true if there is a 132 pattern in nums, otherwise, return false.

// Follow up: The O(n^2) is trivial, could you come up with the O(n logn) or the O(n) solution?

 

// Example 1:

// Input: nums = [1,2,3,4]
// Output: false
// Explanation: There is no 132 pattern in the sequence.
// Example 2:

// Input: nums = [3,1,4,2]
// Output: true
// Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
// Example 3:

// Input: nums = [-1,3,2,0]
// Output: true
// Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
 

// Constraints:

// n == nums.length
// 1 <= n <= 104
// -109 <= nums[i] <= 109


//straight to the optimal one
// Prefix MIN will determine at any point i what's the smallest number on it's left side
// So, at  any point j , i kknow in linear time 
// [minupto j, nums[j]] ===> (aka [i, j] in my question cos definitely nums[i]<nums[j])
// The only thing left to know if any number k>j is between that range
// so if any number on the right side is bigger than i (nums[i]) and smaller than j (nums[j])
// i return true
// This can be done in linear time if i search from right to left and keep a stack with candidates
var find132pattern = function(nums) {
    let prefixMin=[nums[0]],n=nums.length
    for(let i=1;i<n;i++)
        prefixMin.push( Math.min(prefixMin[prefixMin.length-1],nums[i]))

    //now comes the hard part
    /*
    // at any point 
        j-1: i know [minuptoj-1, nums[j-1]]
        j: i know   [minuptoj, nums[j]]
        j+1: i know [minuptoj+1,nums[j+1]]

    //Observation : minuptoj-1 >= minupto j>= minuptoj+1 
    
    //so the window of opportunity gets smaller from its left as we move
    // from the  right side to the left

    so if a candidate k, is <minuptoj+1
    then i know that this candidate will DEFINITELY be smaller than minuptoj, and minuptoj -1
    so this candiddate will never be inside my interval

    I will be using a stack to get rid of the candidates that are impossible to consider
    aka are smaller than prefixMin[i]

    let us now consider a candidate k from the right side to the let
        if my candidate is nums[k]<=prefixMin[j]
            then discard him immediately cos it will never be the correct one
        if my candidate is nums[k]>prefixMin[j]  and  nums[k]<nums[j]
            then this is the correct solution and reutnr true
        if my cnadidate is nums[k]>nums[j] then wait a second
         although my candidate doesnt currently satisfy the condition 
         sometime in the future, a nums[j'] can be bigger than that and satisfy the condition
    
    */
   let stack=[nums[n-1]] //the first candidate as k is alsways the last number

   for (let j = n-2; j >=0; j--) {
        let minuptoj=prefixMin[j]
        //range [minuptoj,nums[j]]

        //ditch the small pp smaller than my interval
        while(stack.length&&stack[0]<=minuptoj)
            stack.shift()

        // am i winning?
        if(stack.length&& stack[0]<nums[j])
            return true

        stack.unshift(nums[j]) //place the new candidate at the beginning of the stack
   }
   return false

};