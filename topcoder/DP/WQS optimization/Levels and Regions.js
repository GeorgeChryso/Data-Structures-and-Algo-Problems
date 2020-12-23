process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let [n,k]=readline().split(' ').map(d=>Number(d))
    let A=readline().split(' ').map(d=>Number(d))
    
    console.log(''+solve(n,k,A))
});
let Arr=(n,m,val=0)=>{
    if(n!=1)
    return [...Array(n)].map(d=>[...Array(m)].map(d=>val))
    return [...Array(m)].map(d=>val)
}
// But i dont understand Expected values yet :(
/* 
    dp[i][j]= the minimum EV of hours spent to finish the first j levels if i-th partition ends on item j 
*/
let solve=(n,K,T)=>{
    let prefix=Arr(1,n+1),dp=Arr(K+1,n+1,Infinity),
        prt=Arr(1,n+1)
    for(let i=0;i<n;i++)
        prefix[i+1]=prefix[i]+T[i],
        prt=prt[i]+1/T[i]
    dp[0][0]=0
    for (let i = 1; i <=K; i++) 
        for (let j = i; j <=n; j++) 
            for (let k = 1; k <=j; k++) 
                dp[i][j]=Math.min(dp[i][j],dp[i-1][k-1]+(prefix[j]-prefix[k-1])/T[j-1] +dp[1][j]-dp[1][k] )                
    dp.forEach(d=>console.log(d+''))
    return dp[K][n]
}



/*

    can be convex hull optimized
    and WQS optimized 
*/