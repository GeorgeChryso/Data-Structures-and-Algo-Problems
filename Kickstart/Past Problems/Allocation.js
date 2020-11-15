
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let currentline = 0;
function readline(){
    return input[currentline++];
}

let n=Number(readline())

for (let q = 1; q <=n; q++) {
    let [N,K]=readline().split(' ').map(d=>Number(d)) // N houses, K dollars budget
    let A=readline().split(' ').map(d=>Number(d)) //
    let result=0
    let dp=[...Array(N+1)].map(d=>[...Array(K+1)].map(d=>0))
    
    for (let i = 1; i <=N; i++) {
        for (let j = 1; j <=K; j++) {
            let curcost=A[i-1]
            dp[i][j]=dp[i-1][j]
            if(j>=curcost)
                dp[i][j]=Math.max(1+dp[i-1][j-curcost],dp[i][j])
        }        
    }
    result=dp[N][K]

    console.log('Case #'+q.toString()+': '+result.toString())
}
