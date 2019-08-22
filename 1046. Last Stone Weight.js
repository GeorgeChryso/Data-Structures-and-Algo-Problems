


var lastStoneWeight = function(A) {
    while(Math.max(...A)>1&&A.length>1){
             A= A.sort((a,b)=>a-b)
        if( A[A.length-2]==A[A.length-1]){
                A.splice(A[A.length-2],2)
        }
        else{
            A[A.length-1]=A[A.length-1]-A[A.length-2]
            A.splice(A[A.length-2],1)

        }
        console.log(A)
    }
    return A[0]
};

console.log(lastStoneWeight(
    [1,3]
    ))