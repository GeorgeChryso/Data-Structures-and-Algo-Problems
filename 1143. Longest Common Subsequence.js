// Given two strings text1 and text2, return the length of their longest common subsequence.

// A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

 

// If there is no common subsequence, return 0.


// DP problem

//dp[i][j]=LCS text1[0 ... i] & text2[0 ... j].
// DP[i][j] = DP[i - 1][j - 1] + 1 , if text1[i] == text2[j] DP[i][j] = max(DP[i - 1][j], DP[i][j - 1]) , otherwise
// dp[i][j] is the length of the LCS of subsequenecs A[0...i] and B[0...j]

//dp matrix
var longestCommonSubsequence = function(A, B) {
    let n=A.length
    let m=B.length
    let max = 0;

    let dp=[...Array(n+1)].map(d=>[...Array(m+1)].map(q=>0))
    
    for (let i = 1; i <=n; i++) {
        for (let j = 1; j <=m; j++) {
            if(A[i-1]===B[j-1]){
                console.log(i,j)
                dp[i][j]=dp[i-1][j-1]+1
            }
            else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])
            max=Math.max(max,dp[i][j])
        }        
    }
    dp.forEach(d=>console.log(''+d))
    pathreconstruction(A,B,n,m,dp)
    return max
};

//dp 1 row appraoch
var longestCommonSubsequence = function(A, B) {
    let n=A.length
    let m=B.length
    let max = 0;

    let dp=[...Array(m+1)].map(d=>0)
    
    for (let i = 1; i <=n; i++) {
        let temp=0,curr=0
        for (let j =1;j<=m;j++) {
            curr=dp[j]
            if(A[i-1]===B[j-1]){
                dp[j]=temp+1
            }
            else dp[j]=Math.max(dp[j],dp[j-1])
            max=Math.max(max,dp[j])
            temp=curr
        }        
    }
    dp.forEach(d=>console.log(''+d))
    pathreconstruction(A,B,n,m,dp)
    return max
};

let pathreconstruction=(A,B,i,j,dp)=>{
    if(i==0||j==0)return
    if(dp[i][j]===dp[i-1][j-1]+1&&A[i-1]===B[j-1]){
        pathreconstruction(A,B,i-1,j-1,dp)
        console.log(A[i-1])//i-1 cos of 0 indexing
    }
    else if (dp[i][j]==dp[i-1][j]){
        pathreconstruction(A,B,i-1,j,dp)
    }
    else pathreconstruction(A,B,i,j-1,dp)
}


//memoized recursion top down same runtime
var LCS=(A,B)=>{
    let n=A.length, m=B.length
    let dp=[...Array(n+1)].map(d=>[...Array(m+1)])
    let rec=(i,j)=>{
        if(dp[i][j]!==undefined)return dp[i][j]
        if(i==0||j==0)
            dp[i][j]=0
        else if(A[i-1]===B[j-1])
            dp[i][j]=rec(i-1,j-1)+1
        else 
            dp[i][j]=Math.max(rec(i-1,j),rec(i,j-1))
        return dp[i][j]
    }
    return rec(n,m)
}

console.log(
    longestCommonSubsequence(
      //  "abc","def"
        '10010101','010110110'
    )
    ,
    LCS(
        '10010101','010110110'
    )
)