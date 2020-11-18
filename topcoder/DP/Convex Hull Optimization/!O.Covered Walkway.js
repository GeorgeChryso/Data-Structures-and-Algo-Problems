


// n sorted points in a line must be covered 
// cost of covering an interval of points: 
// c+(R-L)^2
// Find the minimum cost to cover all points



let tests=[
    [[1,23,45,67,101,124,560,789,990,1019],5000]
],
output=[30726]

/*
    dp[i]=min value to cover up to some idx
*/
let Chicago=(A,c)=>{
    let n=A.length, //A is sorted
        dp=[...Array(n)].map(d=>Infinity)
    dp[0]=c // the min  cost to tile up to the first element is the constant ,cos i m only picking this element
    for (let i = 1; i <n; i++) 
        for (let j = 0; j <i; j++) 
            dp[i]=Math.min(
                    dp[i],
                    dp[j]+c+(A[i]-A[j+1])**2, // use the interval [A[j+1],A[i]] and the best choices behind that
                    c+(A[0]-A[i])**2 //tile it from the beginning element
                  )            
    return dp[n-1]
}


console.log(tests.map(d=>Chicago(d[0],d[1])))

//Can be Optimized through convex hull + binary search somehow