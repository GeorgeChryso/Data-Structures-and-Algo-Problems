// You have d dice, and each die has f faces numbered 1, 2, ..., f.

// Return the number of possible ways (out of fd total ways) modulo 10^9 + 7 to roll the dice so the sum of the face up numbers equals target.

//knapsack essentially choosing extra dices to be used as toools. Note however that every dice has to be used to produce the final outcome. 
var numRollsToTarget = function(dices, faces, target) {
    let dp=Array(dices+1).fill(null).map(d=>Array(target+1).fill(0))
    // dp[i][j] means the number of ways to reach sum j by using the first i dice
    dp[0][0]=1// base case, there is one way of getting a sum of 0 using 0 dice
    
    for (let i = 1; i < dp.length; i++) {       //for the first i dice
        for (let j = 0; j < dp[0].length; j++) { // for everpossible sum
            for (let face = 1; face <=faces; face++) { // for every possible dice roll
                    if(j>=face){
                        dp[i][j]+=dp[i-1][j-face]  // The sum j can only come by adding the face value to the result of the previous row( number of dice used)
                        dp[i][j]%=(Math.pow(10,9)+7)
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