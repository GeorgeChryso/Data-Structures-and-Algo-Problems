process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    (function(){
        let [n,m]=readline().split(' ').map(d=>Number(d))
        let A=[]
        for (let i = 0; i < n; i++)
            A.push(readline().split(' ').map(d=>Number(d)))
        
        let r=solve(A,n,m)
        console.log(r+'')
    })()
});

let solvee=(A,n,m)=>{
    if(n==1){
        let r=Infinity
        for(let i=0;i<m-1;i++)
            r=Math.min(r,Math.abs(A[0][i]-A[0][i+1]))
        return r
    }

    let Bitcount=(x,count=0)=>x>0?Bitcount(x>>1,count+(x&1)):count
    //dp[mask][lastrow]= minimum kappa value when mask elements are chosen, mask =011101 0 for available, 1 for used
    let dp=[...Array(1<<n)].map(d=>[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity)))
    // kappaVals[i][ii] is the kappa value if ii-th row was before i-th  
    let kappaVals=[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity))
    for(let i=0;i<n;i++)
        for (let ii = 0;ii <n; ii++) 
            for (let j = 0,min=Infinity;i!==ii&& j < m; j++) 
                min=Math.min(min,Math.abs(A[i][j]-A[ii][j])),
                kappaVals[i][ii]=min,
                dp[(1<<i)|(1<<ii)][i][ii]=kappaVals[i][ii] //<=basecase for dp

    //therefore I want to find dp[1<<n (-1)][row] for each row
    //for each mask for len length
    //forward dp
    for(let len=2;len<n;len++)                 // these 3 lines can be optimized with snoob
        for (let mask = 0; mask < (1<<n); mask++) //
            if(Bitcount(mask)==len)             //
            for (let first = 0; first < n; first++) //
                if(mask&(1<<first))
                    for (let prev = 0; prev <n; prev++) 
                        if(mask&(1<<prev)&&prev!==first)
                            for (let next = 0; next < n; next++) 
                                if((mask&(1<<next))==0)
                                    dp[mask|(1<<next)][next][first]= Math.max(
                                        dp[mask|(1<<next)][next][first]===Infinity?-1:dp[mask|(1<<next)][next][first],
                                        Math.min(
                                            dp[mask][prev][first],
                                            kappaVals[next][prev]
                                        )
                                    )
    let result=0
    for (let first = 0; first < n; first++) {
        for (let last = 0; last < n; last++) {
            for (let j = 0;first!==last &&j <m-1; j++) 
                dp[(1<<n)-1][last][first]=Math.min(dp[(1<<n)-1][last][first],Math.abs(A[last][j]-A[first][j+1]))  
            if(dp[(1<<n)-1][last][first]!==Infinity)       
                result=Math.max(result,dp[(1<<n)-1][last][first])    
        }     
    }
    return result
}

let solve=(A,n,m)=>{
    if(n==1){
        let r=Infinity
        for(let i=0;i<m-1;i++)
            r=Math.min(r,Math.abs(A[0][i]-A[0][i+1]))
        return r
    }
    let snoob=x=>{
        // right most set bit 
        let rightOne = x & -x; 
        
        // reset the pattern and set next higher bit 
        // left part of x will be here 
        let nextHigherOneBit = x + rightOne; 
    
        // nextHigherOneBit is now part [D] of the above explanation. 
    
        // isolate the pattern 
        let rightOnesPattern = x ^ nextHigherOneBit; 
    
        // right adjust pattern 
        rightOnesPattern = (rightOnesPattern)/rightOne; 
    
        // correction factor 
        rightOnesPattern >>= 2; 
    
        // rightOnesPattern is now part [A] of the above explanation. 
    
        // integrate new pattern (Add [D] and [A]) 
        let next = nextHigherOneBit | rightOnesPattern; 
        return next
    }
    //dp[mask][lastrow]= minimum kappa value when mask elements are chosen, mask =011101 0 for available, 1 for used
    let dp=[...Array(1<<n)].map(d=>[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity)))
    // kappaVals[i][ii] is the kappa value if ii-th row was before i-th  
    let kappaVals=[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity)),result=0,
        extra=[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity)) // extra[last][first] //the extra k if the last column was last and first was the first column
    for(let i=0;i<n;i++)
        for (let ii = 0;ii <n; ii++) {
            for (let j = 0,min=Infinity;i!==ii&& j < m; j++){
                min=Math.min(min,Math.abs(A[i][j]-A[ii][j])),
                kappaVals[i][ii]=min,
                dp[(1<<i)|(1<<ii)][i][ii]=kappaVals[i][ii] //<=basecase for dp
                if(j<m-1)
                    extra[i][ii]=Math.min(extra[i][ii],Math.abs(A[i][j]-A[ii][j+1]))
            }
            if(dp[(1<<i)|(1<<ii)][i][ii]!==Infinity&&n==2)
                result=Math.max(result,Math.min(dp[(1<<i)|(1<<ii)][i][ii],extra[i][ii]))
        }
                
    //therefore I want to find dp[1<<n (-1)][row] for each row
    //for each mask for len length
    //forward dp
    for(let len=2;len<n;len++)               
        for (let mask = (1<<len)-1; mask < (1<<n); mask=snoob(mask))
            for (let first = 0; first < n; first++)
                if(mask&(1<<first))
                    for (let prev = 0; prev <n; prev++) 
                        if(mask&(1<<prev)&&prev!==first)
                            for (let next = 0; next < n; next++) 
                                if((mask&(1<<next))==0){
                                    dp[mask|(1<<next)][next][first]= Math.max(
                                        dp[mask|(1<<next)][next][first]===Infinity?-1:dp[mask|(1<<next)][next][first],
                                        Math.min(
                                            dp[mask][prev][first],
                                            kappaVals[next][prev]
                                        )
                                    )
                                    if((mask|(1<<next))==(1<<n)-1 && dp[mask|(1<<next)][next][first]!==Infinity )
                                        result=Math.max(result,Math.min(dp[mask|(1<<next)][next][first],extra[next][first]))
                                }
    return result
}