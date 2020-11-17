

// Given an array A, a move consists of :
// Pick an element A[i] and get A[i] points, but
// delete from the array all elements =A[i]+1 or A[i]-1, as well as A[i]
// Maximize the score

//1 ≤ n ≤ 105

//O (n*3)
let Boredom=A=>{
   A.sort((a,b)=>a-b)
   A.unshift(-Infinity) // Sentinel
   // dp[i][j]= max value I can get if the i-th pick is item j 
   let n=A.length,result=0,dp=[...Array(n+1)].map(d=>[...Array(n)].map(d=>-Infinity))
   dp[0][0]=0
   for (let i = 1; i <n; i++) 
     for (let j = 1; j <n; j++) 
         for (let k = 0; k <j; k++) 
            if(A[j]-1!==A[k])
                dp[i][j]=Math.max(dp[i][j],dp[i-1][k]+A[j]),
                result=Math.max(dp[i][j],result)
    return result
}



let tests=[
    [1,2],
    [1,2,3],
    [1,2,1,3,2,2,2,2,3],
],
    output=[2,4,10]

console.log(tests.map(d=>Boredom(d)))

// Alternatively:
// O(n^2)
let BoredomAlt=A=>{
    // dp[i][j]= max value I can get up to j-th index
    let freq={}
    for (let i = 0; i < A.length; i++) 
        freq[A[i]]=(freq[A[i]]||0)+1        
    A=Object.keys(freq).map(d=>Number(d)) //the range
    A.sort((a,b)=>a-b)
    A.unshift(-Infinity) // Sentinel
    let n=A.length,dp=[...Array(n)].map(d=>-Infinity)
    dp[0]=0
    for (let i = 1; i <n; i++){
        dp[i]=dp[i-1] // try not picking the i-th
        for (let j = 0; j <i-1; j++) 
            dp[i]=Math.max(
                    dp[i],
                    dp[j]+A[i]*freq[A[i]] //try picking the i-th element,
                    // we can immediately pick all the same elements. 
                    )
    } 
    return dp[n-1]    
 }
 console.log(tests.map(d=>BoredomAlt(d)))


 /* monoq optimization:
    actually this doesnt even need a monoq, there's no range, it's just the previous j-1 items
 */
// O(n)
let BoredomMQ=A=>{
    // dp[i][j]= max value I can get up to j-th index
    let freq={}
    for (let i = 0; i < A.length; i++) 
        freq[A[i]]=(freq[A[i]]||0)+1        
    A=Object.keys(freq).map(d=>Number(d)) //the range
    A.sort((a,b)=>a-b)
    A.unshift(-Infinity) // Sentinel
    let n=A.length,dp=[...Array(n)].map(d=>-Infinity)
    dp[0]=0
    let prevmax=0
    for (let i = 1; i <n; i++){
        dp[i]=Math.max(
                dp[i-1],
                dp[i],
                prevmax+A[i]*freq[A[i]] //try picking the i-th element,
                // we can immediately pick all the same elements. 
                ),
        prevmax=Math.max(prevmax,dp[i-1])
    } 
    return dp[n-1]    
 }
 console.log(tests.map(d=>BoredomMQ(d)))
