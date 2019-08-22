'use strict'



var rotate0 = function(A, k) {
    

    for (let i = 0; i < k; i++) {
  A.unshift(A[A.length-1])
    A.splice(A.length-1,1)        
    }
    return A
};

var rotate=(A,k)=>{

    return A.map((d,i)=>
    i<k?A[A.length-i-1]:A[i-k])
}

console.log(
    rotate(
        [1,2,3,4,5,6,7],3
    )
)