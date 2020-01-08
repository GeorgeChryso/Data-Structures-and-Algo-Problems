// Given a square array of integers A, we want the minimum sum of a falling path through A.

// A falling path starts at any element in the first row, and chooses one element from each row.  The next row's choice must be in a column that is different from the previous row's column by at most one.

// NAIVE dfs TLE
var minFallingPathSum = function(A) {

    let recursion=(i,j,total)=>{
        if(i>=A.length||j<0||j>=A[0].length)return Infinity
        total+=A[i][j]
        
        if(i==A.length-1)return total //finished
        return Math.min(recursion(i+1,j,total),recursion(i+1,j-1,total),recursion(i+1,j+1,total))
    }

   
    return A[0].reduce( (acc,curr,j)=>Math.min(acc,recursion(0,j,0)),Infinity);
};


// let's use iterative dp with memo and no extra space
// bottom-top
var minFallingPathSum = function(A) {
    //dp[i][j] will be the smallest sum from the element A[i][j] to the end

    for (let i = A.length-2; i>=0; i--) {
        for (let j = 0; j < A[0].length; j++) {
            A[i][j]=Math.min(A[i+1][j],j+1<=A[0].length-1?A[i+1][j+1]:Infinity,j>=1?A[i+1][j-1]:Infinity)+A[i][j]
        }
    }
    return Math.min(...A[0])
};

console.log(
    minFallingPathSum(
        //[[1,2,3],[4,5,6],[7,8,9]]
       // [[51,24],[-50,82]]
       [[1,2,3],[4,5,6],[7,8,9]]
    )
)