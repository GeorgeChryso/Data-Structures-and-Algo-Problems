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
        let [n,k,office]=readline().split(' ').map(d=>Number(d))
        let P=readline().split(' ').map(d=>Number(d)),Keys=readline().split(' ').map(d=>Number(d))
        let result=solve(P,Keys,k,office) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});

// Main observation: 
// After sorting both ppl and keys
// Matching should happen accordingly, aka No person A behind someone B should pick a key K1 such that K1>K2
// so if P1<P2 then K1<K2
// TLE O(n^3)
let solvee= (P,Keys,k,office)=>{
    // can be reduced to bipartite matching => O(N^3) too
    // given a matrix of P.length rows and Keys.length columns
    // pick one item from each row, such that the total Min is minimized and no two selected items can be on the same column
    P.sort((a,b)=>a-b)
    Keys.sort((a,b)=>a-b)
        
    
    let n=P.length,dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>Infinity))
    /*
        dp[i][j] is the minimum total if I assign the first i-1 people optimally and the i-th picks position j
    */
//    console.log(P)
//    console.log(Keys )
    dp[0][0]=-1
    for (let i = 1; i <=n; i++) {
        let pos=P[i-1]
        
        for (let j = i-1; j <=Keys.length; j++) {
            let pk=Keys[j-1]
            for (let k = i-1; k <j; k++) {
                if(dp[i-1][k]!==Infinity)
                    dp[i][j]=Math.min(dp[i][j], Math.max(dp[i-1][k], Math.abs(pos-pk)+Math.abs(pk-office))) 
            }                
        }        
    }
   // dp.forEach(d=>console.log(d+''))
    return Math.min(...dp[n].slice(n-1))
}

//kick a dimension because dp[i-1][k is already the maximum],aka dp[i-1][j-1] is already the maximum out of the previous selection
let solve= (P,Keys,k,office)=>{
    P.sort((a,b)=>a-b)
    Keys.sort((a,b)=>a-b)
    let n=P.length,dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>Infinity))
    /*
        dp[i][j] is the minimum total if I assign the first i-1 people optimally and the i-th picks position j
    */
    dp[0]=[...Array(k+1)].map(d=>-1)
    for (let i = 1; i <=n; i++) {
        let pos=P[i-1]
        for (let j = i-1; j <=Keys.length; j++) {
            let pk=Keys[j-1]
            dp[i][j]=Math.min(dp[i][j], Math.max(dp[i-1][j-1], Math.abs(pos-pk)+Math.abs(pk-office))) 
        }        
    }
    return Math.min(...dp[n].slice(n))
}

/*
2 5 15
10 4
29 23 21 22 26
/*/