let solve=(W,N,A)=>{
    let result=Infinity,freq={}
    for(let i=0;i<A.length;i++)
        freq[A[i]]=(freq[A[i]]||0)+1

    for (let end = 1; end <=N; end++) {
        let cost=0
        Object.keys(freq).forEach(k=>{
            let times=freq[k]
            cost+=times*( Math.min(Math.abs(end-k),Math.abs(N-k+end),k))
        })        
        result=Math.min(cost,result)
    }
    return result
}
console.log(solve(132,5,[1,1,1,1,4,5,5,5]))