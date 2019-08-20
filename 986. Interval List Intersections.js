// Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

// Return the intersection of these two interval lists.


var intervalIntersection = (function(A, B) {
    
    let answ=[]
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            if(A[i][1]>=B[j][0])
            {console.log('aa')
                intersect(A[i],B[j])  }
        }
   

  
    }

    function intersect(A,B){
        if(A[0]<B[0]){
            if(A[1]<B[0]){return 0}
            else if ( A[1]<=B[1]){answ.push([B[0],A[1]])}
            else if (A[1]>B[1]){ answ.push([B[0],B[1]])}
            
        }
        else if ( A[0]==B[0]){ 
            if( A[1]>B[1]){  answ.push([A[0],B[1]]) }
            else {
                 answ.push([A[0],A[1]])
            }
        }
        else {
            if( A[0]>B[1]){return 0}
            else if ( A[0]<B[1]){
                if( A[1]<=B[1]){  answ.push([A[0],A[1]])}
                else{ 
                    answ.push([A[0],B[1]])
                }

            }
            else{
                answ.push([A[0],A[0]])
            }

        }

    }
    return answ
})(
    [[1,7]],
    [[3,10]]

)

console.log(intervalIntersection)