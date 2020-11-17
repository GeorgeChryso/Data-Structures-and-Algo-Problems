


/*
            n positions
            _ _ _ _ _ _ _  ...  _
            1                   n
            
            At m of those positions, fireworks are gonna be launched
            A[0],A[1],...,A[m] are the positions of the launches
            B[0],B[1],...,B[m] are some values for each firework launch
            T[0],T[1],...,T[m] are the times of each launch

            When I'm watching a launch from a position x, I gain
            B[i]-| x-A[i] | satisfaction

            But each second, I can move D units

            Find the maximum satisfaction I can achieve after watching all the launches
*/


//O(M*N^2)
let Launches=(A,B,T,n,m,D)=>{

    /*
        dp[i][j]=Max attainable value if i watch the i-th launch from position j 
                =Max(dp[i-1][k] ) + cost(j), kε[j-d*Δτ,j+d*Δτ] 

        Δτ=T[i]-T[i-1], because I can move Δτ*d units in the meantime of the i-1th and the i-th launch
        So I can end up at j, either by moving left for Δτ*d units, or right for Δτ*d units
        cost(j)=B[i]-|j-A[i]|
    */

    let dp=[...Array(m+1)].map(d=>[...Array(n+1)].map(d=>-Infinity))
    
    //basecase
    dp[0]=[...Array(n+1)].map(d=>0)
    T.unshift(0) // to satisfy the free selection of the position at the first launch
    for (let i = 1; i <=m; i++) 
        for (let j = 1; j<=n; j++) {
            let deltaT=T[i]-T[i-1] //aka this interval, on the first time it has to be +Infinity
            // so on i=1, I can pick anything as the starting interval
            for (let k = Math.max(1,j-deltaT*D); k <=Math.min(n,j+deltaT*D); k++) 
                dp[i][j]=Math.max(
                            dp[i][j],
                            dp[i-1][k]+ B[i-1]-Math.abs(j-A[i-1]) 
                        )                
                        
        }        
    return Math.max(...dp[m])
}

let tests=[
    [[49,26,6],[1,1,1],[1,4,10],50,3,1],
    [[1,9],[1000,1000],[4,4],10,2,1]
],
output=[-31,1992]



console.log(tests.map(([AA,BB,TT,n,m,d])=>Launches(AA,BB,TT,n,m,d)))


/*
    Monotonic queue optimization:
    Turns out that I still want to calculate the maximum of the interval 
    kε[j-d*Δτ,j+d*Δτ]  for each dp[i][j]

    Q[0] will be holding the index where dp[i-1][k] maximizes for kε[j-d*Δτ,j+d*Δτ],
    aka my current window
    
*/

let LaunchesMQ=(A,B,T,n,m,D)=>{
    let dp=[...Array(m+1)].map(d=>[...Array(n+1)].map(d=>-Infinity))
    //basecase
    dp[0]=[...Array(n+1)].map(d=>0)
    // to satisfy the free selection of the position at the first launch
    T.unshift(0)
    for (let i = 1; i <=m; i++){
        let Q=[],deltaT=T[i]-T[i-1],k=1
        for (let j = 1; j<=n; j++) {
            // I preplace all the elements of teh current window in it
            // k is the index that handles the window 
            while(k<=n&&Math.abs(k-j)<=deltaT*D){
                while(Q.length&& dp[i-1][Q[Q.length-1]] <= dp[i-1][j+deltaT*D])
                    Q.pop()
                Q.push(j+deltaT*D)
                k++
            }
            while(Q.length&&Q[0]<j-deltaT*D)
                Q.shift()
            
            dp[i][j]=dp[i-1][ Q[0] ]+ B[i-1]-Math.abs(j-A[i-1])
        }   
    } 
    return Math.max(...dp[m])
}
tests=[
    [[49,26,6],[1,1,1],[1,4,10],50,3,1],
    [[1,9],[1000,1000],[4,4],10,2,1]
],
console.log(tests.map(([A,B,T,n,m,d])=>LaunchesMQ(A,B,T,n,m,d)))
