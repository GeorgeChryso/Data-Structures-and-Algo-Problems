// Given a matrix A, return the transpose of A.

// The transpose of a matrix is the matrix flipped over it's main diagonal, switching the row and column indices of the matrix.

var transpose = function(A) {
    let r=[]
    for (let j = 0; j < A[0].length; j++) {
            r.push([])
        for (let i = 0; i < A.length; i++) {
            r[j].push(A[i][j])
        }        
    }
    return r
};

console.log(
    transpose(
        [[1,2,3],[4,5,6],[7,8,9]]
    )
)