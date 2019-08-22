// A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same element.

// Now given an M x N matrix, return True if and only if the matrix is Toeplitz.
 

// Example 1:

// Input:
// matrix = [
//   [1,2,3,4],
//   [5,1,2,3],
//   [9,5,1,2]
// ]
// Output: True
// Explanation:
// In the above grid, the diagonals are:
// "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
// In each diagonal all elements are the same, so the answer is True


var isToeplitzMatrix = function(A) {
    function chechdiag(i,j){
        let z=A[i][j]
        console.log(z)
        while( i<A.length &&  j<A[0].length  ){
            if( z!=A[i][j]){return false}
            console.log(i,j,A[i][j],z)
            i++
            j++
        }
        console.log('a')
        return true
    }

    for (let i = 0; i < A[0].length; i++) {
        if(chechdiag(0,i)==false){
            return false
        }
        
        
    }

    for (let i = 1; i < A.length; i++) {
        if(chechdiag(i,0)==false){
            return false
        }
        
        
    }
    return chechdiag(0,0)
};


console.log(isToeplitzMatrix(
    [[1,2,3,4],
     [5,1,2,3]
    ,[9,5,1,2]]
))