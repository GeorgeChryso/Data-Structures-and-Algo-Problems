
// You must not modify the array (assume the array is read only).
// You must use only constant, O(1) extra space.

// Your runtime complexity should be less than O(n2).
// There is only one duplicate number in the array, but it could be repeated more than once..

var findDuplicate = function(nums) {
    nums= nums.sort()
   for (let i = 0; i < nums.length; i++) {
    if( nums[i]==nums[i+1])return nums[i]}
  }
// terrible btw

var findDuplicate = function(nums) {
    var z={}
    for (let i = 0; i < nums.length; i++) {
        if(!z[nums[i]])z[nums[i]]=1
        else return nums[i]       
    }

    console.log(z)
};
// fast but beats the cause



console.log(findDuplicate(
    [1,3,4,2,2]
))