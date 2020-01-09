// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// Example 1:

// Input: coins = [1, 2, 5], amount = 11
// Output: 3 
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1

//You may assume that you have an infinite number of each kind of coin.



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

 //slow bfs Passes
//BFS solution , where the depth of the tree equals the amount of coins used
var coinChange=(A,T)=>{
    if(T<=0)return 0
    let ItemsCount=0
    let queue=[T]
    let memo=new Set(queue) //store all the expanded  values so I do not reprocess the same sums
    while(queue.length){
      

        let expand=queue.reduce((acc,curr)=>{

                let temparr=A.map(d=>curr-d).filter(d=>{
                    //i dont want to process already seen sums
                    if(memo.has(d))return false

                    if(d>=0){
                        memo.add(d)
                        return true
                    }
                })

                return acc.concat(temparr)
            },[]
        )       
        queue=expand
        ItemsCount++
        //solution
        if(memo.has(0))return ItemsCount
    }

    return -1
}

//cleaner bfs
var coinChange=(A,T)=>{
    let queue=new Set([0])
    let seen=new Set([0])
    let numberOfCoins=0
    let memo=[]
    while(queue.size){
     //   console.log(queue.size,memo)
        if(queue.has(T))return numberOfCoins
        memo=[]
        for (let coins of A) {
            for (let roots of queue.keys()) {
                let expanded=coins+roots
                if(!seen.has(expanded)&&(expanded<=T)){
                    seen.add(expanded)
                    memo.push(expanded)
                }
            }
        }
        queue.clear()
        memo.forEach(d=>queue.add(d))
        numberOfCoins++
    }
    return -1
}


//memo dp 
//Runtime O(n*T) space O(T)
// inner loop variant
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
// outer loop 
var coinChange=(A,T)=>{
    let dp=Array(T+1).fill(Infinity) //dp[i] the minimum items needed to reach sum i
    dp[0]=0// 
    for (const coin of A) {
        for (let i = coin; i <=T; i++) {
               dp[i]=Math.min(dp[i],dp[i-coin]+1)         
        }
    }
    return dp[T]==Infinity?-1:dp[T]
}

// How is this from classic knapsack? I can use the same item infinite times


//recursive solution tle  (cos of no memo)
var coinChange=(A,T)=>{
 let dp=Array(T+1).fill(Infinity)
 dp[0]=0

 let rec=(sum)=>{
    if(sum<0)return Infinity
    if(dp[sum]!==Infinity)return dp[sum]
    //same as above
    dp[sum]=Math.min(dp[sum],
        A.reduce((acc,weight)=>Math.min(acc,rec(sum-weight)+1),Infinity))
    return dp[sum]
 }

 return rec(T)!=Infinity?dp[T]:-1
}

//recursive solution
var coinChange = function(coins, amount) {
     if(amount <= 0) return 0; /* test for amount edge cases */
     var minCoins = Infinity; /* this is what we will return eventually */
     coins = coins.sort((a,b) => b - a); /* sort coins decending */
     
     function combo(amount, ind, count){
         if(ind >= coins.length) return; 
         /* do not continue if ind is past the possible range */
         for(var i = Math.floor(amount/ coins[ind]); i >= 0; i--){
             var newCount = count + i;
             var rem = amount - coins[ind] * i;
             if(rem > 0 && newCount < minCoins) {
                 /* if the remainder is greater than 0 we haven't found the perfect combo 
                 yet so we need to continue trying other coins */
                 combo(rem, ind + 1, newCount);
             } else if(newCount < minCoins){
                 /* if the remainder is 0 and the newCount is less than the current 
                 minCoins count then we set the minCoins to newCount */
                 minCoins = newCount;
             } else if(newCount >= minCoins - 1){
                 /* if the newCount is greater than minCoins then we don't need to 
                 continue with this combination */
                 break;
             }
         }
     }
     combo(amount, 0, 0);
     return minCoins == Infinity ? -1 : minCoins;
 };


//  recursive with memo 
var coinChange=(A,T,hashTableCalls={})=>{
    if(T==0)return 0
    if(hashTableCalls[T]!==undefined)return hashTableCalls[T] //hashTableCalls[T] means that the least amount of coins i can get to reach a sum of T
    let n=Infinity
    for (const coins of A) {
        let curr=0
        if(T-coins>=0){
            let next=coinChange(A,T-coins,hashTableCalls)
            if(next>=0)curr=1+next
        }
        if(curr>0){
            n=Math.min(n,curr)
        }
    }
    let finalCount= (n==Infinity)?-1:n
    hashTableCalls[T]=finalCount
    return finalCount
}


console.log(coinChange(
   // [3,7,405,436],8839
    [2],3//-1
   //[1,2,5],11
 // [1],0
 //[336,288,378,16,319,146],9212 //TLE
 //[317,127,99,56,137,300],3871 //TLE
))  