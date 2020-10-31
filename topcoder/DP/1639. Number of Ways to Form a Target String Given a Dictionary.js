// You are given a list of strings of the same length words and a string target.

// Your task is to form target using the given words under the following rules:

// target should be formed from left to right.
// To form the ith character (0-indexed) of target, you can choose the kth character of the jth string in words if target[i] = words[j][k].
// Once you use the kth character of the jth string of words, you can no longer use the xth character of any string in words where x <= k. In other words, all characters to the left of or at index k become unusuable for every string.
// Repeat the process until you form the string target.
// Notice that you can use multiple characters from the same string in words provided the conditions above are met.

// Return the number of ways to form target from words. Since the answer may be too large, return it modulo 109 + 7.
// Input: words = ["acca","bbbb","caca"], target = "aba"
// Output: 6
// Explanation: There are 6 ways to form target.
// "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
// "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
// "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
// "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
// "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
// "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")

var numWays = function(words, target) {
    let mod=1e9+7,n=words.length,m=words[0].length
    if(m<target.length)
        return 0
    let dict=[...Array(m)].map(d=>[...Array(26)].map(d=>0))
    //create a dicitonary regarding each position of words[i]
    // this dictionoary will hold the frequency of each character on that index
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) 
            dict[j][words[i][j].charCodeAt(0)-97]++            

    //dp[i][j]= the number of ways to form 
    // up to target[:i] using dict[:j] till index j
    let dp=[...Array(target.length+1)].map(d=>[...Array(m+1)].map(d=>0))
    dp[0].fill(1)//basecase
    // dp[0][j]=1 means to create '', using dict[:i]
    // the number of ways to form

    for(let j=1;j<=m;j++)
        for(let i=1;i<=target.length;i++)
            times=dict[j-1][target.charCodeAt(i-1) -97],
            //the number of ways I could create it with dict[:j-1]
            // plus the new times 
            // that means the frequency of target[i] on dict[j]
            // times the number of ways I could create target[:i-1]
            // (being at taret[i] lets me use this letter as many times as it is
            // available with the )
            dp[i][j]=(dp[i][j-1]+ dp[i-1][j-1]*times)%mod               

    return dp[target.length][m]%mod
};
