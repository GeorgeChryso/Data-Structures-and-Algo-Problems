// Given n distinct positive integers, integer k (k <= n) and a number target.

// Find k numbers where sum is target. Calculate how many solutions there are?



// knapsack with restricted picks 
const kSum = function (A, k, target) {
    let n=A.length
    let dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(q=>[...Array(target+1)].map(dd=>0)))
    //basecases
    dp[0][0][0]=1// 1 way to get sum 0 with a combination of the first 0 items , choosing 0 items
    for(let i = 0; i < n; i++) {
        dp[i][0][0] = 1; //u can reach sum 0 with 1 way up to index i 
    }


    for (let i = 1; i <=n; i++) { //up to ith item
        for (let j = 1; j <=k; j++) {  // picking j items
            for (let s = 1; s<=target; s++) { // up to s-th sum
                //we cant pick a combination of j items out of i if j>i
                if(j<=i)
                    dp[i][j][s]=dp[i-1][j][s]     
                if(s>=A[i-1])
                    dp[i][j][s]+=dp[i - 1][j - 1][s - A[i - 1]]
            }            
        }
    }

    return dp[n][k][target]
}


console.log(
    kSum(
        //[1,2,3,4],2,5
        //[1,2,3,4,5],3,6
    )
)