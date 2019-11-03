// Given an array of integers nums and an integer k. A subarray is called nice if there are k odd numbers on it.

// Return the number of nice sub-arrays.


// 1 <= nums.length <= 50000
// 1 <= nums[i] <= 10^5
// 1 <= k <= nums.length/


// reduntant work, brute force O(N^3)
var numberOfSubarrays = function(A, K) {
    var count=0
    var isOdd=x=>x%2

  

    for (let start = 0; start < A.length; start++) {
        
        for (let end = start; end < A.length; end++) {
            var countOdd=0
                for (let i =start; i <=end; i++) {
                    if(isOdd(A[i]))countOdd++                    
                }
            if(countOdd==K)count++
            
        }
    }
    

    return count
};


var numberOfSubarrays = function(A, K) {
    
};