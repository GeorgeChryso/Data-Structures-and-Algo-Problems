



// choose X numbers, such that at every one of them belongs to a k-length window,consecutively,  and the sum of these x items is maximized


// O(N K X)
let Vova =(A,K,x)=>{
    let n=A.length
    let dp=[...Array(x+1)].map(d=>[...Array(n+1)].map(d=>-Infinity))
    //dp[i][j] Max val if the i-th chosen item is A[j]
    dp[0][0]=0
    for (let i = 1; i <=x; i++) 
        for (let j = 1; j <=n; j++) 
            for (let k = 1; k <= K; k++)
                if(j-k>=0)
                    dp[i][j]=Math.max(
                                dp[i][j],
                                dp[i-1][j-k]+A[j-1] //at least k items have to connect my current and previous choices
                            )
    //dp.forEach(d=>console.log(d+''))
    
    //the result lies in the last K items of dp[x], aka my last valid choice, my last interval of length k 
    if(Math.max(...(dp[x].slice(n+1-K)))==-Infinity)
        return -1
    return Math.max(...(dp[x].slice(n+1-K)))
}

let tests=[
    // A, k, x
    [[5,1,3,10,1],2,3],
    [[10 ,30 ,30 ,70 ,10 ,10],1,5],
    [[1,100,1,1],3,1]
],
output=[18,-1,100]

console.log(tests.map(([a,b,c])=>Vova(a,b,c)))


/* 
    monoq optimization: 
    Searching for a maximum over a fixed interval
    dp[j]=Math.max(dp[j-k]) + A[j]= Max(g(k)) +f(j) ,  L(j)=j-K<=k<j 
    L(j) is increasing

    Essentially my problem reducesto the variation of Basic Problem of Monoq, where I'm searching for maximum values in every interval
*/
// O(N*X), cos all the items go inside the q only once
let VovaMQ =(A,K,x)=>{
    let n=A.length
    let dp=[...Array(x+1)].map(d=>[...Array(n+1)].map(d=>-Infinity))
    //dp[i][j] Max val if the i-th chosen item is A[j]
    dp[0][0]=0
    let g=(i,index)=>dp[i-1][index] 
    let Q=[0] //will hold indices of max items in regards to dp[i-1] of the current window of length k

   // Q[0] will hold the MAXIMUM(dp[i-1][z]), such that zE[j-k,j)
   // essentially the maximized dp[i-1][z] in my window of length k 
    for (let i = 1; i <=x; i++,Q=[i-1]) 
        for (let j = i; j <=n; j++){
            //pop all front elements out of place
            while(Q.length&&Q[0]<j-K)
                Q.shift()

            dp[i][j]=g(i,Q[0])+A[j-1] //translates to Max(..dp[i-1][z])+A[j-1], zε[j-k,j)
            // I want to insert the current element 
            // which will pop all inferior elements on the back that it meets
            while(Q.length&& g(i,Q[Q.length-1])<=g(i,j))
                Q.pop()
            Q.push(i)
        }

    //the result lies in the last K items of dp[x], aka my last valid choice, my last interval of length k 
    if(Math.max(...(dp[x].slice(n+1-K)))==-Infinity)
        return -1
    return Math.max(...(dp[x].slice(n+1-K)))
}

console.log(tests.map(([a,b,c])=>VovaMQ(a,b,c)))
