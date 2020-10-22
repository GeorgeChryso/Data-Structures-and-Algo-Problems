
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