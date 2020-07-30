// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:

// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
// Example:

// Input: [1,2,3,0,2]
// Output: 3 
// Explanation: transactions = [buy, sell, cooldown, buy, sell]





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