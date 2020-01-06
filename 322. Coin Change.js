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
        dp(index,totalSum+A[index],numCoins+1) //
        dp(index+1,totalSum+A[index],numCoins+1)
        dp(index+1,totalSum,numCoins)

    }
    dp(0,0,0)
    return result==Infinity?-1:result
};

//memo dp
//Runtime O(n*T) space O(T)
var coinChange = function(A, T) {
    let dp=Array(T+1).fill(Infinity)
    //dp[j] means : The minimum number of items to achieve sum=J
    dp[0]=0// base case, the min number of coins to reach sum=0, is 0 coins
    for (let j = 1; j <= T; ++j) {
        for (let i = 0; i < A.length; ++i) {
            if (j-A[i]>=0) {
                dp[j] = Math.min(
                    dp[j],              //either the min number of coins to achieve it
                    dp[j - A[i]] + 1    //or the min number of coins to reach A[j-A[i]] +1 (the other item A[i])
                    );
            }
        }
    }
    console.log(dp)
    return dp[T]===Infinity?-1:dp[T]
};



console.log(coinChange(
    //[3,7,405,436],8839
    [2],3//-1
    //[1,2,5],11

))  