// given an Array of N numbers return how many different numbers there are

//O(n) space and time

var difNum1=(A)=>{
    let dict={}
    A.forEach(d=>
        dict[d]=dict[d]||true)
    return Object.keys(dict).length
}


var difNum=A=>{

    let previous=A[0]
    count=1

    for (let i = 1; i < A.length; i++) {
        if(previous!=(previous&A[i]))count++
        previous=previous&A[i]        
    }
    return count
}


//P2 knapsack
// given an array w[i] of  N weights, 
// is there a subset of those weights that sum up to exactly W?

let knap=(A,W)=>{    
    let dp=Array(A.length+1).fill(null).map(d=>Array(W+1).fill(0))
    //dp[i][j] IF i can reach sum j with the first i items
    // dp[i][j]=dp[i-1][j]||dp[i-1][j-A[i]] 
    // dp[i-1][j],sum j is reachable through the first i-1 items so i just do not choose the ith
    // dp[i-1][j-A[i]] // means that whether the sum was reachable before I choose the i-th item and add it to the total reaching j
    dp[0][0]=1
    
    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            dp[i][j]=(dp[i-1][j]||(j-A[i-1]>=0?dp[i-1][j-A[i-1]]:0) )
        }
        console.log(dp[i].join(''))
    }
    return dp.some(d=>d[W])
}

//bit knap Optimization
let knap1=(A,W)=>{
    
   let previous=1<<(W)
   console.log(previous.toString(2))

   for (const weight of A) {
       previous=previous|(previous>>(weight))
       console.log(previous.toString(2))

   }
   return Boolean(previous&1)
}

//P3 triangles in a graph
// given a graph with N vertices(nodes), count triangles
let examples=[
    [1,2,3,3,4,5,3,2,1,6,7,9],
    [1,2,7,5,7,8,9,9,9,9,0,1],
    [1,2,3,5,6,7,8,9],
    [2,1,5,7,7,7,7,8,3,2,1,2]
]

console.log(
    knap(
        [2,4,7,8],14
    )
    ,knap1(
        [2,4,7,8],14

    )
)