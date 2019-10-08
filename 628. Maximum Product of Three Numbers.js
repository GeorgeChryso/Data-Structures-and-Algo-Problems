// Given an integer array, find three numbers whose product is maximum and output the maximum product.

// Example 1:

// Input: [1,2,3]
// Output: 6
 

// Example 2:

// Input: [1,2,3,4]
// Output: 24
 

// Note:

// The length of the given array will be in range [3,104] and all elements are in the range [-1000, 1000].
// Multiplication of any three numbers in the input won't exceed the range of 32-bit signed integer.


var maximumProduct = function(A) {
 

//
if(A.length==3)return A[0]*A[1]*A[2]

A=A.sort((a,b)=>a-b)

if(A[A.length-1]==0){
    return 0
}
if(A[A.length-1]<0 || A[0]>=0){
    return A[A.length-1]*A[A.length-2]*A[A.length-3]
}

for (var i = 0; i < A.length; i++) {
    if(A[i]>=0) break
}

if (i==1) return A[A.length-1]*A[A.length-2]*A[A.length-3]

if(i>=2){
    var max1=A[0]*A[1]*A[A.length-1]
    return Math.max(max1,A[A.length-1]*A[A.length-2]*A[A.length-3])
}



};

console.log(maximumProduct(
    [-4,-3,-2,-1,60]
))