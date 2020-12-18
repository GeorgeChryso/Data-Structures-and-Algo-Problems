

/* N story barn, with K cows

    1 cow-> 1 floor out of N
    each floor >= 1 cow 
    i-th floor=> A[i] hours
    1 cow-> 1 hour
     
    so if c cows on i-th floor=> A[i]/c hours
    i must be completed before i+1
    
    How to allocate work among cows?
    1≤N≤K≤10^12 -------------------------WTF
    N≤10^5-----------------------W T F 

    Output: Minimum total time in which the barn can be completed 
    rounded to the nearest ingeger
*/



// O(n^2*K)
let cowBuilders=(n,K,A)=>{
    //n stories, K cows, A[]
    let dp=[...Array(n+1)].map(d=>[...Array(K+1)].map(d=>Infinity))
    let args=[...Array(n+1)].map(d=>[...Array(K+1)].map(d=>Infinity))
    //dp[i][j]= Min time required time to build the i-th story by allocating j cows to it  
    dp[0][0]=0
    for (let i = 0; i < n; i++) 
        for (let j = 0; j <=K; j++) 
            for (let p = 0; p <j; p++)
                if(dp[i][p]+A[i]/(j-p)<dp[i+1][j])
                    dp[i+1][j]=dp[i][p]+A[i]/(j-p),
                    args[i+1][j]=p

    //so dp[i][j] is monotone decreasing on j 
    // and monotone increasing on i 
    //dp.forEach(d=>console.log(d+''))

    //args are monotone increasing
    //args.forEach(d=>console.log(d+''))

    return Math.round(dp[n][K])
}
//try to exploit that args are incerasing, we can also use Divide and conquer optimization here i believe
// Stillthis is roughly O(N*K)= TLE
let cowBuildersAdv=(n,K,A)=>{
    //n stories, K cows, A[]
    let dp=[...Array(n+1)].map(d=>[...Array(K+1)].map(d=>Infinity))
    let args=[...Array(n+1)].map(d=>[...Array(K+1)].map(d=>undefined))
    //dp[i][j]= Min time required time to build the i-th story by allocating j cows to it 
    dp[0][0]=0 
    for(let i=0;i<=n;i++)
        args[i][0]=0
    for (let i = 1; i <=n; i++) 
        for (let j = i; j <=K; j++) 
            for (let p = args[i][j-1]||0; p <j; p++){
                if(dp[i-1][p]+A[i-1]/(j-p)<dp[i][j])
                    dp[i][j]=dp[i-1][p]+A[i-1]/(j-p),
                    args[i][j]=p
            }
                
    //so dp[i][j] is monotone decreasing on j 
    // and monotone increasing on i 
    //  dp.forEach(d=>console.log(d+''))

    // //args are monotone increasing
    // args.forEach(d=>console.log(d+''))

    return Math.round(dp[n][K])
}

// Divide and conquer optimziation O(NKlogK)
let cowBuildersDC=(n,K,A)=>{
    //n stories, K cows, A[]
    let dp=[...Array(n+1)].map(d=>[...Array(K+1)].map(d=>Infinity))
    //dp[i][j]= Min time required time to build the i-th story by allocating j cows to it 
    dp[0][0]=0               
    let DC = (i, jl, jr, kl, kr) => {
        if (jl > jr)
            return
        let mid = (jl + jr) >> 1, bestk = -1
        for (let k = Math.min(mid-1, kr); k >=kl; k--)
            if (dp[i][mid] > dp[i - 1][k] + A[i-1]/(mid-k))
                dp[i][mid] = dp[i - 1][k] +A[i-1]/(mid-k),
                bestk = k
        DC(i, jl, mid - 1, kl, bestk)
        DC(i, mid + 1, jr, bestk, kr)
    }
    for (let i = 1; i <=n; i++) 
        DC(i,1,K,0,K-1)
        
    //so dp[i][j] is monotone decreasing on j 
    // and monotone increasing on i 
    //dp.forEach(d=>console.log(d+''))
    
    return Math.round(dp[n][K])
}

// possible greedy approach, determine where to place the next cow, among all cows
// in regards to the maximum gain it produces
// if for an A[i], i assigned c cows
// then the gain for adding one more is A[i]/c - A[i]/(c+1). Maximize that and place the next cow wherever until no more cows are left. Then you have the answer

//brute force WQS
let cowBuildersGR=(n,K,A)=>{
    //n stories, K cows, A[]
    let r=Infinity
    let tot=A.reduce((a,c)=>a+c)
    for (let m = -100; m <=100; m+=.010) {
        if(m==0)
            continue
        let totalCows=0,totalTime=0
        for (let i = 0; i < A.length; i++) {
            let cows= Math.floor( (Math.sqrt(1+(4*A[i]/m))-1)/2)+1
            totalCows+=cows
            totalTime+=(A[i]/cows)
        }
        if(totalCows===K)
        //so this differs from usual WQS cos the price supposed to be paid is not ever really paid, Right? 
        // As in the totalTime doesnt take into account that any price was paid. It's just A[i]/cows
            r=Math.min(r,totalTime) 
    }
    return  Math.round(r)
}

// Binary Search WQS
let cowBuildersWQS=(n,K,A)=>{
    //n stories, K cows, A[]
    let r=Infinity,tot=A.reduce((a,c)=>a+c)

    let calc=p=>{
        let totalCows=0,totalTime=0
        for (let i = 0; i < A.length; i++) {
            let cows= Math.floor( (Math.sqrt(1+(4*A[i]/p))-1)/2)+1
            totalCows+=cows
            totalTime+=(A[i]/cows -p*cows)
        }
        return [totalCows,totalTime]
    }
    let lo=-100,hi=100
    while(lo<=hi){
        let mid=lo+((hi-lo)/2)
        if(mid===0){
            lo=lo+0.00001
            continue
        }
        let [totalCows,totalTime]=calc(mid)
        if(totalCows>=K+0.1)
            lo=mid+0.000001
        else if(totalCows > K-0.1)
            lo=mid+0.000001,
            r=totalTime+totalCows*mid
        else
            hi=mid-0.000001

    }
    
    return  Math.round(r)
}


let tests=[
    [3,3,[2,1,1]],
    [4,10,[4,1,5,6]],
    [10,20,[4,5,10,11,23,11,2,1,5,6]],
    [10,25,[4,5,10,11,23,11,2,1,5,6]],
    [7,11,[11,23,11,2,1,5,6]],
    [5,6,[1,2,1,5,6]],
    [3,3,[1,1,1]]
]

console.log(tests.map(([a,b,c])=>cowBuilders(a,b,c)))
console.log(tests.map(([a,b,c])=>cowBuildersAdv(a,b,c)))
console.log(tests.map(([a,b,c])=>cowBuildersDC(a,b,c)))
console.log(tests.map(([a,b,c])=>cowBuildersGR(a,b,c)))
console.log(tests.map(([a,b,c])=>cowBuildersWQS(a,b,c)))