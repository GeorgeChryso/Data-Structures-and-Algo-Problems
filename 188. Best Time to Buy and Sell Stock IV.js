// Say you have an array for which the i-th element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete at most k transactions.

// Note:
// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

// Example 1:

// Input: [2,4,1], k = 2
// Output: 2
// Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
// Example 2:

// Input: [3,2,6,5,0,3], k = 2
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
//              Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// Accepted
// 133,859
// Submissions
// 478,001



// TLE
// O(n*n*k) time O(n*n) space: dp
// dp[i][k] Maximum Profit until index i, with AT MOST k transactions
// dp[i][k]=Math.max( dp[i-1][k],dp[j][k-1]+ A[i]-A[j] ) for j<i
var maxProfit = function(k,A) {
    let n=A.length
    let dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(q=>0))

    //base cases
    //dp[i][0]=0 maximum profix with 0 transactions
    //dp[0][k]=0 maximum profit with with the first 0 elements at most k transactions
    for (let kk = 1; kk <=k; kk++) {
        for (let i = 1; i <=n; i++) {
            let secondpart=-1
            for (let j = 1; j < i; j++) {
                secondpart=Math.max(secondpart,dp[j-1][kk-1]+A[i-1]-A[j-1])
            }
            dp[i][kk]=Math.max(dp[i-1][kk],secondpart)
        }        
    }
    dp.forEach(d=>console.log(d+''))
    return dp[n][k]
};


// Heap out of Memory 
// O(k*n) time O(k*n) space
// Optimization: Trying to maximize the value 
// dp[j-1][kk-1]-A[j-1] can happen in O(n), instead of repeating the search of the maximized dp[j-1][kk-1]-A[j-1] as I m looking at the same elements
var maxProfit = function(k,A) {
    let n=A.length
    let dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(q=>0))
    //base cases
    //dp[i][0]=0 maximum profix with 0 transactions
    //dp[0][k]=0 maximum profit with with the first 0 elements at most k transactions
    for (let kk = 1; kk <=k; kk++) {
        let startsecond=dp[0][k-1]-A[0] //heres the value i need to maximize
        for (let i = 1; i <=n; i++) {
            startsecond=Math.max(startsecond,dp[i-1][kk-1]-A[i-1]) //so i do it incrementally as on each i iteration I only need to consider
            // dp[i-1][kk-1]-A[i-1]
            dp[i][kk]=Math.max(dp[i-1][kk],A[i-1]+startsecond)
        }        
    }
    return dp[n][k]
};


// Consider dp[k][i]. In order for it to be calculated it essentially needs just its PREVIOUS COLUMNS... so since i want dp[k][n] I just need dp[k-1][n] which needs dp[k-2][n] .... and so on
//MEMORY
//O(kn) time O(k) space it's an .... Ok SOLUTION .GET IT? 
//if(k>=n/2) that means that I can make the maximum number of transactions possible. 
// which brings me back to Best Time to Buy and Sell Stocks II logic
var maxProfit = function(k,A) {
    let n=A.length
    //Special Tweak for maximum possible Transactions
    if(k>=n/2){
        var total=0
        for(let i=1;i<A.length;i++)
            if(A[i]>A[i-1])
                total+=A[i]-A[i-1]
        return total
    }

    let dp=[...Array(k+1)].map(q=>0), min= [...Array(k+1)].map(q=>A[0])
    for (let i = 1; i <n; i++) {
        for (let kk = 1; kk <=k; kk++) {
            min[kk] = Math.min(min[kk], A[i] - dp[kk-1]);
            dp[kk] = Math.max(dp[kk], A[i] - min[kk]);
        }
    }      
    return dp[k]
};