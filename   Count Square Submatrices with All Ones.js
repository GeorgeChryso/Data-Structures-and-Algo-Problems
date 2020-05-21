// Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.



//classic DP O(mn) in place
var countSquares = function(A) {
    let result=0
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if(i==0||j==0){
                result+=A[i][j]
                continue
            }
            if(A[i][j]){
                A[i][j]=Math.min(A[i-1][j-1],A[i-1][j],A[i][j-1])+1
                result+=A[i][j]
            }            
        }        
    }
    return result
};

console.log(
    countSquares(
    [
        [0,1,1,1],
        [1,1,1,1],
        [0,1,1,1]
    ]

    )
)