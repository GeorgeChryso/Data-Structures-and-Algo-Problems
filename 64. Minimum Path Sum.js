// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.


// naive dfs TLE
// O(2^n)
var minPathSum = function(A) {
    let result=Infinity
    var dp=(i,j,value)=>{
        if(i>=A.length||j>=A[0].length)return
        if(i==A.length-1&&j==A[0].length-1){
            result=Math.min(result,value+A[i][j])
            return
        }
        dp(i+1,j,value+A[i][j])
        dp(i,j+1,value+A[i][j])

    }
    dp(0,0,0)

    return result
};

// let's use memo dp top bottom
var minPathSum = function(A) {
    let MinSum=Array(A.length).fill(null).map(d=>Array(A[0].length).fill(null))
    //MinSum[i][j] is the minimum sum to reach A[i][j] 

    var dp=(i,j)=>{
        if(i<0||j<0)return Infinity
        if(MinSum[i][j]!=null)return MinSum[i][j]
        if(i==0&&j==0){ //base case
            MinSum[0][0]=A[0][0]
            return A[0][0]
        }
        MinSum[i][j]=Math.min(dp(i-1,j),dp(i,j-1))+A[i][j]

        return MinSum[i][j]
    }

    //so I want the minimum sum to reach A[A.length-1][A[0].length-1]
    //which is obviously the minimumsum to reach its left or up, plus A[A.length-1][A[0].length-1]
    return dp(A.length-1,A[0].length-1)
};

// memo dp bottom top
var minPathSum = function(A) {
    let MinSum=Array(A.length).fill(null).map(d=>Array(A[0].length).fill(null))
    //MinSum[i][j] is the minimum sum to reach the end, when u start from A[i][j] 

    var dp=(i,j)=>{
        if(i>=A.length||j>=A[0].length)return Infinity
        if(MinSum[i][j]!=null)return MinSum[i][j]
        if(i==A.length-1&&j==A[0].length-1){ //base case
            MinSum[i][j]= A[A.length-1][A[0].length-1]
            return MinSum[i][j]
        }
        MinSum[i][j]=Math.min(dp(i+1,j),dp(i,j+1))+A[i][j]

        return MinSum[i][j]
    }

    //so I want the minimum sum to reach A[A.length-1][A[0].length-1]
    //which is obviously the minimumsum starting from A[0][0], MnSum[i][j]
    return dp(0,0)
};

//No extra space
var minPathSum = function(A) {
    // I alter my table to save to A[i][j] to the minimum sum to reach A[i][j] 
    // the first row consists only of moving right options,therefore the minimum sum comes from just adding the elements from left to right
    for (let i = 1; i < A[0].length; i++) {
        A[0][i]+=+A[0][i-1]       
    }

    // as for any other element, it comes from adding its value to the minimum of coming from up or left
    for (let i = 1; i < A.length; i++) {
        for (let j =0;j<A[0].length;j++) {
            if(j==0)A[i][j]+=A[i-1][j]
            else A[i][j]+=Math.min(A[i-1][j],A[i][j-1])
        }
    }
    
    // therefore
    return A[A.length-1][A[0].length-1]
};
console.log(minPathSum(
    [
    [1,3,1],
    [1,5,1],
    [4,2,1]
]
))