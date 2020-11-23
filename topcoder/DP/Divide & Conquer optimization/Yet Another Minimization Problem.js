


// Array of n integers,
// cost of subsegment [L,R] is the number of pairs of equal numbers  

// split it into m contiguous subsegments so that the sum of their cost is minimized






let tests=[
    [[1,1,3,3,3,2,1], 3],
    [[1 ,2 ,1, 2, 1 ,2 ,1 ,2 ,1 ,2],2],
    [[1, 2, 2 ,2 ,1 ,2 ,1 ,1 ,1 ,2 ,2 ,1 ,1],3]
],

output=[1,8,9]


// Naive dp 
let YAMP=(A,m)=>{
    let n=A.length
    let cost=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>0))
    // cost[i][j] = number of unordered pairs of equal integers inside the interval [i,j]
    // cost[i][j]=cost[i][j-1]+ #times[i,j-1] has A[j]
    for (let i = 1; i <=n; i++)
        for (let j = i,freq={}; j <=n; j++) 
            cost[i][j]=cost[i][j-1]+(freq[A[j-1]]||0),
            freq[A[j-1]]=(freq[A[j-1]]||0)+1
    // dp[i][j]= minimum cost to split my array into i groups with the last group ending at index j 
    let dp=[...Array(m+1)].map(d=>[...Array(n+1)].map(d=>Infinity))
    dp[0][0]=0
    for (let i = 1; i <=m; i++) 
        for (let j = 1; j <= n; j++) 
        //consider all starting points for the last grp
            for (let k = 0; k < j; k++) 
                dp[i][j]=Math.min(
                            dp[i][j],
                            dp[i-1][k]+cost[k+1][j]
                        )                
    return dp[m][n]
}


console.log(tests.map(([A,m])=>YAMP(A,m)))


let YAMPDC=(A,m)=>{
    let n=A.length
    let cost=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>0))
    // cost[i][j] = number of unordered pairs of equal integers inside the interval [i,j]
    // cost[i][j]=cost[i][j-1]+ #times[i,j-1] has A[j]
    for (let i = 1; i <=n; i++)
        for (let j = i,freq={}; j <=n; j++) 
            cost[i][j]=cost[i][j-1]+(freq[A[j-1]]||0),
            freq[A[j-1]]=(freq[A[j-1]]||0)+1
    // dp[i][j]= minimum cost to split my array into i groups with the last group ending at index j 
    let dp=[...Array(m+1)].map(d=>[...Array(n+1)].map(d=>Infinity))
    dp[0][0]=0
    for (let i = 1; i <=m; i++) 
        for (let j = 1; j <= n; j++) 
        //consider all starting points for the last grp
            for (let k = 0; k < j; k++) 
                dp[i][j]=Math.min(
                            dp[i][j],
                            dp[i-1][k]+cost[k+1][j]
                        )                
    let DC=(i,jleft,jright,kleft,kright)=>{
        if(jleft>jright)
            return
        let bestk=-1,mid=(jleft+jright)>>1
        for (let k = kleft; k <= Math.min(mid,kright); k++) 
            if(dp[i-1][k]+cost[k+1][mid]>=dp[i-1][mid])
                dp[i-1][mid]=  dp[i-1][k]+cost[k+1][mid],
                bestk=k          
        DC(i,jleft,mid-1,kleft,bestk)
        DC(i,mid+1,jright,bestk,kright)
    }
    for (let i = 1; i <=m; i++) 
        DC(i,0,n-1,0,n)
    return dp[m][n]
}


console.log(tests.map(([A,m])=>YAMPDC(A,m)))
