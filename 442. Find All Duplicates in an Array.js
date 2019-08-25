// Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements that appear twice in this array.

// Could you do it without extra space and in O(n) runtime?



console.log( Number(5^1^2^1)==Number(5^1^2^1))

console.log(5^5)

var findDuplicates = function(nums) {
 for (let i = 0; i<nums.length; i++) {
    if(i==nums.lastIndexOf(nums[i])){
        nums.splice(i,1)

        i--
    }
 }
 let c


 

};


console.log(findDuplicates(
    [4,3,2,7,8,2,3,1]
))