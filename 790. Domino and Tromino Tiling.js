
// We have two types of tiles: a 2x1 domino shape, and an "L" tromino shape. These shapes may be rotated.

// XX  <- domino

// XX  <- "L" tromino
// X
// Given N, how many ways are there to tile a 2 x N board? Return your answer modulo 10^9 + 7.

// (In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.)

// Example:
// Input: 3
// Output: 5
// Explanation: 
// The five different ways are listed below, different letters indicates different tiles:
// XYZ XXZ XYY XXY XYY
// XYZ YYZ XZZ XYY XXY



// Dynamic programming approach state compression
// Intuition:
// Map each possible state of a column to a number
// there are only 9 total states
// some states have only specific states as previous
// create an adjacency matrix to see if the ith state can have the j-th as previous


// O(n*81)=O(n) runtime O(n*81)=O(n) space
// can turn it into O(1) space with 2 cols
//brute force states 
var numTilings = function(n) {
    if(n<=2)
        return n
    let mod =1e9+7,colways=9
    let dp=[...Array(n)].map(d=>[...Array(colways)].map(d=>0))

    
    // adj[i][j] state i can go to state j
    let adj=[
        [0,1,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,1,1],
        [0,0,0,1,0,1,0,0,0],
        [0,0,1,0,0,0,1,0,0],
        [1,0,0,0,1,0,0,1,1],
        [1,0,0,0,1,0,0,1,1],
        [1,0,0,0,1,0,0,1,1],
        [0,0,0,1,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0],  
    ]

    //basecase 1st col
    for(let mask=0;mask<9;mask++)
        if(mask==0||mask==4||mask==7||mask==8)
            dp[0][mask]=1
    
    for (let j = 1; j <n-1; j++) 
        for (let next = 0; next < 9; next++) 
            for (let prev = 0; prev < 9; prev++) 
                if(adj[prev][next])
                    dp[j][next]=(dp[j][next]+dp[j-1][prev])%mod
    //last col
    let endSet=new Set([1,4,5,6])
    for (let next = 0; next < 9; next++){
        if(!endSet.has(next))
            continue
        for (let prev = 0; prev < 9; prev++) 
            if(adj[prev][next])
                dp[n-1][next]=(dp[n-1][next]+dp[n-2][prev])%mod
    }
    
    return dp[n-1].reduce((a,c)=>(a+c)%mod)
};
console.log(numTilings(4))

// there are a total of 2^2 states for any column
var numTilings = function(n) {
    if(n<=2)
        return n
    let mod =1e9+7, prev=[...Array(1<<2)].map(d=>0)
    prev[0]=1,prev[3]=1
    for (let i = 1; i <n; i++) {
        let next=[...Array(1<<2)].map(d=>0)        
        next[0]=prev[3] %mod
        next[1]=(prev[0]+prev[2])%mod
        next[2]=(prev[0]+prev[1])%mod
        next[3]=(prev[0]+prev[1]+prev[2]+prev[3])%mod
        prev=next
    }
    return prev[3]
};

console.log(numTilings(4))
//do it top down
var numTilings = function(n) {
    if(n<=2)
        return n
    let mod =1e9+7
    let dp=new Map()
    dp.set( ''+[0,0],1)
    dp.set( ''+[0,3],1)
    let recursion=(i,state)=>{
        if(dp.has(''+[i,state]))
            return dp.get(''+[i,state])
        if(i<=0)
            return 0
        let count=0
        if(state==0)
            count+= recursion(i-1,3)
        else if(state==1)
            count+= recursion(i-1,0)+recursion(i-1,2)
        else if(state==2)
            count+= recursion(i-1,0)+recursion(i-1,1)
        else if(state==3)
            count+= recursion(i-1,3)+ recursion(i-1,2)+ recursion(i-1,1)+ recursion(i-1,0)
        dp.set(''+[i,state],count%mod)
        return count
    }

    return recursion(n-1,3)%mod
};
console.log(numTilings(4))

//turns out this is an arithmetic sequence
// from OEIS
// 1 2 5 11 24,...

//A[i]=2*A[i-1] + A[i-3]
// O(n) O(1)
// so the code can become
var numTilings = function(n) {
    if(n<=2)
        return n
    let pr3=1,pr2=1, pr1=2
    for (let i = 0; i < n-2; i++) {
        let curr=(2*pr1+pr3)%(1e9+7)
        pr3=pr2
        pr2=pr1
        pr1=curr
    }
    return pr1
};