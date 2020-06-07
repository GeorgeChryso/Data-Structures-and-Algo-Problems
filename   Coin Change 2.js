// // You are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.

// Input: amount = 5, coins = [1, 2, 5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1




var change = function(amount, S) {
    
    //array for every possible sum
    let dp=[...Array(amount+1)].map(d=>0)
    // dp[i]=dp[i]+dp[i-S[k]]
    dp[0]=1
    for(let i=0; i<S.length; i++) 
     for(let j=S[i]; j<=amount; j++) 
         dp[j] += dp[j-S[i]]; 
    
    
    return dp[amount]
};

console.log(change(
    5,
[1,2,5]
))