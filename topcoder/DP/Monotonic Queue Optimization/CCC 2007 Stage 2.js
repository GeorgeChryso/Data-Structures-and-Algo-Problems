
// You have N (N<=10000) bowling pins and K (K<=500) bowling balls, each ball has width w (w<=100)
// • Each pin has a score s[i] from -10000 to 10000
// • You are allowed to miss
// • Maximum achievable score = ?


// For example, one possible sequence of pins was:

// 2 8 5 1 9 6 9 3 2

// If Alice was given two balls, each able to knock over three adjacent pins, the maximum score Alice could achieve would be 39, the sum of two throws: 2+8+5 = 15, and 9+6+9 = 24.

// dp[i][j]: max. value if we use i balls to hit pins 1...j
// • dp[i][j] = max(dp[i][j-1], dp[i-1][j-W]+ sum(s[j-W+1]...s[j])  ) //roughly
let Bowling=(A,k,w)=>{
    let n=A.length
    let prefix=[0]
    for (let i = 0; i < n; i++) 
        prefix.push(prefix[prefix.length-1]+A[i])

    let dp=[...Array(k+1)].map(d=>[...Array(n)].map(d=>0))
    //basecase dp[0][k]=0, if we use 0 balls we get nothing
    //basecases for a ball not used completely, aka <w 
    for (let i = 0; i < w; i++)
        for (let j = 1; j <=k; j++)
            dp[j][i]=prefix[i+1]

    for (let i = 1; i <= k; i++) 
        for (let j = w; j < n; j++) 
            dp[i][j]=Math.max(dp[i][j],dp[i][j-1],dp[i-1][j-w]+ prefix[j+1]-prefix[j+1-w] ) //hit the last w items

    dp.forEach(d=>console.log(d+''))
    return dp[k][n-1]
}

console.log(Bowling(
   // [2 ,8 ,5 ,1 ,9 ,6 ,9 ,3 ,2], 2, 3 //39
   // [2 ,18 ,5 ,1 ,9 ,6 ,9 ,3 ,2], 2, 2 // 38
  // [2 ,8 ,5 ,1 ,9 ,6 ,69 ,3 ,2], 1, 1 //69
    [1,1,1,1,1], 5, 2 // 5
))


//      ==================   Bowling for Numbers ++ ==================  \\
// Negative Numbers are now allowed
/*  
        Example:  K = 4, w = 3
        2 8 -5 3 5 8 4 8 -6
        X X -5 3 5 8 4 8 -6 (ball 1, score = 10)
        _ _ -5 X X X 4 8 -6 (ball 2, score = 26)
        _ _ -5 _ _ X X X -6 (ball 3, score = 38)
        _ _ -5 _ _ _ _ _ -6 (ball 4, score = 38)
        • Answer = 38

        So, not using a ball is possible, and throwing over empty cells is also possible
*/
