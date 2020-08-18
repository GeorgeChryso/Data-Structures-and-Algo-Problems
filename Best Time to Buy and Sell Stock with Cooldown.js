// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:

// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
// Example:

// Input: [1,2,3,0,2]
// Output: 3 
// Explanation: transactions = [buy, sell, cooldown, buy, sell]


// one of the problems which needs 2 dp tables instead of one. 
// 
var maxProfit = function(A) {
    let n = A.length;
    if(n<=1)return 0
    //dp[i]= Max profit till day i (i can sell on this day)
    //dp[i]=Max( dp[i-2](cd),dp[i-1](do nothing),Max(dp[i-k]+A[i]-A[k]))
    let dp=[...Array(n+1)].map(d=>0)
    dp[2]=Math.max(0,A[1]-A[0])
    for (let i = 3; i <= n; i++) {
        let toadd=-Infinity
        //cooldown
        for (let end = -2; end < i-2; end++) {
            let min=Infinity
            for (let j = end+1; j < i-2; j++) {
                min=Math.min(min,A[j+1])
            }
            toadd=Math.max(dp[end]||0-min,toadd)
        }
        dp[i]=Math.max(dp[i-1]||0,A[i-1]+toadd)
    }
    console.log(dp)
    return dp[n];
};

console.log(maxProfit(
    [1,2,3,6,0,4,10]
   //[1,2,4]
    //[6,1,3,2,4,7]
    ))


var maxProfit = function(prices) {
    let n = prices.length;
    let dpi0 = -Infinity, dpi1 = 0, dpi2 = 0;
    for (let i = 0; i < n; i++) {
        let tmp = dpi0;
        dpi0 = Math.max(dpi0, dpi2 - prices[i]);
        dpi2 = dpi1;
        dpi1 = Math.max(dpi1, tmp + prices[i]);
    }
    
    return dpi1;
  };

  //finite state Machine
  // s0: maximum profit if the last day i did nothing
  // s1: maximum profit if the last day i bought 
  // s3: maximum profit if the last day i sold

  // s0=Max(s0,)