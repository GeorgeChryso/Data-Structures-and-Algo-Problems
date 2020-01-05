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
// O(n) runtime, O(n) space
var minCostClimbingStairs = function(A) {
    var dp=Array(A.length).fill(Infinity) // Here I will save the Minimum Sum to reach the end when starting from the index i
    
    //base cases
    dp[A.length-1]=A[A.length-1]
    dp[A.length-2]=A[A.length-2] 

    for (let i = A.length-3; i>=0; i--) {
        dp[i]=Math.min(dp[i+1],dp[i+2])+A[i]
    }
    return Math.min(dp[0],dp[1])
};


//space optimization, 3 elements, because my formula uses just 3 consecutive elements
// O(n) runtime, O(1) space
var minCostClimbingStairs = function(A) {

    //base cases
       let last=A[A.length-1]
       let middle=A[A.length-2] 
       let previous

    for (let i = A.length-3; i>=0; i--) {
        previous=Math.min(middle,last)+A[i]
        last=middle
        middle=previous
    }
    return Math.min(previous,last)
};
// or just no extra space at all
var minCostClimbingStairs = function(A) {
    for (let i = A.length-3; i>=0; i--) {
        A[i]=Math.min(A[i+1],A[i+2])+A[i]
    }
    return Math.min(A[0],A[1])
};
console.log(minCostClimbingStairs(
   // [10, 15, 20]
  // [0,1,1,0]
   [0,0,1,0]
))