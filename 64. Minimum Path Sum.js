// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.


// naive dfs TLE
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


console.log(minPathSum(
    [
    [1,3,1],
    [1,5,1],
    [4,2,1]]
))