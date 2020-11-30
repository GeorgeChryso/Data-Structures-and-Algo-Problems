process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    (function(){
        let [n,m,T]=readline().split(' ').map(d=>Number(d))
        let edges=[]
        for (let i = 0; i < m; i++)
            edges.push(readline().split(' ').map(d=>Number(d)))
        
        solve(n,m,T,edges)
    })()
});

// Try fixing the time T and the vertices
var solve =(n,m,T,edges)=>{
    let adj={}
    for( let [f,t,cost] of edges){
        if(adj[f-1]===undefined)
            adj[f-1]=[]
        adj[f-1].push([t-1,cost])
    }
    let dp=[...Array(n+1)].map(d=>[...Array(T+1)].map(d=>-Infinity))
    //dp[i][t]= Maxmimum Places Visited while currently on node i and spent exactly t time

    dp[0][0]=1
    // forward dp
    for(let i=1;i<n;i++){
        for(let t=0;t<=T;t++)
            for(let [next,time] of adj[i])
                if(t+time<=T)
                    dp[i+1][next][t+time]=Math.max(
                                            dp[i+1][next][t+time],
                                            dp[i][i][t]+1
                                         )
    }
}



// Try fixing the current vertex and the length so far to reduce the complexity
// O(n*3)
var solve=(n,m,T,edges)=>{
    let adj={}
    for( let [f,t,cost] of edges){
        if(adj[f-1]===undefined)
            adj[f-1]=[]
        adj[f-1].push([t-1,cost])
    }
        
    let dp=[...Array(n+1)].map(d=>Infinity)
        prev=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>Infinity)) //reconstruction
    //dp[i][t]= Maxmimum Places Visited while currently on node i and spent exactly t time
    let result=0
    dp[0]=0
    // forward dp
    for(let len=1;len<n;len++){
        let dp2=[...Array(n+1)].map(d=>Infinity)
        for (let curnode = 0; curnode < n; curnode++) 
            if(adj[curnode])
                for(let [next,time] of adj[curnode])
                    if(dp[curnode]+time<dp2[next]){
                        dp2[next]=dp[curnode]+time,
                        prev[next][len+1]=curnode
                        if(next==n-1&&dp2[next]<=T)
                            result=len+1
                    }
        dp=dp2
    }

    console.log(result+'')
    let last=result, res=[n-1]
    while(last>1)
        res.unshift(prev[res[0]][last]),
        last--
    console.log(res.map(d=>d+1).join(' '))

}