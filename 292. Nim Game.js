// You are playing the following Nim Game with your friend:

// Initially, there is a heap of stones on the table.
// You and your friend will alternate taking turns, and you go first.
// On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
// The one who removes the last stone is the winner.
// Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.


// Minimax DP
//memory limit exceeded, we can optimize to O(1) space cos only the last 3 are needed
var canWinNim = function(n) {
    let dp=[...Array(n)].map(d=>0)
    dp[0]=1,dp[1]=1,dp[2]=1
    for (let i = 3; i <n; i++) 
        dp[i]=!(dp[i-1]&dp[i-2]&dp[i-3])
    
    return dp[n-1]
};

// TLE lul, so we can do better
var canWinNim = function(n) {
    let [s1,s2,s3]=[1,1,1]
    for (let i = 3; i <n; i++)
        let curr=!(s1&s2&s3),
        s1=s2,
        s2=s3,
        s3=curr

    return s3
};

// the pattern is 1,1,1,0,1,1,1,0....etc
// so it gets 0 every 4-th number
var canWinNim = function(n) {
    return n%4!=0
};