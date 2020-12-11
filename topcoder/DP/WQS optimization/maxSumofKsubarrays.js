

/*
    Given an array [a1,a2, ⋯ ,an] where ai≥ 0 for all i. Divide it into any number of parts you want (parts must contain consecutive elements). Lets say it h part has sum Si. Minimize ln(Si*Si+C). ,C is a constant integer
*/



/*
    You re given an array A of integers of length N and an Integer K<= N
    Select at MOST K disjoint subarrays, such that the sum of the elements included in the subarrays
    is Maximized
    If all the integers are positive, we just pick the whole array
*/
//O(nKn) standard dp , can be optimized through monoq to nK, see below WQS
let maxSum=(A,K)=>{

    /*
        dp[i][j] is the maximum sum I can get if I pick i groups from the firt j elements,
        and, the last group ends at index j
    */
    let n=A.length,
        dp=[...Array(K+1)].map(d=>[...Array(n+1)].map(d=>0)),
        prefixSum=[...Array(n+1)].map(d=>0)
    for (let i = 1; i <=n; i++)
        prefixSum[i]=prefixSum[i-1]+A[i-1]
    dp[0][0]=0
    
    for (let i = 1; i <=K; i++) 
        for (let j = i-1; j <=n; j++) 
            for (let h = 0; h < j; h++)
                dp[i][j]=Math.max(
                            dp[i][j-1],
                            dp[i][j],
                            dp[i-1][h]+ prefixSum[j]-prefixSum[h]
                            ) 

    //dp.forEach(d=>console.log(d+''))

    return dp[K][n]
}   
// //DC O(n^2 logn),
// // So I believe DC cant really be applied here, because dp[i][j] depends on dp[i][j-1] to be calculated, and DC calculated based on dp[i-1][k]
// let maxSumDC=(A,K)=>{

//     /*
//         dp[i][j] is the maximum sum I can get if I pick i groups from the firt j elements,
//         and, the last group ends at index j
//     */
//     let n=A.length,
//         dp=[...Array(K+1)].map(d=>[...Array(n+1)].map(d=>0)),
//         prefixSum=[...Array(n+1)].map(d=>0)
//     for (let i = 1; i <=n; i++)
//         prefixSum[i]=prefixSum[i-1]+A[i-1]
//     let DC = (i, jl, jr, kl, kr) => {
//         if (jl > jr)
//             return
//         let mid = (jl + jr) >> 1, bestk = -1
//         for (let k = Math.min(mid-1, kr); k >=Math.max(0,kl); k--)
//             if (dp[i][mid] <dp[i-1][k]+ prefixSum[mid]-prefixSum[k])
//                 dp[i][mid] = dp[i-1][k]+ prefixSum[mid]-prefixSum[k],
//                 bestk = k
//         if(mid<n&&dp[i][mid]>dp[i][mid+1])
//             dp[i][mid+1]=dp[i][mid]
//         if(mid<n&&dp[i][mid]<dp[i][mid+1])
//             dp[i][mid]=dp[i][mid+1]
//         if(mid>=1&&dp[i][mid]>dp[i][mid-1])
//             dp[i][mid-1]=dp[i][mid]
//         if(mid>=1&&dp[i][mid]<dp[i][mid-1])
//             dp[i][mid]=dp[i][mid-1]
//         DC(i, jl, mid - 1, kl, bestk)
//         DC(i, mid + 1, jr, bestk, kr)
//     }
//     for (let i = 1; i <=K; i++) 
//         DC(i,1,n,0,n)

//     dp.forEach(d=>console.log(d+''))
//     return Math.max(...dp[K])
// }   



