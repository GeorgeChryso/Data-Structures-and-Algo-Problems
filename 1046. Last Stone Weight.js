


var lastStoneWeight = function(A) {
    while(A.length>1){
             A= A.sort((a,b)=>a-b)
                let len=A.length    
        if( A[len-2]==A[len-1]){
                A.splice(len-2,2)
            
        }
        else{
            A[len-1]=A[len-1]-A[len-2]
              A.splice(len-2,1)
        }
    }
    return A[0]==undefined?0:A[0]
};

console.log(lastStoneWeight(
   

    [9,3,2,10]
        ))