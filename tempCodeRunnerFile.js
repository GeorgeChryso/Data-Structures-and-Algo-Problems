var minimumTotal = function(A) {

    
    for (let i = A.length-2; i >=0; i--) {
          for (let j = 0; j < A[i].length; j++) {
              A[i][j]+=Math.min(A[i+1][j],A[i+1][j+1])
          }          
    }

    return A[0]

};
