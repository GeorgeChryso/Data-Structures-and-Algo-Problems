
// Given an array of integers, find if the array contains any duplicates.

// Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

var containsDuplicate = function(nums) {
    let set=new Set()
    
    return nums.some(d=>{
        if(set.has(d))return true
        else{
            set.add(d)

             return false
        } 
    })
};