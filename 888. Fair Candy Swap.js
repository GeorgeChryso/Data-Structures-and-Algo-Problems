// Alice and Bob have candy bars of different sizes: A[i] is the size of the i-th bar of candy that Alice has, and B[j] is the size of the j-th bar of candy that Bob has.

// Since they are friends, they would like to exchange one candy bar each so that after the exchange, they both have the same total amount of candy.  (The total amount of candy a person has is the sum of the sizes of candy bars they have.)

// Return an integer array ans where ans[0] is the size of the candy bar that Alice must exchange, and ans[1] is the size of the candy bar that Bob must exchange.

// If there are multiple answers, you may return any one of them.  It is guaranteed an answer exists.

 

// Example 1:

// Input: A = [1,1], B = [2,2]
// Output: [1,2]
// Example 2:

// Input: A = [1,2], B = [2,3]
// Output: [1,2]
// Example 3:
// Input: A = [2], B = [1,3]
// Output: [2,3]
// Example 4:


var fairCandySwap = function(A, B) {


var maxA=A.reduce((d,z)=>d+z)
var maxB=B.reduce((d,z)=>d+z)

let q=-1
let l=0;
while(q==-1){
for (let i = 0; i < A.length; i++) {
  for (let j = 0; j < B.length; j++) {
   if( maxA-A[i]+B[j]==maxB-B[j]+A[i]
    ){
       console.log(c,c+l)
       return [A[i],B[j]]}       
  }
}
l++
i=0
j=0
}

return  q

};

console.log(
    fairCandySwap(
        [2],[1,3]
    )
)