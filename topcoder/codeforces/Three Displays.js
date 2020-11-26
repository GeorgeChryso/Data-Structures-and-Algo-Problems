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
        let n=Number(readline())
        let S=readline().split(' ').map(d=>Number(d))
        let Costs=readline().split(' ').map(d=>Number(d))
        let result=solve(n,S,Costs) //solves a simple test case
        console.log(result.toString())
    }
    main();    
});


//let's expand it to m displays,
// can be of course optimized to two lines => O(n) space
// O(m*)
let solve=(n,S,Costs)=>{
    //dp[i][j] the minimum total cost of buying i displays and the last one is at index j
    let m=3
    let dp=[...Array(m+1)].map(d=>[...Array(n+1)].map(d=>Infinity))
    dp[0][0]=0
    S.unshift(-Infinity)
    for (let i = 1; i <=m; i++) 
        for (let j = i; j <=n; j++) 
            for (let k = i-1; k <j ;k++) {
                let size=S[j],cost=Costs[j-1]
                if(S[k]<size)
                    dp[i][j]=Math.min(
                                dp[i][j],
                                dp[i-1][k]+ cost
                            )                
            }
    return Math.min(...dp[m])===Infinity?-1: Math.min(...dp[m])
}