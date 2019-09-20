
// You must not modify the array (assume the array is read only).
// You must use only constant, O(1) extra space.
// Your runtime complexity should be less than O(n2).
// There is only one duplicate number in the array, but it could be repeated more than once..


var findDuplicate = function(nums) {
    var z={}
    for (let i = 0; i < nums.length; i++) {
        if(!z[nums[i]])z[nums[i]]=1
        else return nums[i]       
    }

    console.log(z)
};

console.log(findDuplicate(
    [1,3,4,2,2]
))