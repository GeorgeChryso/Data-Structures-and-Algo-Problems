// Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements that appear twice in this array.

// Could you do it without extra space and in O(n) runtime?



console.log()



var findDuplicates = function(nums) {
 for (let i = 0; i<nums.length; i++) {
    if(i==nums.lastIndexOf(nums[i])){
        nums.splice(i,1)

        i--
    }
 }
   return nums
};
console.log(findDuplicates(
    [4,3,2,7,8,2,3,1]
))