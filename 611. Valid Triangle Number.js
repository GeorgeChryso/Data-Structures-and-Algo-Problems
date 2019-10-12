// Given an array consists of non-negative integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

// CONSTRAINTS
// The length of the given array won't exceed 1000.
// The integers in the given array are in the range of [0, 1000].


var triangleNumber = function(A) {
    var count=0
    var makeAtriangle=(a,b,c)=>{
     return a+b>c && a+c>b && c+b>a
    }

    for (let i = 0; i < A.length; i++) {
        for (let j = i+1; j < A.length; j++) {
            for (let k = j+1; k < A.length; k++) {
                if(makeAtriangle(A[i],A[j],A[k]))count++
            }            
        }
    }
    return count
};

console.log(triangleNumber(
    [2,2,3,4]
))