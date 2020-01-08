// Given a square array of integers A, we want the minimum sum of a falling path through A.

// A falling path starts at any element in the first row, and chooses one element from each row.  The next row's choice must be in a column that is different from the previous row's column by at most one.

// NAIVE dfs
var minFallingPathSum = function(A) {
    let minimumSum=Infinity

    let recursion=(i,j,total)=>{
        if(i>=A.length||j<0||j>A[0].length-1||total>minimumSum)return Infinity
        
        total+=A[i][j]
        if(total<minimumSum && i==(A.length-1)){
            minimumSum=total
        }
        return Math.min(recursion(i+1,j,total),recursion(i+1,j-1,total),recursion(i+1,j+1,total))
    }

    A[0].forEach((start,j) => {
        recursion(0,j,start)
    });
    
    return minimumSum
};