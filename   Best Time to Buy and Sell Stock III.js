// Say you have an array for which the ith element is the price of a given stock on day i.
// Design an algorithm to find the maximum profit. You may complete at most two transactions.
// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).






//Strategy: find an optimal cut index i
// such that i take maximum profit from 0:i + maximum profit from i+1 to end
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


//O(n) time O(1) space: dp

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
console.log(
    maxProfit([3,3,5,0,0,3,1,4]        )
)