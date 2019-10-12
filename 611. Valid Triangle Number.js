// Given an array consists of non-negative integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

// CONSTRAINTS
// The length of the given array won't exceed 1000.
// The integers in the given array are in the range of [0, 1000].



// O(N^3), O(1), retarded bruteforce no space
var triangleNumber = function(A) {
    var count=0
    
    var makeAtriangle=(a,b,c)=>{
     return a+b>c && a+c>b && c+b>a
    }

    for (let i = 0; i < A.length; i++) {
        for (let j = i+1; j < A.length; j++) {
            for (let k = j+1; k < A.length; k++) {
                if(makeAtriangle(A[i],A[j],A[k])) count++
            }            
        }
    }
    return count
};





// O(n^2) runtime 3 pointer approach, using some space tho
// O(logn) space from the sorting
const triangleNumber = nums => {
    nums.sort((a, b) => a - b);
  
    let count = 0;
  
    for (let k = nums.length - 1; k > 1; k--) {
     
      var start=0
      var end=k-1 

      while (start < end){ 

            if( nums[start]+nums[end]>nums[k]  ){
                count+= end-start //adds all the possible triplets inbetween

                end-- // lowers the total sum
            }

            else{
                start++ // increases the total sum 
            }

      }

    }

    
    return count;
  };

console.log(triangleNumber(
    [2,2,3,4]
))