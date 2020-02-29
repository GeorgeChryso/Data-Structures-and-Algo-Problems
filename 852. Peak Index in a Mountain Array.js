// Let's call an array A a mountain if the following properties hold:

// A.length >= 3
// There exists some 0 < i < A.length - 1 such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
// Given an array that is definitely a mountain, return any i such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1].
// Example 1:

// Input: [0,1,0]
// Output: 1
// Example 2:

// Input: [0,2,1,0]
// Output: 1
// Note:

// 3 <= A.length <= 10000
// 0 <= A[i] <= 10^6
// A is a mountain, as defined above.


var peakIndexInMountainArray = function(A) {
    let L=0
    let R=A.length-1

    while(L<=R){
        let mid=L+Math.floor((R-L)/2)
        if((A[mid-1]<=A[mid])&&(A[mid]>=A[mid+1]))return mid
        if(A[mid]<=A[mid+1])L=mid+1
        if(A[mid]>=A[mid+1])R=mid-1
    }

    return false
};

console.log(peakIndexInMountainArray(
    [18,29,38,59,98,100,99,98,90]
))