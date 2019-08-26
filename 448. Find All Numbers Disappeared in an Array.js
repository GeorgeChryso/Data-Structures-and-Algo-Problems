// Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements of [1, n] inclusive that do not appear in this array.

// Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

// Example:

// Input:
// [4,3,2,7,8,2,3,1]

// Output:
// [5,6]

var findDisappearedNumbers = function(A) {
    let answ=[]
    for (let i = 1; i < A.length+1; i++) {
                
            if (A[Math.abs(A[i-1])-1]>=0){
                A[Math.abs(A[i-1])-1]*=-1
            }
         
    }
    for (let i = 0; i < A.length; i++) {
           if(A[i]>0){
              answ.push(i+1 )}
        
     
    }
    return answ
};


var findDisappearedNumbers = function(A) {
    let S=new Set(A.keys()).add(A.length)
    S.delete(0)
    console.log(S)
    
    for (let i = 0; i < A.length; i++) {
                
            S.delete(A[i])
         
    }
   
    return [...S]
};

 var findDisappearedNumbers = function(nums) {
  let index = 0;
 let tmp = null
while (index < nums.length) {
 let n1 = nums[index]
      if (index + 1 !== n1) {
        let n2 = nums[n1 - 1]
                if (n1 !== n2) {
                    tmp = nums[index]
                    nums[index] = nums[n1 - 1]
                    nums[n1 - 1] = tmp
                }
                else {
                    index++
                }
            }
        else {
        index++
    }
}

index = 0;
for (let i = 0; i < nums.length; i++) {
  if (i + 1 != nums[i]) {
    nums[index++] = i + 1
  }
}
nums.length = index
return nums
};
// };

console.log(findDisappearedNumbers(
   //[4,3,2,7,8,2,3,1]
    [1,1]
  // [1,2,3,4,4]
 // [2,3,1,5,1]
))

console.log()