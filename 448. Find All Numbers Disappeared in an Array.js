// Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements of [1, n] inclusive that do not appear in this array.

// Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

// Example:

// Input:
// [4,3,2,7,8,2,3,1]

// Output:
// [5,6]

var findDisappearedNumbers = function(A) {

    for (let i = 1; i < A.length+1; i++) {
                
            if (A[Math.abs(A[i-1])-1]>=0){
                A[Math.abs(A[i-1])-1]*=-1
            }
         
    }
    for (let i = 0,j=1; i < A.length; j++,i++) {
           if(A[i]<0){
               A.splice(i,1);
               i-- }
           else A[i]=j
        
     
    }
    return A
};


// var findDisappearedNumbers = function(A) {
//     let l=A.length
//     A=new Object(A)
//     let ans=[]
//     for (let i = 1; i < l+1; i++) {
                
//             if (!A.has(i)){
//                 answ.push(i)
//             }
         
//     }

//     return answ
// };

console.log(findDisappearedNumbers(
   [4,3,2,7,8,2,3,1]
    //[1,1]
  // [1,2,3,4,4]
 // [2,3,1,5,1]
))