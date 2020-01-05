// On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed).

// Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.

//naive DFS solution, TLE
var minCostClimbingStairs = function(A) {
    var result=Infinity

    var dp=(step,sum)=>{
        if(step>=A.length){
            result=Math.min(result,sum)
            return
        }
        dp(step+1,sum+A[step])
        dp(step+2,sum+A[step])
    }
    dp(0,0)
    dp(1,0)
    return result
};


//dp memo solution

var minCostClimbingStairs = function(A) {
    var dp=Array(A.length).fill(Infinity) // Here I will save the Minimum Sum to reach the end when starting from the index i
    
    //base cases
    dp[A.length-1]=A[A.length-1]
    dp[A.length-2]=A[A.length-2] 

    for (let i = A.length-3; i>=0; i--) {
        dp[i]=Math.min(dp[i],dp[i+1],dp[i+2])+A[i]
    }
    return Math.min(dp[0],dp[1])
};

console.log(minCostClimbingStairs(
   // [10, 15, 20]
  // [0,1,1,0]
   [0,0,1,0]
))