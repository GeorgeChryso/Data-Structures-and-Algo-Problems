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



// Let's expand this to an aribrary k now
let solve=(n,k)=>{
    let Derangements=n=>{
        let dp=[...Array(n+1)].map(d=>0)
        dp[2]=1
        for (let i = 3; i <=n; i++)
            dp[i]= (i-1)*(dp[i-1]+dp[i-2])    
        return dp
    }
    let combinations=(n,k)=>{
        var dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>0))
        //basecases
        for (let i = 0; i <=n; i++) 
            dp[i][0]=1,dp[i][i]=1 
        
        for (let i = 1; i <=n; i++) 
            for (let k = 1; k <i; k++) 
                dp[i][k]=dp[i-1][k-1]+dp[i-1][k]      
                
        return dp
     }

     //precompute
     let derangements=Derangements(k),
         combination=combinations(n,k)
    
     let ans=1
     for (let i = 2; i <= k; i++) 
        // the number of derangements of i elements times the number of ways we can pick those i elements out of all the n elements
        ans+=derangements[i]*combination[n][i]
    return ans  
}