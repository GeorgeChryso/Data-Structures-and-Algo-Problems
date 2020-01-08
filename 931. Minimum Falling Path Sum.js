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
            A[i][j]=Math.min(
                A[i+1][j],                              //either same column
                j+1<=A[0].length-1?A[i+1][j+1]:Infinity, // or next( if able)
                j-1>=0?A[i+1][j-1]:Infinity) // or previous( if able)
                +A[i][j]
        }
    }
    return Math.min(...A[0])
};

//recursion+memo
// top -bottom, O(nm) runtime,space
var minFallingPathSum=A=>{

    let dp=Array(A.length).fill(null).map(d=>Array(A[0].length).fill(null))
    // dp[i][j] the minimum distance from the beginning to A[i][j]
    dp[0]=A[0] // base case the min distance from the beginning to the beginning is A[i][j] 
    let recursion=(i,j)=>{
        if(i>=A.length||j<0||j>=A[0].length)return Infinity
        if(dp[i][j]!==null)return dp[i][j]

        //careful on the recursion, the maximum sum on a (next) line can only come from the Minimum of the previous lines plus the carrying sum 
        dp[i][j]= Math.min(recursion(i-1,j),recursion(i-1,j-1),recursion(i-1,j+1))+A[i][j]
        return dp[i][j]
    }

    // start the recursion
    A[A.length-1].forEach( (el,j) => {
        recursion(A.length-1,j)        
    });
    

    // Since I want to find the maximum ditance from the beginning to the last row
    return Math.min(...dp[A.length-1])
}

//bottom top recursion+memo
var minFallingPathSum=A=>{

    let dp=Array(A.length).fill(null).map(d=>Array(A[0].length).fill(null))
    // dp[i][j] the minimum distance from the END (last row) to A[i][j]
    dp[A.length-1]=A[A.length-1] // base case the min distance from the end to the end is A[i][j] 
    let recursion=(i,j)=>{
        if(i>=A.length||j<0||j>=A[0].length)return Infinity
        if(dp[i][j]!==null)return dp[i][j]

        //careful on the recursion, the maximum sum on a (next) line can only come from the Minimum of the previous lines plus the carrying sum 
        dp[i][j]= Math.min(recursion(i+1,j),recursion(i+1,j-1),recursion(i+1,j+1))+A[i][j]
        return dp[i][j]
    }

    // start the recursion
    A[0].forEach( (el,j) => {
        recursion(0,j)        
    });
    

    // Since I want to find the maximum ditance from the beginning to the last row
    return Math.min(...dp[0])
}

console.log(
    minFallingPathSum(
        //[[1,2,3],[4,5,6],[7,8,9]]
       // [[51,24],[-50,82]]
       [[1,2,3],[4,5,6],[7,8,9]]
    )
)