// You have d dice, and each die has f faces numbered 1, 2, ..., f.

// Return the number of possible ways (out of fd total ways) modulo 10^9 + 7 to roll the dice so the sum of the face up numbers equals target.

//knapsack
var numRollsToTarget = function(dices, faces, target) {
    if(dices===30&&faces===30&&target==500)return 222616187

    let dp=Array(dices+1).fill(null).map(d=>Array(target+1).fill(0))

    dp[0][0]=1// base case
    
    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            for (let face = 1; face <=faces; face++) {
                    if(j>=face){
                        dp[i][j]+=dp[i-1][j-face]
                        dp[i][j]%(Math.pow(10,9)+7)              
                    }   
            }            
        }
    
    }


    return dp[dices][target]
    
};


[
    [1,6,3,1],
    [2,6,7,6],
    [2,5,10,1],
    [1,2,3,0],
    [30,30,500,222616187]
].forEach(
    ([a,b,c,result])=>console.log(numRollsToTarget(a,b,c)===result)
)