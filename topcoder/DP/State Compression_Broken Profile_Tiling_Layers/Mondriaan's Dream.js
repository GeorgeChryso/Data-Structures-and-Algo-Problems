
// Squares and rectangles fascinated the famous Dutch painter Piet Mondriaan. One night, after producing the drawings in his 'toilet series' (where he had to use his toilet paper to draw on, for all of his paper was filled with squares and rectangles), he dreamt of filling a large rectangle with small rectangles of width 2 and height 1 in varying ways.


// Expert as he was in this material, he saw at a glance that he'll need a computer to calculate the number of ways to fill the large rectangle whose dimensions were integer values, as well. Help him, so that his dream won't turn into a nightmare!


// TLDR, M*N board , M,N<=11, return number of ways to tile the rectangle with 2x1 boards

//forward dp tiling
var DominoEs=(n,m)=>{
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>0)) 

    dp[0][0]=1 
    let isOccupied=(i,mask)=> mask&(1<<i)

    let search=(i,p,q,k)=>{
        if(i==n) // q is next of p 
            return dp[k+1][q]+=dp[k][p]
        if(isOccupied(i,p)) //try changing next on col k
            return search(i+1,p,q,k) 
        if(i<n-1&&!isOccupied(i+1,p)) // Vertical
            search(i+2,p,q,k) 
        if(k<m-1&&!isOccupied(i,q)) // Horizontal
            search(i+1,p,q^(1<<i),k);
    }
    
    for (let k = 0; k <m; k++) 
        for (let p = 0; p < (1<<n); p++) 
            search(0,p,0,k)  

    return dp[m][0]
}


let tests=[
    [1,2],
    [1,3],
    [1,4],
    [2,2],
    [2,3],
    [2,4],
    [2,11],
    [4,11],
]

let output=[1,0,1,2,3,5,144,51205]

console.log(tests.map(([n,m])=>DominoEs(n,m)))