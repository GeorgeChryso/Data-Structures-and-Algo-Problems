
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
            //             not hit the last w items, hit the last w items
            dp[i][j]=Math.max(dp[i][j-1] ,dp[i-1][j-w]+ prefix[j+1]-prefix[j+1-w] ) 
    return dp[k][n-1]
}// can be optimized to 1D with a 2 row optimization

let tests=[
    [[2 ,8 ,5 ,1 ,9 ,6 ,9 ,3 ,2], 2, 3],
    [[2 ,18 ,5 ,1 ,9 ,6 ,9 ,3 ,2], 2, 2],
    [[2 ,8 ,5 ,1 ,9 ,6 ,69 ,3 ,2], 1, 1],
    [[1,1,1,1,1], 5, 2]
]
let output=[39,38,69,5]
console.log(tests.map(([a,b,c])=>Bowling(a,b,c)))

//      ==================   Bowling for Numbers ++ ==================  \\
//                     V    R   I   A   T   I   O   N
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


// O( k*n^2)
//• Let dp[i][j] be the maximum achievable score with i hits
// ++++++++++ 
// and the rightmost hit pin being j <--additional constraint
let BowlingPP=(A,k,w)=>{
    let n=A.length
    let prefix=[0]
    for (let i = 0; i < n; i++) 
        prefix.push(prefix[prefix.length-1]+A[i])

    let dp=[...Array(k+1)].map(d=>[...Array(n)].map(d=>0))
    //basecase dp[0][k]=0, if we use 0 balls we get nothing

    for (let i = 0; i < w; i++)
        for (let j = 1; j <=k; j++)
            dp[j][i]=prefix[i+1]

    for (let i = 1; i <= k; i++) 
        for (let j = w; j < n; j++) 
            for (let k = 0; k <j; k++) 
                if(k>=j-w) //overlapping with previous throw ( so i m not getting all of the previous items, as some of the m were taken on  previous throws )
                    dp[i][j]=Math.max(
                        dp[i-1][k]+prefix[j+1]-prefix[k+1],
                        dp[i][j] 
                    ) 
                else // not overlapping (so i take the full score of my w previous items)
                    dp[i][j]=Math.max(
                        dp[i][j],
                        dp[i-1][k]+prefix[j+1]-prefix[j+1-w] //take the last w (throw the ball and hit the last w) but pick something else as the previous ball , pick dp[i-1][k] as the last used  ball 
                    )
    //dp.forEach(d=>console.log(d+''))
    return Math.max(...dp[k])
}// can be optimized to 1D with a 2 row optimization
// There is also an optimization to O(n*k*w), where you keep track of the max(dp[i-1][k]),k<j-w
// So you dont have to search in the interval 0<k<j, but  j-w<=k<j instead

tests=[
    [[2 ,8 ,-5 ,3 ,5 ,8 ,4 ,8, -6], 4, 3],
    [[2 ,18 ,5 ,1 ,9 ,6 ,9 ,3 ,2], 2, 2],
    [[2 ,8 ,5 ,1 ,9 ,6 ,69 ,3 ,2], 1, 1],
    [[1,1,1,1,1], 5, 2]
]
output=[38,38,69,5]
console.log(tests.map(([a,b,c])=>BowlingPP(a,b,c)))



// M O N O T O N E      Q U E U E       O   P   T   I   M   I   Z   A   T   I   O   N
//                             O(N*K*W)  => TO O(N*K)
/*
    Criteria met: 
        *  dp[j] = max(f(j) + g(k)), L(j)=j-w <=k<j //after the 1row optimization
                    f(j)=prefix[j+1], 
                    g(k)=dp[i-1][k]-prefix[k+1]
        *  L(j)=j-w is increasing


    Course of action: 
        Mintain a Queue of indices, such that
        * Q[j]<Q[j+1] //remember, these are indices
        * g(Q[j])>=g(Q[j+1]) // aka dp[i-1][Q[0]]= Max (... dp[i-1][z]), zε[j-w,j)
        essentially Q[0] holds the index inside my window, where dp[i-1][z] is maximized

    Then:
        dp[j]=f(j)+g(Q[0]), because g(Q[0])=Max( dp[i-1][p]-prefix[p+1]),holds the max value j-w<p<j

*/

 // I N C O M P L E T E 
let BowlingPPMQ=(A,k,w)=>{
    let n=A.length, prefix=[0]
    for (let i = 0; i < n; i++) 
        prefix.push(prefix[prefix.length-1]+A[i])

    let dp=[...Array(k+1)].map(d=>[...Array(n+1)].map(d=>-Infinity))
    //basecase dp[0][k]=0, if we use 0 balls we get nothing
    dp[0][0]=0
    
    let Q=[0]
    let g=(i,index)=>dp[i-1][index]-prefix[index]
    //  [[2 ,8 ,-5 ,3 ,5 ,8 ,4 ,8, -6], 4, 3],
    for (let i = 1; i <= k; i++,Q=[i-1]) 
        for (let j = 0,maxprev=-Infinity; j <= n; j++){
            while (Q.length && Q[0] <j-w )
                Q.shift()

            dp[i][j]=prefix[j] + g(i,Q[0]) //take the max inside the window
            
            if(j>=w) // or take the max before the window + claim full value of the current window
                dp[i][j]=Math.max(maxprev+prefix[j]-prefix[j-w],dp[i][j]),
                maxprev=Math.max(maxprev,dp[i-1][j-w])
    
            while ( Q.length && g(i,Q[Q.length-1]) <= g(i,j))
                Q.pop()
            Q.push(j)
        }

    dp.forEach(d=>console.log(d+''))
    return Math.max(...dp[k])
}

console.log(tests.map(([a,b,c],i)=>BowlingPPMQ(a,b,c)))
