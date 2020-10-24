// // In how many ways can you tile a 3×n rectangle with 2×1 dominoes?

// // Here is a sample tiling of a 3×12 rectangle.
// Input consists of several test cases followed by a line containing -1. Each test case is a line containing an integer 0≤n≤30. For each test case, output one integer number giving the number of possible tilings


tests=[2,3,8,12]
output=[3,0,153,2131]
//there are only 12 states for each column. DRAW THEM and the adjacency matrix for each
// some cannot be previous to some
var Dominos=n=>{

    //create the adjacency matrix
    // adj[prev][next]=1 if prev can be previous to next, 0 otherwise
    let adj=[...Array(12)].map(d=>[...Array(12)].map(d=>0))
    let z=[[1,4,11],[0,2,3],[7,8],[9],[10],[7,8],[11],[0,2,3],[5],[0,2,3],[4,1],[6]]
    for (let i = 0; i <12; i++) 
        while(z[i].length)
            adj[i][ar.shift()]=1
    
    let dp=[...Array(n)].map(d=>[...Array(12)].map(d=>0))
    //first column can be only states 0,2,3         
    let firstcolumn=new Set([0,2,3]),lastcolumn=new Set([1,7,9])

    for (let i = 0; i < n; i++) 
        for (let cur = 0; cur < 12; cur++) 
            for (let prev = 0; prev < 12; prev++) 
                if(i==0&&!firstcolumn.has(cur)) //basecases (1st col)
                    continue
                else if(i==n-1&&!lastcolumn.has(cur)) //lastcol
                    continue
                else if (i==0) //1st col
                    dp[i][cur]=1
                else if(adj[prev][cur])
                    dp[i][cur]=dp[i][cur]+dp[i-1][prev]
    console.log(dp[1])
    return dp[n-1].reduce((a,c)=>a+c)
}

tests.forEach(d=>console.log(Dominos(d)))

// tiling problems
//https://projecteuler.net/problem=189
//7255 - Land of Farms
// dp tiling
//http://fileadmin.cs.lth.se/contest/nwerc/Problemset_NWERC2004.pdf
// poj 2411
// poj 1038
// sgu 131
// sgu 132
// sgu 223
// sgu 225
// zoj 1346
// poj 3254
// poj 1185
// poj 3311
// hdu 3001
// poj 2288
// zoj 4257
// hdu 3681
// poj 2430
// poj 2436
// poj 2541
// poj 2836
// poj 1699
// poj 2288
// poj 2688
// poj 3411
// poj 2686
// poj 1482
// poj 2690
// poj 3719
// poj 1795
// poj 1739
// poj 3593
// poj 2088