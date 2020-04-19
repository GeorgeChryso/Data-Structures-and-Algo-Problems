// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Your algorithm's runtime complexity must be in the order of O(log n).

var search = function(A, target) {
    
    let lo = 0, hi = A.length;
    while (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);
        
        let num = (A[mid] < A[0]) == (target < A[0])
                   ? A[mid]
                   : target < A[0] ? -Infinity : Infinity;
                   
        if (num < target)
            lo = mid + 1;
        else if (num > target)
            hi = mid;
        else
            return mid;
    }
    return -1;
};