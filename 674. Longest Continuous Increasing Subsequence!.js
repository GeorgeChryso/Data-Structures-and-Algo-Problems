'use strict'



// Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray).

// Example 1:
// Input: [1,3,5,4,7]
// Output: 3
// Explanation: The longest continuous increasing subsequence is [1,3,5], its length is 3. 
// Even though [1,3,5,7] is also an increasing subsequence, it's not a continuous one where 5 and 7 are separated by 4. 


function isND(x){

    for (i in x ){
        if(i==0){
            continue;
        }
        if (x[i-1]>x[i] ){
            return false
        }

    }
    return true;
}

var findLengthOfLCIS0 = function(nums) {
    var max=0
    var maxu=0
    for(let i=0; i<nums.length;i++){
        if (nums[i]>=nums[i+1] ){
            max++
            if (maxu<max){
                maxu=max
            }
            console.log(nums[i],max)

            max=0

        }
        else{
            max++
                    console.log(nums[i],max)

        }

    }
    if( maxu<max){return max}
    return maxu==0?nums.length:maxu
};
var findLengthOfLCIS1 = function(nums) {
    var maxu=[]
    for(var i=1; i<nums.length ;i++){
        
        if (nums[i-1]>=nums[i] ){
            console.log(i)
            if (maxu.length==0){maxu.push(i)}else{
                maxu.push(i-maxu[maxu.length-1])
            }
            
        }
     
    }
    maxu.push(i-3-maxu[maxu.length-1])

    return (maxu[0]==0 && maxu.length==1)?nums.length: Math.max(...maxu);
};
