process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    (function(){
        let [n,m]=readline().split(' ').map(d=>BigInt(Number(d)))
        let A=[]
        for (let i = 0; i < n; i++)
            A.push(readline().split(' ').map(d=>BigInt(Number(d))) )
        
        let r=solve(A,n,m)
        console.log(r+'')
    })()
});


let solvee=(A,n,m)=>{
    var combinations=(n,k)=>{
        var dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>0))
        //basecases
        for (let i = 0; i <=n; i++) 
            dp[i][0]=1,dp[i][i]=1 
        
        for (let i = 1; i <=n; i++) 
            for (let k = 1; k <i; k++) 
                dp[i][k]=dp[i-1][k-1]+dp[i-1][k]      
                      
        return dp
     }
     let z=Math.max(Number(n),Number(m)),comb=combinations(z,z), result=0n
     for(i=0;i<n;i++){
         let ones=0n
         for (let j = 0; j <m; j++) 
            ones+=A[i][j]             
         let zeroes=m-ones
        for (let k = 2; k <= ones; k++) 
            result+=BigInt(comb[ones][k])      
        for (let k = 2; k <= zeroes; k++)
            result+=BigInt(comb[zeroes][k])             
     }
     for(j=0;j<m;j++){
       let ones=0n
       for (let i = 0; i <n; i++) 
           ones+=A[i][j]             
       let zeroes=n-ones
       for (let k = 2; k <= ones; k++) 
         result+=BigInt(comb[ones][k])      
       for (let k = 2; k <= zeroes; k++) 
         result+=BigInt(comb[zeroes][k])             
    }
     return result+n*m
}

let solve=(A,n,m)=>{
     let  result=0n
     for(i=0;i<n;i++){
         let ones=0n
         for (let j = 0; j <m; j++) 
            ones+=A[i][j]             
         let zeroes=m-ones
        result+= 1n<<ones
        result-=2n 
        result+= 1n<<zeroes
     }
     for(j=0;j<m;j++){
       let ones=0n
       for (let i = 0; i <n; i++) 
           ones+=A[i][j]             
       let zeroes=n-ones
       result+= 1n<<ones   
       result+= 1n<<zeroes
       result-=2n
    }
     return result-n*m
}