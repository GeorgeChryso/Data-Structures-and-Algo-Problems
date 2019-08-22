'use strict'

// Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

// Return the intersection of these two interval lists.


var intervalIntersection = (function(A, B) {
    
    let answ=[]
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            if(A[i][1]>=B[j][0])
            {console.log('aa')
                intersect(A[i],B[j])  }
                else{
                    break
                }
        }
   

  
    }

    function intersect(A,B){
        if(A[0]<B[0]){
             if ( A[1]<=B[1]){answ.push([B[0],A[1]])}
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

var intervalIntersection = (function(A, B) {
    let ans = []
    let i = 0
    let j = 0
    
    while (i < A.length && j < B.length) {
        let [a0, a1] = A[i]
        let [b0, b1] = B[j]
        
        let min = Math.min(a1, b1)
        let max = Math.max(a0, b0)
        
        if (min >= max) ans.push([max, min])
        
        if (a1 > b1) {
            j++
        } else
         {
            i++
        }
    }
    
    return ans
})(
    [[1,7]],
    [[3,10]]

)

console.log(intervalIntersection)