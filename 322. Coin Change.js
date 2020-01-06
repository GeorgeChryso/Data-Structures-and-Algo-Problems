// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// Example 1:

// Input: coins = [1, 2, 5], amount = 11
// Output: 3 
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1

//You may assume that you have an infinite number of each kind of coin.

// GELAW STA MOUTRA SAS GIATI EISTE TRASHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
// KNAPSACK WITH INFINITE ITEMS 

//naive TLE
var coinChange = function(A, T) {
    let result=Infinity

    let dp=(index,totalSum,numCoins)=>{
        if(totalSum>T||index>=A.length){
            return
        }
        if(totalSum==T){
            result=Math.min(result,numCoins)
        }
        dp(index,totalSum+A[index],numCoins+1)
        dp(index+1,totalSum+A[index],numCoins+1)
        dp(index+1,totalSum,numCoins)

    }
    dp(0,0,0)
    return result==Infinity?-1:result
};

//memo dp?
var coinChange = function(A, T) {
    let result=Infinity

    let dp=(index,totalSum,numCoins)=>{
        if(totalSum>T||index>=A.length){
            return
        }
        if(totalSum==T){
            result=Math.min(result,numCoins)
        }
        dp(index,totalSum+A[index],numCoins+1)
        dp(index+1,totalSum+A[index],numCoins+1)
        dp(index+1,totalSum,numCoins)

    }
    dp(0,0,0)
    return result==Infinity?-1:result
};



console.log(coinChange(
    [3,7,405,436],8839
))