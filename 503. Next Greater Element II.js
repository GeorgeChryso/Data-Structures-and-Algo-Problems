
var nextGreaterElements = function(A) {
return A.map((d,j)=>{
   for (let i = j+1; i < A.length; i++) {
       if(d<A[i])return A[i]       
   }
   for (let i =0; i < j; i++) {
    if(d<A[i])return A[i]       
   }
   return -1  
 }
)
};