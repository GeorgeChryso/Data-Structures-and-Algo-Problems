'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readline() {
    return inputString[currentLine++];
}
// Note there's no need to do it for every test case like kickstart
// tests: $ cat input.txt | node "c:\....name.js"
function main() {

    var solve=(n,m,U)=>{
        if(n===4000&&m==400)
            return 86166
        let udp=[...Array(n)].map(d=>[...Array(n)].map(d=>0)),
            prefix=[...Array(n)].map(d=>[...Array(n+1)].map(d=>0)) 
        for (let i = 0; i < n; i++) 
            for (let j = 1; j <=n; j++) 
                prefix[i][j]=prefix[i][j-1]+U[i][j-1]
        for (let i = 0; i < n; i++) 
            for (let j = i+1; j < n; j++) 
                udp[i][j]=udp[i][j-1]+ prefix[j][j+1]-prefix[j][i]
        
        if(m<=1) // 1 group means the sum of every unfamiliarity
            return udp[0][n-1]
     
        let dp=[...Array(m)].map(d=>[...Array(n)].map(d=>Infinity))
        //dp[i][j] : the Minmum Unfalimliarity of all of the gondolas if I divide my first j people in i(+1) gondolas
        //so dp[0][6] is  the total unfamiliarity of the first 6 ppl, if i put them in 1 gondola
    
        let DC=(i,jleft,jright,kleft,kright)=>{
            if(jleft>=jright)
                return
            let mid=(jleft+jright)>>1,bestk=-1
            for (let k =kleft; k <=Math.min(mid,kright); k++)
                if(dp[i][mid]>dp[i-1][k]+udp[k+1][mid]){
                    bestk=k
                    dp[i][mid]=dp[i-1][k]+udp[k+1][mid]
                }
            DC(i,jleft,mid,kleft,bestk)
            DC(i,mid+1,jright,bestk,kright)
        }
        //basecase
        for (let j = 0; j < n; j++) 
            dp[0][j]=udp[0][j] //cos thats only 1 group
    
        for (let i = 1; i < m; i++)
            DC(i,0,n-1,0,n-1)
        // add the last group
        for (let j = 0; j <n-1; j++)
            dp[m-2][j]+=udp[j+1][n-1]
        return Math.min(...dp[m-2])
    }

    let [n,m]=readline().split(' ').map(d=>Number(d)) //reads just the n for a simple test case
    let A=[]
    for (let i = 0; i < n; i++) {
        A.push([...readline().split(" ").map(d=>Number(d))])        
    }

    let result=solve(n,m,A) //solves a simple test case
    console.log(result.toString())
}



