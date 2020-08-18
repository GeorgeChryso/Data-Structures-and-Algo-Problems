// Your are given an array of integers prices, for which the i-th element is the price of a given stock on day i; and a non-negative integer fee representing a transaction fee.

// You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction. You may not buy more than 1 share of a stock at a time (ie. you must sell the stock share before you buy again.)

// Return the maximum profit you can make.








//naive dp TLE
// dp[i]=max profit till day i 
// dp[i]=dp[i-1] (do nothing), dp[j]or take the max profit till day j(and buy on that day and sell now)
var maxProfit = function(A, fee) {
    let dp=[...Array(A.length+1)].map(d=>0)
    for (let i = 2; i <= A.length; i++) {
        let toadd=-Infinity
        for (let j = 0; j <i-1; j++) {
            toadd=Math.max(toadd,(dp[j]||0)-A[j]-fee)
        }
        dp[i]=Math.max(A[i-1]+toadd,dp[i-1])
    }
    console.log(dp)
    return dp[A.length]
};
console.log(maxProfit(
    [1,3,7,5,10,3],3
    )
)
//optimziation: you can keep track of the toadd value and not recompute it each time just like Buy and Sell Stock III IV 
var maxProfit = function(A, fee) {
    let dp=[...Array(A.length+1)].map(d=>0)
    let toadd=-Infinity

    for (let i = 2; i <= A.length; i++) {
        toadd=Math.max(toadd,(dp[i-2]||0)-A[i-2]-fee)
        dp[i]=Math.max(A[i-1]+toadd,dp[i-1])
    }
    return dp[A.length]
};

//optimization space : each time you only need dp[i-1] and to toadd in order to compute dp[i] 
//O(n) O(1)
var maxProfit = function(A, fee) {
    let dp1=0,dp2=0,toadd=-Infinity
    for (let i = 2; i <= A.length; i++) {
        toadd=Math.max(toadd,dp1-A[i-2]-fee)
        dp2=Math.max(A[i-1]+toadd,dp1)
        dp1=dp2
    }
    return dp2
};


//finite state machine

// Relatively easy fsm 2 states: s0=>sold on the last step OR rested, s1=>bought on the last step OR rested
var maxProfit=function(A,fee){
    let s0=0,s1=-A[0]-fee
    let n0=-Infinity,n1=-Infinity

    for (let i = 1; i < A.length; i++) {
        n0=Math.max(s0,s1+A[i])
        n1=Math.max(s1,s0-A[i]-fee)
        s0=n0
        s1=n1
    }
    return s0
}

console.log(maxProfit(
    [1,2,3,0,2],3
    )
)