//WQS Binary Search
/*
    Instead of fixing K, the number of subarrays used, we associate a cost λ  to the act of placing 1 more subarray. 
    We can keep track of dpλ[n] computed in the same way as above.
    dpλ[n] is the Maxmimum sum achieved if we consider the first n items with an incurred cost of λ for each subarray taken 
    cntλ[n]: how many subarrays are used to achieve this dpλ[n] 

*/
//O( n**2 logDif)
let maxSumWQS=(A,K)=>{
    let n=A.length
        prefixSum=[...Array(n+1)].map(d=>0)
    for (let i = 1; i <=n; i++)
        prefixSum[i]=prefixSum[i-1]+A[i-1]

    let l=0, r=A.reduce((a,c)=>a+Math.abs(c)),ans=0
    let calc=p=>{
        let dp=[...Array(n+1)].map(d=>0),
            cnt=[...Array(n+1)].map(d=>0),
            arg=[...Array(n+1)].map(d=>0)
        for (let i = 1; i <= n; i++)
            for (let j = 0; j < i; j++){
                if(dp[j]-prefixSum[j] -p+prefixSum[i]>dp[i])
                    dp[i]=dp[j]-p+prefixSum[i]-prefixSum[j],    
                    cnt[i]=cnt[j]+1,
                    arg[i]=j
                if(i>=2&&dp[i-1]>dp[i])
                    dp[i]=dp[i-1],
                    cnt[i]=cnt[i-1],
                    arg[i]=i-1
            } 
        return [dp[n],cnt[n]]
    }
    while(l <= r) {
        let mid =  (l+r)>>1
        let [val,count] = calc(mid); 
        if(count> K) 
            l = mid + 1
        else 
            r = mid - 1,
            ans = Math.max(ans,val+mid * count)
    }
    return ans
}   
// +dp optimization monoq
// O(nlog( MaxDiff) )

let maxSumWQS2=(A,K)=>{

  
    let n=A.length
        prefixSum=[...Array(n+1)].map(d=>0)
    for (let i = 1; i <=n; i++)
        prefixSum[i]=prefixSum[i-1]+A[i-1]

    let l=0, r=A.reduce((a,c)=>a+Math.abs(c)),ans=0
    r=1e9+7
    // works in O(n) with monoq optimization
    let calc=p=>{
        let dp=[...Array(n+1)].map(d=>0),
            cnt=[...Array(n+1)].map(d=>0)
        let Q=[ [-prefixSum[0],0] ]
        for (let i = 1; i <= n; i++){
            //[ dp[j]-prefixSum[j+1],cnt] pairs in my monoq
            dp[i]=Q[0][0]+prefixSum[i]-p
            cnt[i]=Q[0][1]+1
            if(dp[i-1]>dp[i])
                dp[i]=dp[i-1],
                cnt[i]=cnt[i-1]
            while(Q.length&&Q[Q.length-1][0]<=dp[i]-prefixSum[i])
                    Q.pop() 
            if(Q.length&&dp[i]-prefixSum===Q[0][0]&&cnt[i]>Q[0][1]) //always choose the bigger cnt cos that maximizes my overall answer
                    Q[0][1]=cnt[i]

            Q.push( [dp[i]-prefixSum[i],cnt[i]] ) 
        } 

        return [dp[n],cnt[n]]
    }
    while(l <= r) {
        let mid =  (l+r)>>1
        let [val,count] = calc(mid); 
        if(count> K) 
            l = mid + 1
        else 
            r = mid - 1,
            ans = Math.max(ans,val+mid * count)
    }
    return ans
}   
let tests=[

    [ [-1,2,-4,-5,-12,-4,+5,-1,1,2],3],
    [ [-1,2,-4,-5,-12,-4,+5,-1,1,2],2],
    [ [-1,2,-4,-5,-12,224,10,+5,-1,1,2],2],
    [ [-1,2,-4,-5,-12,-4,5,-1,1,-12,-4,5,-2],2],
    [ [-1,211,-444,-51,-12,224,10,+5,-1,1,2],2],
    [ [-1,2,-4,-5,-1,1,2],2],
    [ [-1,2,-4,-5,-1,1,2],3],
    [ [-1,2,-4,-5,-1,1,2],1],
    [[444,-51,-12,224,10],3],
    [[444,-51,-12,224,10],1],
    [ [1,211,-444,-51,-12,22,12,55,-200,10],5]
]


console.log(tests.map(([a,b])=>maxSum(a,b)))
//console.log(tests.map(([a,b])=>maxSumDC(a,b)))
console.log(tests.map(([a,b])=>maxSumWQS(a,b)))
console.log(tests.map(([a,b])=>maxSumWQS2(a,b)))