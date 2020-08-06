
// Given a string s, find the longest palindromic subsequence's length in s. You may assume that the maximum length of s is 1000.
//example 
// input: 'abdebsa' => output: 'abba'

//There is of course an O(2**n) solution where I generate all possible subsequences and I examine whether each possible subsequence is palindromic

//-------------------------------

//Ok. Let's see. Given an array A0,...An
// Finding the longest palindromic subsequence, equals splitting the array at some index i, and calculating the LONGEST COMMON SUBSEQUENCE (dp problem in O(n**2)) between A0...Ai and Ai+1... An
// Consider that the split can happen both on an element (it being the center element) or between two elements. So there are totally 2n spots where I can split
// Let's remember the LCS problem: Given two Strings find their Longest Common (non contiguous) Subsequence
// This is a dp problem, solved in O(n**2) time through the formulat
// dp[i][j]={
//      if(A[i]==B[j])dp[i-1][j-1]+1
//      else Math.max(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
//} dp[i][j]= LCS of the subarrays A[0...i] B[0...j]

var longestPalindromeSubseq=str=>{
    if(str.length<=1)return str.length

    let result=1, n=str.length
    for (let r = 1; r <n; r++) {
        let l1,l2,dp
        // we ll try 2 potential splits, 1 ON the element and 1 between the element and its previous 
        // On the element
        //solves the LCS of [0,...r-1] r [r+1,...n]
        if(r!==n-1){

            l1=r
            l2 =n-(r+1)
            dp=[...Array(l1+1)].map(d=>[...Array(l2+1)].map(q=>0))
            for (let i = 1; i <=l1; i++) {
                for (let j = 1; j <=l2; j++) {
                    if(str[i-1]===str[n-j])
                        dp[i][j]=dp[i-1][j-1]+1
                    else
                        dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])
                    result=Math.max(result,2*dp[i][j]+1)
                }                 
            }
        }
        //solves the LCS of [0,...r-1]  [r,...n]
        l1=r
        l2 =n-r
        dp=[...Array(l1+1)].map(d=>[...Array(l2+1)].map(q=>0))
        for (let i = 1; i <=l1; i++) {
            for (let j = 1; j <=l2; j++) {
                if(str[i-1]===str[n-j])
                    dp[i][j]=dp[i-1][j-1]+1
                else
                    dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])
                result=Math.max(result,2*dp[i][j])
            }                 
        }
        
    }
    return result
}

// I can do better : DP  the longest palindromic subsequence's length of substring(i, j), here i, j represent left, right indexes in the string
// dp[i][j]={
     //if the 2 ends are equal
     // if(A[i]==B[j])
    //      dp[i][j]=dp[i+1][j-1]+2//extend the str by A[i] and B[j]
    //  else
    //      dp[i][j]=Math.max(dp[i+1][j],dp[i][j-1]) //just take the biggest out of [i+1,j], [i,j-1] 
//}
var longestPalindromeSubseq=str=>{

    let n=str.length,result=1,
        dp=[...Array(n)].map(d=>[...Array(n)].map(q=>0))

    for (let i = 0; i < dp.length; i++) dp[i][i]=1 //1 element 

    for (let r = 1; r <n; r++) { //r is the length of the window
        for (let i=0; i <n-r; i++) { // [i,...j]
            let j=i+r
            if(str[i]===str[j]) 
                dp[i][j]=dp[i+1][j-1]+2
            else
                dp[i][j]=Math.max(dp[i+1][j],dp[i][j-1])
            result=Math.max(result,dp[i][j])
        }                 
    }
    return result
}
//the O(n) space optimization applies to this dp problem aswell


console.log(
    longestPalindromeSubseq("aa")
)