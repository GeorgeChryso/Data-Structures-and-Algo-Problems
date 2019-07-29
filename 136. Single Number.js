// Given a non-empty array of integers, every element appears twice except for one. Find that single one.

// Note:

// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Example 1:

// Input: [2,2,1]
// Output: 1


var singleNumber = function(nums) {


    // for ( d of nums){
        
    //     if(nums.indexOf(d)==nums.lastIndexOf(d)){
    //         return d

    //     }

    // }

    return nums.reduce((a,b) => a^b);


    
};

// Runtime: 80 ms, faster than 31.27% of JavaScript online submissions for Single Number.
// Memory Usage: 37 MB, less than 47.45% of JavaScript online submissions for Single Number.


console.log(
    singleNumber(
       

        [1,0,1,5,0]
    )
)

console.log(2^3^2^3)