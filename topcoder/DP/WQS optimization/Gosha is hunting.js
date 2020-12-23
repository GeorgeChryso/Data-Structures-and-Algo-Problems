process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let [n,a,b]=readline().split(' ').map(d=>Number(d))
    let P=readline().split(' ').map(d=>Number(d))
    let U=readline().split(' ').map(d=>Number(d))
    console.log(''+solveWQSWQS(n,a,b,P,U))
});
/*
dpi,j,k  represents the maximum expected number of Pokemons you can catch considering Pokemons from 1 to i using at most j Poke Balls and at most k Ultra Balls

            ⎧   dp i−1,j,k                      spend nothing
dpi,j,k=max     dpi−1,j−1,k   +pi               spend a pokeball
            ⎨   dpi−1,j,k−1   +qi               spend an ultraball
            ⎩   dpi−1,j−1,k−1 +pi + qi −piqi    spend one Poke Ball and one Ultra Ball on Pokemon i
*/
//O (n^3) time and space can be space optimized using 2 row approach
let solveNaive=(n,a,b,P,U)=>{
    let dp=[...Array(n+1)].map(d=>[...Array(a+1)].map(d=>[...Array(b+1)].map(d=>-Infinity)))
    dp[0].fill([...Array(b+1)].fill(0))
    for(let i=1;i<=n;i++)
        for(let j=0;j<=a;j++)
            for(let k=0;k<=b;k++)
                dp[i][j][k]=Math.max(
                                dp[i][j][k],
                                dp[i-1][j][k],
                                j>=1?dp[i-1][j-1][k]+P[i-1]*1000000:-Infinity,
                                k>=1?dp[i-1][j][k-1]+U[i-1]*1000000:-Infinity,
                                j>=1&&k>=1?dp[i-1][j-1][k-1]+ (P[i-1]*1000000+U[i-1]*1000000- (P[i-1])*(U[i-1])*1000000):-Infinity
                            )
    return dp[n][a][b]/1000000
}

//2ddp optimzation
let solve=(n,a,b,P,U)=>{
    let A=[...Array(a+1)].map(d=>[...Array(b+1)].map(d=>0))
    let B=[...Array(a+1)].map(d=>[...Array(b+1)].map(d=>0))

    for(let i=1;i<=n;i++){
        if(i%2)
            [dp1,dp0]=[A,B]
        else
            [dp0,dp1]=[A,B]
        for(let j=0;j<=a;j++){
            dp1[j][0]=0
            for(let k=0;k<=b;k++){
                if(k+1<=b)dp1[j][k+1]=0
                dp1[j][k]=Math.max(
                                dp1[j][k],
                                dp0[j][k],
                                j>=1?dp0[j-1][k]+P[i-1]*1000000:-Infinity,
                                k>=1?dp0[j][k-1]+U[i-1]*1000000:-Infinity,
                                j>=1&&k>=1?dp0[j-1][k-1]+ (P[i-1]*1000000+U[i-1]*1000000- (P[i-1])*(U[i-1])*1000000):-Infinity
                            )
                        }
        }
    }
    
    if(n%2==0)
        return  B[a][b]/1000000
    return A[a][b]/1000000
}

/*
    wqs the last dimension, aka teh amount of ultra balls used, while fixing the amount of pokeballs 

    f(x)=dp[N][a][x]= the max expected value of pokemon i can get for the first N pokemon, while using a Pokeballs and x Ultraballs

        f(x)-f(x-1)>= f(x+1)-f(x) 

    so i binary search on an expected value loss ( aka the cost i have to pay for using an ultraball)
    and I keep using utlraballs as long as  the expected value gain outweighs the EV cost 

    If I have an arbitrary number of ultra balls, I can keep using some only as long as it fits me, yet i have to keep track of how much I ve used
*/

