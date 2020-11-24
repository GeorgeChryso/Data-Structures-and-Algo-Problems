


// N cells 
// N Craziness levels
// Ri is the risk level of the lunatic to escape= Ci* #Lunatics in the same guard group
// total Amount of Risk R= Sum of all Risks of my selection
// G guards to guard all the cells 
// A guard guards consectuvie cells


// Minimize R



let tests=[ 
    [6,3,[11,11,11,24,26,100]]
]

let output=[ 299]
// Naive DP O(GN^2)
let Lunatics=(N,G,C)=>{

    //computation of R[i,j]= the Risk of the group from [i,j]
    // through dp in O(N^2) for precomputation
    // R[i][j]=R[i][j-1]+ prefix[j]-prefix[i]+ (j-i)* C[j]
    // R[i][i]=C[i]
    // R[i][i+1]=C[i]+(prefix[i+1]-prefix[i])+ 2 * C[i+1] 

    // Alternatively , faster in O(1)
    // R[i][j]= (prefix[j+1]-prefix[i]) * (j-i+1)
    
    let prefix=[0],n=C.length
    for (let i = 0; i < n; i++)
        prefix.push(prefix[prefix.length-1]+C[i])
    
    let dp=[...Array(G+1)].map(d=>[...Array(n+1)].map(d=>Infinity))
    dp[0][0]=0

    //returns the risk of the group [i,j] inclusive
    // dp[i][j] is the Minimum Risk of the groups if I assign i guards and the last group ends at index j 
    let Risk=(i,j)=> (prefix[j]-prefix[i-1]) * (j-i+1)

    for (let i = 1; i <=G; i++) 
        for (let j = 0; j <=n; j++)
            for (let k = 0; k < j; k++)
                dp[i][j]=Math.min(
                            dp[i][j],
                            dp[i-1][k]+ Risk(k+1,j)
                )

    return dp[G][n]
}    



console.log(
    tests.map(([N,G,C])=>Lunatics(N,G,C))
)

// O(NKLogN)
let LunaticsDC=(N,G,C)=>{
    let prefix=[0],n=C.length
    for (let i = 0; i < n; i++)
        prefix.push(prefix[prefix.length-1]+C[i])
    
    let dp=[...Array(G+1)].map(d=>[...Array(n+1)].map(d=>Infinity))
    dp[0][0]=0

    //returns the risk of the group [i,j] inclusive
    // dp[i][j] is the Minimum Risk of the groups if I assign i guards and the last group ends at index j 
    let Risk=(i,j)=> (prefix[j]-prefix[i-1]) * (j-i+1)
    let DC = (i, jl, jr, kl, kr) => {
        if (jl > jr)
            return
        let mid = (jl + jr) >> 1, bestk = -1
        for (let k = Math.min(mid-1, kr); k >=kl; k--)
            if (dp[i][mid] > dp[i - 1][k] + Risk(k+1,mid))
                dp[i][mid] = dp[i - 1][k] + Risk(k+1,mid),
                bestk = k
        DC(i, jl, mid - 1, kl, bestk)
        DC(i, mid + 1, jr, bestk, kr)
    }
    for (let i = 1; i <=G; i++) 
        DC(i,1,n,0,n-1)

    return dp[G][n]
}    

console.log(
    tests.map(([N,G,C])=>LunaticsDC(N,G,C))
)


// Knuth optimization
// O(N^2)
let LunaticsKNUTH=(N,G,C)=>{
    let prefix=[0],n=C.length
    for (let i = 0; i < n; i++)
        prefix.push(prefix[prefix.length-1]+C[i])
    
    let dp=[...Array(G+1)].map(d=>[...Array(n+1)].map(d=>Infinity)),
        H=[...Array(G+2)].map(d=>[...Array(n+2)].map(d=>Infinity))
    dp[0][0]=0
    let Risk=(i,j)=> (prefix[j]-prefix[i-1]) * (j-i+1)


    for (let l = 1; l <=n; l++) 
        for (let i = 1; i <=G; i++) {
            let j=l+i-1
            for (let k =Math.min(Math.max(j-G,0),H[i][j-1]); k <= Math.min(j-1,H[i+1][j]); k++) 
                if(dp[i-1][k]+Risk(k+1,j)< dp[i][j])
                    dp[i][j]=dp[i-1][k]+Risk(k+1,j),
                    H[i][j]=k
        }        
    
    return dp[G][n];
}    

console.log(
    tests.map(([N,G,C])=>LunaticsKNUTH(N,G,C))
)

