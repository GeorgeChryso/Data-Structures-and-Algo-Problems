process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let [n,K,l]=readline().split(' ').map(d=>Number(d))
    let s=readline()
    let r=solve(n,K,l,s)
    console.log(r+'')
});

// At most K operations (contiguous segment case swap, of fixed length l)
// min( min(lower,upper) )
// essentially find the min lower case, min upper case I can get after at most K operations
// classic naive dp TLE MLE whateverLE
let solve1=(n,K,l,s)=>{

    s=s.split('').map(d=> Number(d.charCodeAt(0)<97)) //0:lowercase 1:uppercase

    let windowUp=[0] //the total uppercase on the window of length l that ends on index i 
    for (let i = 0; i < n; i++)
        if(i<l)
            windowUp[0]+= s[i]
        else
            windowUp.push(windowUp[windowUp.length-1]+ s[i]- s[i-l])
    for (let i = 0; i < l-1; i++) 
        windowUp.unshift(Infinity)        
    
    // console.log(windowUp,s)
    //dp[i][j] the maximum Uppercase I can end up with after i moves till idx j ,if i performed the last operation on index j
    let dp=[...Array(K+1)].map(d=>[...Array(n+1)].map(d=>0))

    for (let i = 1; i <=K; i++) 
        for (let j = 1; j <=n; j++) 
            dp[i][j]=Math.max(
                dp[i][j],
                dp[i][j-1],
                j<l?-Infinity:(dp[i-1][j-l] +l-windowUp[j-1])
            )          

    let maxTotalUp= dp[K][n]+s.reduce((a,c)=>a+c),
    minLowerCase= n-maxTotalUp
    s=s.map(d=>d^1)
    windowUp=[0]
    for (let i = 0; i < n; i++)
        if(i<l)
            windowUp[0]+= s[i]
        else
            windowUp.push(windowUp[windowUp.length-1]+ s[i]- s[i-l])
    for (let i = 0; i < l-1; i++) 
        windowUp.unshift(Infinity)    
    //dp[i][j] the maximum Lowercas I can end up with after i moves till idx j ,if i performed the last operation on index j
    dp=[...Array(K+1)].map(d=>[...Array(n+1)].map(d=>0))
    for (let i = 1; i <=K; i++) 
        for (let j = 1; j <=n; j++) 
            dp[i][j]=Math.max(
                dp[i][j],
                dp[i][j-1],
                j<l?-Infinity:(dp[i-1][j-l] +l-windowUp[j-1])
            )          
    
    let maxTotalLower=dp[K][n]+s.reduce((a,c)=>a+c)
    minUpperCase=n-maxTotalLower

    return Math.min(minUpperCase,minLowerCase)
}

// W Q S 
let solve11=(n,K,l,s)=>{
    s=s.split('').map(d=> Number(d.charCodeAt(0)>96)) 
    let f=flag=>{
        N=1<<21
        let dp=[...Array(N)].map(d=>0)
        let lo=0,hi=N,result
        while(lo<hi){
            mid= lo +(( hi-lo)>>1)
            for(i=n-1;~i;i--){
                dp[i]=dp[i+1]+(s[i]^flag);
                if((dp[i+l]+mid)%N<dp[i]%N)
                    dp[i]=dp[i+l]+mid+N;
            }
            if(dp[0]/N>K)
                lo=mid+1;
            else
                hi=mid,
                result=dp[0]%N-mid*K;
        }
        return result;
    }
    return Math.min(f(0),f(1))
}

// MY W Q S 
let solve=(n,K,l,s)=>{
    s=s.split('').map(d=> Number(d.charCodeAt(0)>96)) 
    let f=flag=>{
        N=1<<21
        let lo=0,hi=N,result
        while(lo<hi){
            mid= (lo+hi)>>1
            let dp=[...Array(n+1)].map(d=>0)
            for (let i = 1; i <=n; i++) {
                dp[i]=dp[i-1]+(s[i-1]^flag)
                if( ((dp[i-l-1]+mid)%N) < (dp[i] %N))
                    dp[i]=(dp[i-l]+mid)%N
            }
            if(dp[n]/N>K)
                lo=mid+1;
            else
                hi=mid,
                result=dp[n]%N-mid*K;
        }
        return result;
    }
    return Math.min(f(0),f(1))
}