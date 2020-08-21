// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:

// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
// Example:

// Input: [1,2,3,0,2]
// Output: 3 
// Explanation: transactions = [buy, sell, cooldown, buy, sell]




//it can actually be solved by dp in O(n**2)
var maxProfit = function(A) {
    let n = A.length;
    if(n<=1)return 0
    //dp[i]= Max profit till day i (i can sell on this day)
    //dp[i]=Max( dp[i-1](do nothing),Max(dp[j-2]+A[i]-A[j]) (sell a stock that u bought on a previous day in order to a chieve maximum profit)),j=0,...i-1
    //so the thing is that dp[i]  can only refer to a cd day or a sell day
    //because max profit cannot be achieved if i buy on day i
    //dp[j-2] because a buy move of the item A[j] can only be achieved after 2 days of my max profit on day j

    // but why can I only buy an item A[j] on a day dp[j-2]?
    // as we ve said, u cant achieve dp[j] with a buy move that's why dp[j] is crossed out
    // what if dp[j-1] was achieved with a sell move? then dp[j] would have to refer to a cd day and not sell day
    // so it has to be dp[j-2]

    //How come im not considering something like dp[j-4]-A[j]? because dp[j-2] already holds the maximum profit 
    // out of the previous dp[..] values, so u dont need to consider anything prior to dp[j-2]
    let dp=[...Array(n)].map(d=>0)
    dp[2]=Math.max(0,A[1]-A[0])
    for( i = 0; i < n; i++){
        if(i == 0) dp[0] = 0;
        else if(i == 1) dp[1] = Math.max(A[1] - A[0], 0);
        else{
            //dp[i]=dp[i-1] //cooldown

            // linear scan to maximize my value
            // essentially wanting to maximize dp[j-2]-A[j]
            let val=-Infinity
            for(let j = 0; j < i; j++)
                val = Math.max(val, (dp[j-2]||0) - A[j]);
            
            dp[i]=Math.max(dp[i-1],A[i]+val)
        }
    }
    return dp[n-1];
};

//optimization: I dont actually need to recompute my dp[j-2]-A[j] each time. I can already store the maximum
var maxProfit = function(A) {
    let n = A.length;
    if(n<=1)return 0
    let maxVal=-Infinity
    let dp=[...Array(n)].map(d=>0)
    dp[2]=Math.max(0,A[1]-A[0])
    for( i = 0; i < n; i++){
        if(i < 2) maxVal = Math.max(maxVal, -A[i]); //NEW
        if(i == 0) dp[0] = 0;
        else if(i == 1) dp[1] = Math.max(A[1] - A[0], 0);
        else{
            dp[i]=Math.max(dp[i-1],A[i]+maxVal)   // THE ORDER OF THESE TWO MATTERS
            maxVal=Math.max(maxVal,dp[i-2]-A[i]) //THE ORDER OF THESE TWO MATTERS
        }
    }
    return dp[n-1];
};

  //finite state Machine
  // s0: maximum profit if the last day i did nothing
  // s1: maximum profit if the last day i bought 
  // s3: maximum profit if the last day i sold

  var maxProfit = function(A) {
    let n = A.length;
    let r = 0, b = -A[0], s = 0;
    let rr,bb,ss
    for (let i = 1; i < n; i++) {
        rr=Math.max(r,s) //i can come to rest either by resting the last day or by selling the last day
        ss=b+A[i]// i can sell only if i bought
        bb=Math.max(b,r-A[i]) // i can come to bought only if i bought or rested (after i bought)
        //advance the machine
        r=rr
        b=bb
        s=ss
    }
    
    return Math.max(r,s);
  };


