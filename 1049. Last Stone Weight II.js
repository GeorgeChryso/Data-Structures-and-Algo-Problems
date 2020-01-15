// We have a collection of rocks, each rock has a positive integer weight.

// Each turn, we choose any two rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

// If x == y, both stones are totally destroyed;
// If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
// At the end, there is at most 1 stone left.  Return the smallest possible weight of this stone (the weight is 0 if there are no stones left.)


// spot the knapsack

// essentially This problem asks me to place my elements into two groups, 
// one with + before them and one with -. Essentially forming my final sum (result). 


var lastStoneWeightII=A=>{
    // There is a constraint regarding the weights. 
    // There cannot be any negative weight therefore my knapsack
    // will have 0 as its lowest possible sum.
    let total=A.reduce((a,b)=>a+b)
    let dp=Array(total+1).fill(0)
    //dp[i] means that sum i is possible through a combination of my elements
    dp[0]=1

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < dp.length; j++) {
            if(j-A[i]>=0)dp[j]= dp[j-A[i]]||dp[j]
            if(j+A[i]<dp.length)dp[j]=dp[j]||dp[j+A[i]]            
        }        
    }
    


    return dp.indexOf(1)==-1?0:dp.indexOf(1)
}


console.log(lastStoneWeightII(
    [2,7,4,1,8,1]
))