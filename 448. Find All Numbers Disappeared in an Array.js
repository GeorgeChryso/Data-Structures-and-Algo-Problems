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

 var findDisappearedNumbers = function(A) {
  let j = 0;
 let tmp = null
while (j < A.length) {
 let curr = A[j]
      if (j + 1 !== curr) {
        let n2 = A[curr - 1]
                if (curr !== n2) {
                    tmp = A[j]          // If curr != A[curr-1]
                    A[j] = A[curr - 1]   //A[j] switch A[A[j]-1]
                    A[curr - 1] = tmp   // curr switch A[curr-1]
                }
                else {
                    j++
                }
            }
        else {
        j++
    }
}

j = 0;
for (let i = 0; i < A.length; i++) {
  if (i + 1 != A[i]) {
    A[j++] = i + 1
  }
}
A.length = j
return A
};
// };

console.log(findDisappearedNumbers(
   //[4,3,2,7,8,2,3,1]
    [1,1]
  // [1,2,3,4,4]
 // [2,3,1,5,1]
))

console.log()