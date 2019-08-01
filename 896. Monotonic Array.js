// An array is monotonic if it is either monotone increasing or monotone decreasing.

// An array A is monotone increasing if for all i <= j, A[i] <= A[j].  An array A is monotone decreasing if for all i <= j, A[i] >= A[j].

// Return true if and only if the given array A is monotonic.

var isMonotonic = function(A) {
    if(A.length==0){return false}
   if ( A.length==1){return true};
 return  A.every((d,i)=>{
     return (i==A.length-1)?0<1:A[i]<=A[i+1]} 
                ) 
     ||
        A.every((d,i)=>{
     return (i==A.length-1)?0<1:A[i]>=A[i+1]}
              ) 
};

console.log(
    isMonotonic(
        
[1,2,1]
    )
)

// Runtime: 64 ms, faster than 95.58% of JavaScript online submissions for Monotonic Array.
// Memory Usage: 40.3 MB, less than 92.11% of JavaScript online submissions for Monotonic Array.