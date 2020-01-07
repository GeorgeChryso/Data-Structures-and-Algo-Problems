'use strict'

//  169. Majority Element 
//[ 1 ,2 ,3 ,4 ,3 ,5 ]
// Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

// You may assume that the array is non-empty and the majority element always exist in the array.

// Example 1:

// Input: [3,2,3]
// Output: 3

var majorityElement = function(nums) {
    
    let objy={};
    let na=nums.length/2;
    console.log('na='+na)
    for (z of nums ){
        if (objy[z]==undefined) {
            objy[z]=1
        }else{
            objy[z]++
        }


    };

    for (let d in objy) {
       if (objy[d]>na) {
           console.log('objy['+d+'] > '+ na)
           na=d;
            break;
       }
        
    }
    console.log(nums)
    console.log(objy)
    console.log('max='+na)
    return na;



};

//simplified Hash O(n) O(n)
var majorityElement = function(nums) {
    
    let objy={};
    for (z of nums ){
      objy[z]=(objy[z]||0)+1
      if(objy[z]>Math.floor(nums.length/2))return z

    };
        
};

// Boyer moore
var majorityElement = function(nums) {
    let count=0
    let candidate=null
    for (z of nums ){
      if(!count)candidate=z
      count+=(z==candidate)?1:-1
    };
    return candidate
};

majorityElement([3,2,3])
