// Given a matrix, and a target, return the number of non-empty submatrices that sum to target.

// A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.

// Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.

 

// Example 1:

// Input: matrix = [[0,1,0],
    //              [1,1,1],
    //              [0,1,0]], target = 0

// Output: 4
// Explanation: The four 1x1 submatrices that only contain 0.
// Example 2:

// Input: matrix = [[1,-1],
//                  [-1,1]], target = 0
// Output: 5
// Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.


var numSubmatrixSumTarget = function(M, T) {
    function mSum(i1,j1,i2,j2){
        let sum=0
        for (let i = i1; i <=i2; i++) {
            for (let j = j1; j <=j2; j++) {
                    sum+=M[i][j]                
            }            
        }
        return sum
    }
    var count=0
    var N=Array(M.length).fill(Array(M[0].length).fill(0))


    function nSum(i,j){

       if (j-1<0&&i-1>=0){N[i][j]=M[i][j]+N[i-1][j];
        N[i][j]==T?count++:null    
        return ;}
    if  (i-1<0&&(j-1)>=0){N[i][j]=M[i][j]+N[i][j-1];
        N[i][j]==T?count++:null    
        return;}
        if(i==0&&j==0) {N[i][j]=M[i][j];
            N[i][j]==T?count++:null    
            return ;}
        N[i][j]=M[i][j]+N[i][j-1]+N[i-1][j]-N[i-1][j-1]
        N[i][j]==T?count++:null    
        return;
    }

    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M[0].length; j++) {

            for (let ii = i; ii < M.length; ii++) {
                for (let jj = j; jj < M[0].length; jj++) {



                                     nSum(ii,jj)    

                }                
            }
            var N=Array(M.length-i).fill(Array(M[0].length-j).fill(0))
            console.log(N)
        }        
    }

    // for (let i = 0; i < M.length; i++) {
    //     for (let j = 0; j < M[0].length; j++) {
    //         console.log(N,i,j)

    //              nSum(i,j)    
    //         console.log('finished')
    //         }
            
    //     }        
    
    return count
};



console.log(numSubmatrixSumTarget(
    [[1,-1],[-1,1]],0
    ))