// We have a collection of rocks, each rock has a positive integer weight.

// Each turn, we choose any two rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

// If x == y, both stones are totally destroyed;
// If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
// At the end, there is at most 1 stone left.  Return the smallest possible weight of this stone (the weight is 0 if there are no stones left.)


// spot the knapsack

// essentially This problem asks me to place my elements into two groups, 
// one with + before them and one with -. Essentially forming my final sum (result). 
// sum(P)-sum(N)=result
// total=result +sum(N)
// sum(N)=total-result

var lastStoneWeightII=A=>{
    // There is a constraint regarding the weights. 
    // There cannot be any negative weight therefore my knapsack
    // will have 0 as its lowest possible sum.
    // Update: Although there cannot be any negative weight, my final answer depends on temporary given sums. For example if  i somehow combine  my first n-1 items and they sum up to -7 and my final item is 8, it needs the information that -7 was possible.

    let total=A.reduce((a,b)=>a+b)

    // Therefore i need any possible sum that can be achieved.
    // That would be [-total,+total] 
    let dp=Array(2*total+1).fill(0)
    //dp[i] means that sum i is possible through a combination of my elements
    // dp[total+1] means that sum 0 is possible while using zero items.
    // here: total+1 refers to sum 0
    dp[total+1]=1

    for (let i = 0; i < A.length; i++) {
        dp=dp.map( (el,j)=>{
            let result=0
            //result j can only be achieved either by adding the current adding the current element
            if(j-A[i]>=0)result=  dp[j-A[i]]||result
            // or by subtracting it to get that result
            if(j+A[i]<dp.length)result= result||dp[j+A[i]]       
            return result
        })
    }


    // As i said, i m only interested in positive results. Therefore I m searching for the index of the first 1, the smallest possible sum
  

    for (let i = total+1; i < dp.length; i++) {
        if(dp[i])return i-total-1       
    }
    return 0


     // dp=dp.slice(total+1)
   // return dp.indexOf(1)==-1?0:dp.indexOf(1)
}


console.log(lastStoneWeightII(
    [2,7,4,1,8,1]
))