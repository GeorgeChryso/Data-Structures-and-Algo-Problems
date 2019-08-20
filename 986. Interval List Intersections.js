// Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

// Return the intersection of these two interval lists.


var intervalIntersection = (function(A, B) {
    
    let answ=[]
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {

            (intersect(A[i],B[j])!=0?answ.push(intersect(A[i],B[j])):null)                 
        }
   

  
    }

    function intersect(A,B){
        if(A[0]<B[0]){
            if(A[1]<B[0]){return 0}
            else if ( A[1]<B[1]){return [B[0],A[1]]}
            else if (A[1]>B[1]){return [B[0],B[1]]}

            else if (A[1]>B[0]){return [B[0],A[1]]}
            else if (A[1]==B[0]){
                return [B[0],B[0]]
            }
            else if (A[1]==B[1]){
                return [B[0],A[1]]
            }
        }
        else if ( A[0]==B[0]){ 
            if( A[1]>B[1]){ return [A[0],B[1]]}
            else {
                return [A[0],A[1]]
            }
        }
        else {
            if( A[0]>B[1]){ return 0}
            else if ( A[0]<B[1]){
                if( A[1]<B[1]){ return [A[0],A[1]]}
                else if (A[1]==B[1]){ return [A[0],A[1]]}
                else{ 
                    return [A[0],B[1]]
                }

            }
            else{
                return [A[0],A[0]]
            }

        }

    }
    return answ
})(
    [[3,5],[9,20]],
    [[4,5],[7,10],[11,12],[14,15],[16,20]]

)

console.log(intervalIntersection)