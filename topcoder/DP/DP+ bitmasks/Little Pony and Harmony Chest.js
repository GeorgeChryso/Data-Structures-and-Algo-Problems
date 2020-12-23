process.stdin.resume();process.stdin.setEncoding('utf-8');
let inp = '',cur = 0,readline=_=>inp[cur++]
process.stdin.on('data', inputStdin =>inp += inputStdin);
process.stdin.on('end', _ => {inp = inp.trim().split('\n').map(dqd =>dqd.trim());
    let n=Number(readline())
    let A=readline().split(' ').map(d=>Number(d))
    console.log(''+solve(n,A))
});
let Arr=(n,m,val=0)=>(n!=1)?[...Array(n)].map(d=>[...Array(m)].map(d=>val)): [...Array(m)].map(d=>val)

let gcd=(a,b)=>{
    while(b){
        a=a%b
        let temp=a
        a=b
        b=temp
    }
    return a
}
//O(n*2^60)
let solvee=(n,A)=>{
    let coprime=Arr(32,32,0),result=Infinity,recons=''
    for (let i = 1; i <=31; i++) 
        for (let j = 1; j <=31; j++)
            coprime[i][j]=Number(gcd(i,j)==1)

    for (let mask = 0; mask < (1<<Math.max(...A)); mask++) {
        let available=[]
        console.log(mask.toString(2))
        for(let i=0;i<=31;i++)
            if(mask&(1<<i))
                available.push(i+1)
        if(available.some((d,i)=>available.some((q,j)=>i!==j&&coprime[d][q]!==1)))
            continue
        
        let val=0, string=[...Array(n)]
        for (let i = 0; i < n; i++) {
            let r=Infinity
            for (let j = 0; j <available.length; j++)
                if(Math.abs(A[i]-available[j])<r)
                    r=Math.abs(A[i]-available[j]),
                    string[i]=available[j]
            val+=r
        }
        if(val<result)
            result=val,
            recons=string.join(' ')
    }
    console.log(result)
    return recons
}

// Observations: Bi <= 60, because if B[i]>60 I can replace it with 1 and get a smaller Abs[A[i]-B[i]]
// dp[mask][i] the min value i can achieve by using the prime factors from the mask for the first i items
// O(n*60*2^17)
let solve=(n,A)=>{

    let primes=[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59], 
        primeFactorsMasks=[...Array(61)].map(d=>0)  //holds the masks of the prime factors of my numbers <60
    for (let i = 1; i <=60; i++) 
        for (let j = 0; j < primes.length; j++)
            primeFactorsMasks[i]|=( Number(i%primes[j]===0)<<j)
        
    let dp=Arr(n+1,1<<primes.length,Infinity),result=Infinity,
        prev=Arr(n+1,1<<primes.length,Infinity),resmask
        valUsed=Arr(n+1,1<<primes.length,Infinity)
    dp[0][0]=0
    //forward dp
    for (let i = 0; i <n; i++) 
        for (let mask = 0; mask < (1<<primes.length); mask++) 
            for (let b = 1; b <=60; b++){ 
                if(mask&primeFactorsMasks[b])
                    continue
                if(dp[i+1][mask|primeFactorsMasks[b]] > dp[i][mask]+ Math.abs(b-A[i]))
                    dp[i+1][mask|primeFactorsMasks[b]] = dp[i][mask]+ Math.abs(b-A[i]),
                    valUsed[i+1][mask|primeFactorsMasks[b]]=b,
                    prev[i+1][mask|primeFactorsMasks[b]]=mask
                if(i==n-1&&result>dp[i+1][mask|primeFactorsMasks[b]]) //relax result
                    result=dp[i+1][mask|primeFactorsMasks[b]],
                    resmask=mask|primeFactorsMasks[b]
            }
    let reconstruction=[],curmask=resmask
    for (let i = n; i >=1; i--) 
        reconstruction.unshift(valUsed[i][curmask]),
        curmask=prev[i][curmask]
    return reconstruction.join(' ')
}