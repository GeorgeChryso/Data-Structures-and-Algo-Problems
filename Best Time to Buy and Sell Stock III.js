// Say you have an array for which the ith element is the price of a given stock on day i.
// Design an algorithm to find the maximum profit. You may complete at most two transactions.
// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).






//Strategy: find an optimal cut index i
// such that I take maximum profit from 0:i + maximum profit from i+1 to end
// within each one of these two intervals, I try to find the maximum profit through a buy and sell operation
var maxProfit = function(prices) {
    let n=prices.length
    let result=0
    for (let i = 0; i <n; i++) {
        
        let maxProfit1=0,min1=Infinity,max1=-1
        for (let j = 0; j <=i; j++) {
            if(prices[j]<min1){
                min1=prices[j]
                max1=prices[j]
            }
            else{
                if(prices[j]>max1){
                    max1=prices[j]
                    maxProfit1=Math.max(maxProfit1,max1-min1)
                }
            }
        }
        maxProfit2=0,min2=Infinity,max2=-1
        for (let j = i+1; j <n; j++) {
            if(prices[j]<min2){
                min2=prices[j]
                max2=prices[j]
            }
            else{
                if(prices[j]>max2){
                    max2=prices[j]
                    maxProfit2=Math.max(maxProfit2,max2-min2)
                }
            }
        }
        result=Math.max(result,maxProfit1+maxProfit2)
    }

    return result
};

//O(n) time O(n) space
//Optimization: I can just keep 2 arrays of suffix and prefix profits
var maxProfit = function(prices) {
    let n=prices.length
    let upto=[0] //sentinel 0
    let from=[0] //sentinel 0
    let result=0
    let min1=Infinity, min2=Infinity,max1=0,max2=-Infinity
    for (let i = 0,j=n-1; i <n; i++,j--) {
        if(prices[i]<min1){
            min1=prices[i]
            max1=prices[i]
        }
        else{
            if(prices[i]>max1){
                max1=prices[i]
            }
        }
        upto.push(Math.max(upto[i],max1-min1))
        if(-prices[j]<min2){
            min2=-prices[j]
            max2=-prices[j]
        }
        else{
            if(-prices[j]>max2){
                max2=-prices[j]
            }
        }
        from.unshift(Math.max(from[0],max2-min2))
    }
    
    //compute the result through the sum of upto and from
    for (let i = 0; i <=n; i++) {
        result=Math.max(from[i]+upto[i],result)        
    }
    return result
};


//O(n*n*k) time O(n*n) space: dp
// dp[i][k] Maximum Profit until index i, with AT MOST k transactions
// dp[i][k]=Math.max( dp[i-1][k],dp[j][k-1]+ A[i]-A[j] ) for j<i
var maxProfit = function(A) {
    let n=A.length,k=2
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


// O(k*n) time O(k*n) space
// Optimization: Trying to maximize the value 
// dp[j-1][kk-1]-A[j-1] can happen in O(n), instead of repeating the search of the maximized dp[j-1][kk-1]-A[j-1] as I m looking at the same elements
var maxProfit = function(A) {
    let n=A.length,k=2
    let dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(q=>0))
    //base cases
    //dp[i][0]=0 maximum profix with 0 transactions
    //dp[0][k]=0 maximum profit with with the first 0 elements at most k transactions
    for (let kk = 1; kk <=k; kk++) {
        let startsecond=dp[0][kk-1]-A[0] //heres the value i need to maximize
        for (let i = 1; i <=n; i++) {
            startsecond=Math.max(startsecond,dp[i-1][kk-1]-A[i-1]) //so i do it incrementally as on each i iteration I only need to consider
            // dp[i-1][kk-1]-A[i-1]
            dp[i][kk]=Math.max(dp[i-1][kk],A[i-1]+startsecond)
        }        
    }
    return dp[n][k]
};

//turn it upside down
var maxProfit = function(A) {
    let n=A.length,k=2
    let dp=[...Array(k+1)].map(d=>[...Array(n+1)].map(q=>0))
    //base cases
    //dp[i][0]=0 maximum profix with 0 transactions
    //dp[0][k]=0 maximum profit with with the first 0 elements at most k transactions
    for (let kk = 1; kk <=k; kk++) {
        let startsecond=dp[kk-1][0]-A[0] //heres the value i need to maximize
        for (let i = 1; i <=n; i++) {
            startsecond=Math.max(startsecond,dp[kk-1][i-1]-A[i-1]) //so i do it incrementally as on each i iteration I only need to consider
            // dp[i-1][kk-1]-A[i-1]

            dp[kk][i]=Math.max(dp[kk][i-1],A[i-1]+startsecond)
        }        
    }
    dp.forEach(d=>console.log(d+''))
    return dp[k][n]
};
console.log(
    maxProfit([3,3,5,0,0,3,1,4]        )
)
// Usual space optimization of dp => 2 row dp
// O(k*n) time O(n) space
var maxProfit = function(A) {
    let n=A.length,k=2
    let previous=[...Array(n+1)].map(q=>0)
    let next=[...Array(n+1)].map(q=>0)

    for (let kk = 1; kk <=k; kk++) {
        let startsecond=previous[0]-A[0] //heres the value i need to maximize
        for (let i = 1; i <=n; i++) {
            startsecond=Math.max(startsecond,previous[i-1]-A[i-1]) 
            next[i]=Math.max(next[i-1],A[i-1]+startsecond)
        }      
        previous=[...next]  

    }
    return next[n]
};
// Notice how they re fucking calculated omfg... 
// Consider dp[k][i]. In order for it to be calculated it essentially needs just its PREVIOUS COLUMNS... so since i want dp[k][n] I just need dp[k-1][n] which needs dp[k-2][n] .... and so on

//O(kn) time O(k) space (constant?)
var maxProfit = function(A) {
    let n=A.length,k=2
    let dp=[...Array(k+1)].map(q=>0)
    let min= [...Array(k+1)].map(q=>A[0])
    for (let i = 1; i <n; i++) {
        for (let kk = 1; kk <=k; kk++) {
            min[kk] = Math.min(min[kk], A[i] - dp[kk-1]);
            dp[kk] = Math.max(dp[kk], A[i] - min[kk]);
        }
    }      
    return dp[k]
};
console.log(
    maxProfit([3,3,5,0,0,3,1,4]        )
)