let solveWQS1=(n,a,b,P,U)=>{
    let lo=0,hi=1,result=-Infinity

    let calc=cost=>{
        let dp=[...Array(n+1)].map(d=>[...Array(a+1)].map(d=>0)),
            ultrasUsed=[...Array(n+1)].map(d=>[...Array(a+1)].map(d=>0))
        for(let i=1;i<=n;i++)
            for(let j=0;j<=a;j++){
                //use nothing
                if(dp[i][j]<dp[i-1][j]) 
                    dp[i][j]=dp[i-1][j],
                    ultrasUsed[i][j]=ultrasUsed[i-1][j]
                //use just a poke
                let v0=j>=1?dp[i-1][j-1]+P[i-1]:-Infinity 
                if(dp[i][j]<v0)
                    dp[i][j]=v0,
                    ultrasUsed[i][j]=ultrasUsed[i-1][j-1]
                //use just an ultra 
                let v1=dp[i-1][j]+U[i-1]- cost 
                if(dp[i][j]<v1)
                    dp[i][j]=v1,
                    ultrasUsed[i][j]=ultrasUsed[i-1][j]+1
                //use an ultra and a poke 
                let v2=(j>=1)?dp[i-1][j-1]+ P[i-1]+U[i-1]- (P[i-1])*(U[i-1])-cost:-Infinity 
                if(dp[i][j]<v2){
                    dp[i][j]=v2,
                    ultrasUsed[i][j]=ultrasUsed[i-1][j-1]+1
                   
                }
                   
            }
        return [ultrasUsed[n][a],dp[n][a]]
    }
    while(lo+0.000000001<=hi){ //wqs on the cost of using an ultraball
        let mid= (hi+lo)/2,
            [ultrasUsed,maxEV]=calc(mid)
        if(ultrasUsed<b)
            hi=mid
        else if(ultrasUsed===b)
            result=Math.max(result,maxEV+ultrasUsed*mid),
            lo=mid
        else 
            lo=mid
    }
    return result
}

/*
     apparently 
        f(x,y)=dp[N][x][y] is convex, so i can wqs on the pokeball count too 

*/
let solveWQSWQS=(n,a,b,P,U)=>{

    let calc=(p,u)=>{
        let dp=[...Array(n+1)].map(d=>0),
            ultrasUsed=[...Array(n+1)].map(d=>0),
            pokesUsed=[...Array(n+1)].map(d=>0)
        for(let i=1;i<=n;i++){
            //use nothing
            if(dp[i]<=dp[i-1]) 
                dp[i]=dp[i-1],
                pokesUsed[i]=pokesUsed[i-1],
                ultrasUsed[i]=ultrasUsed[i-1]

            //use a poke
            let v1=dp[i-1]+P[i-1]-p
            if(dp[i]<=v1) 
                dp[i]=v1,
                pokesUsed[i]=pokesUsed[i-1]+1,
                ultrasUsed[i]=ultrasUsed[i-1]

            //use an ultra
            let v2=dp[i-1]+U[i-1]-u
            if(dp[i]<=v2) 
                dp[i]=v2,
                pokesUsed[i]=pokesUsed[i-1],
                ultrasUsed[i]=ultrasUsed[i-1]+1

            //use both
            let v3=dp[i-1]+P[i-1]+U[i-1]- (P[i-1])*(U[i-1]) -p-u
            if(dp[i]<=v3) 
                dp[i]=v3,
                pokesUsed[i]=pokesUsed[i-1]+1,
                ultrasUsed[i]=ultrasUsed[i-1]+1

        }
        return [pokesUsed[n],ultrasUsed[n],dp[n]]
    }
    let l = 0, r = 1, ans=0;
    while(r - l > 1e-15) {
        let mid = (l + r) / 2;
        let l2 = 0, r2 = 1;
        while(r2 - l2 > 1e-15) {
            let mid2 = (l2 + r2) / 2;
            [p,u,val] = calc(mid, mid2);
            if(u>= b) 
                l2 = mid2;
            else 
                r2 = mid2;
        }
        [p,u,val] = calc(mid, l2);
        if(p >= a) 
            l = mid, 
            ans = val + mid * a + l2 * b;
        else 
            r = mid;
    }
    return ans
}