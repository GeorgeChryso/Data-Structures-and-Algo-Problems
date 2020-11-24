


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