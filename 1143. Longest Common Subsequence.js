// Given two strings text1 and text2, return the length of their longest common subsequence.

// A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

 

// If there is no common subsequence, return 0.


// DP problem

//dp[i][j]=LCS text1[0 ... i] & text2[0 ... j].
// DP[i][j] = DP[i - 1][j - 1] + 1 , if text1[i] == text2[j] DP[i][j] = max(DP[i - 1][j], DP[i][j - 1]) , otherwise



var longestCommonSubsequence = function(text1, text2) {
    let n=text1.length
    let m=text2.length
    let max = 0;

    let dp=[...Array(n+1)].map(d=>[...Array(m+1)].map(q=>0))
    
    for (let i = 1; i <n+1; i++) {
        for (let j = 1; j <m+1; j++) {
            if(text1[i]===text2[j]){
                console.log(i,j)
                dp[i][j]=dp[i-1][j-1]+1}
            else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1])
            max=Math.max(max,dp[i][j])
        }        
    }
    return max
};

console.log(
    longestCommonSubsequence(
        "abc",
"def"
    )
)