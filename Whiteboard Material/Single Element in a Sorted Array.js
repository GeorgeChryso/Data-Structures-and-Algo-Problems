// You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once.
//Note: Your solution should run in O(log n) time and O(1) space.



// O(n) time O(1) space
var singleNonDuplicate = function(nums) {
    return nums.reduce( (acc,curr)=>acc^curr,0)
};


// O(logn) time O(1) space
// Binary search. 
// Concept: Well, when the mid is calculated, you know whats happening with the remaining items on the right and on the left
// Consider the number of the elements on the left and on the right of the middle element
// combined with whether the middle element is equal to its previous on each case!
var singleNonDuplicate = function(nums) {
    let lo =0,hi=nums.length-1
    while(lo<=hi){
        let mid= Math.floor(lo+(hi-lo)/2)
        if(nums[mid]!==nums[mid-1]&&nums[mid+1]!==nums[mid])return nums[mid]
        
        if(!(mid&1)){
            if(nums[mid]==nums[mid-1])hi=mid-1
            else lo=mid+1
        }   
        else{
            if(nums[mid]==nums[mid-1])lo=mid+1
            else hi=mid-1
        }
    }
    return nums[hi]
};