// Your are given an array of positive integers nums.

// Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than k.

// 0 < nums.length <= 50000.
// 0 < nums[i] < 1000.
// 0 <= k < 10^6.


//Prefix Product, O(N**2)
//overflow=>wrong result for large nums
var numSubarrayProductLessThanK = function(nums, k) {
    nums.unshift(1)
    let n=nums.length,result=0
    for (let i = 1; i <n; i++) 
        nums[i]*=nums[i-1]        

    for (let i = 0; i < n; i++) 
        for (let j = i+1; j < n; j++) 
            if(nums[j]/nums[i] <k)
                result++
    return result
};

// 2 pointers, progressive count
// if my subarray of length m already has a product<k, then if i add an element
// and it still has a product less than k, then I just added m+1 subarrays with 
// a product less than k 
var numSubarrayProductLessThanK = function(nums, k) {
    let curr=1,n=nums.length,left=0,result=0

    for (let right = 0; right < n; right++) {
        curr*=nums[right] //advance right by one (add a new element to my window)
    
        while(curr>=k && left<=right)// advance left till my window has total product<k
            curr/=nums[left++] //OR TILL LEFT==RIGHT+1, which means that nums[right]>=k

        result+=right-left+1 // add the total number of NEW subarrays
        //right-left+1 can also be 0, when nums[right]>=k, which means that i added 0 new subarrays
        // to the total count
        
    }

    return result
};
console.log(
    numSubarrayProductLessThanK(
        [10,5,2,6],
        100
    )
)