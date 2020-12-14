





let findmin=(string,l)=>{
    let n=string.length,flag=0,mid=1,N=1<<21
    s=string.split('').map(d=> Number(d.charCodeAt(0)>96)) 
    let dp=[...Array(n+1)].map(d=>[Infinity,Infinity])
    dp[0]=[0,0]
    for (let i = 0; i <n; i++) {
        let [mincost,minops]=dp[i+1]
        let [mcurr,ocurr]=dp[i]
        if(mincost>mcurr+s[i])
            dp[i+1]=[mcurr+s[i],minops]
        if(dp[Math.min(n,i+l)][0]>mcurr+mid && dp[Math.min(n,i+l)][0]>ocurr+1)
            dp[Math.min(n,i+l)]=[mcurr+mid,ocurr+1]
        console.log(dp+'')
    }
    console.log(s+'\n')
    let mx1=dp[n][1]
    s=s.map(d=>(d^1))
    dp=[...Array(n+1)].map(d=>[Infinity,Infinity])
    dp[0]=[0,0]
    for (let i = 0; i <n; i++) {
        let [mincost,minops]=dp[i+1]
        let [mcurr,ocurr]=dp[i]
        if(mincost>mcurr+s[i])
            dp[i+1]=[mcurr+s[i],minops]
        if(dp[Math.min(n,i+l)][0]>mcurr+mid && dp[Math.min(n,i+l)][0]>ocurr+1)
            dp[Math.min(n,i+l)]=[mcurr+mid,ocurr+1]
        console.log(dp+'')
    }
    let mx2=dp[n][1]
    return Math.min(mx1,mx2)
}

console.log(findmin(
    `PikMike`,4
))