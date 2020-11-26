process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    function main() {
        let [n,k]=readline().split(' ').map(d=>Number(d))
        let result=solve(n,k) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});

// O(n^2k)
let solvee=(n,k)=>{
    let mod=1e9+7

    /*
        dp[i][j]= the number of good sequences of length <=i that end at number j 
                =dp[i-1][j]+Σdp[i-1][k], when j%k==0
    */
    let dp=[...Array(k+1)].map(d=>[...Array(n+1)].map(d=>0))
    dp[1].fill(1) // only 1 way to build length 1 arrays, themselves
    dp[1][0]=0
    for (let i = 2; i <=k; i++) 
        for (let j = 0; j <=n; j++) 
            for (let k = 1; k <=j; k++)
                if((j%k)===0)
                    dp[i][j]= (dp[i][j]+dp[i-1][k])%mod     

    return dp[k].reduce((a,c)=>(a+c)%mod,0)
}

// Forward dp
// O(knlogn)
// Because we re not spending time iterating over every POTENTIAL divisor, but instead 
// immediately visiting hte multiples
let solve=(n,k)=>{
    let mod=1e9+7
    /*
        dp[i][j]= the number of good sequences of length <=i that end at number j 
                =dp[i-1][j]+Σdp[i-1][k], when j%k==0
    */
    let dp=[...Array(k+1)].map(d=>[...Array(n+1)].map(d=>0))
    dp[1].fill(1) // only 1 way to build length 1 arrays, themselves
    dp[1][0]=0
    for (let i = 1; i <k; i++) 
        for (let j = 1; j <=n; j++) 
            for (let k = j; k <=n; k+=j) // <== Iterate over all of j's multiples instead
            // instead of blidnly trying every potential divisior
                dp[i+1][k]=(dp[i+1][k]+dp[i][j])%mod
                    
    return dp[k].reduce((a,c)=>(a+c)%mod,0)
}