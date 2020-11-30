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

// Here I had 2 options for my dp, fix the length of the path so far, or fix the time. The time had a way bigger constraint, so it would obviously TLE, so instead of creating a dp[i][time]=Maximum length to get to i while spent time time, i Instead create an alternative dp[i][len] which stores the minimum time.
// The result will obviously be the biggest len l
// such that dp[n-1][l]<=T


// Try fixing the current vertex and the length so far to reduce the complexity
// O(n*3)
var solvee=(n,m,T,edges)=>{
    let adj={}
    for( let [f,t,cost] of edges){
        if(adj[f-1]===undefined)
            adj[f-1]=[]
        adj[f-1].push([t-1,cost])
    }
        
    let dp=[...Array(n+1)].map(d=>Infinity) //1 row optimziation to pass the test cases 
        prev=[...Array(n+1)].map(d=>[...Array(n+1)].map(d=>Infinity)) //reconstruction
    //dp[i][l]=  Minimum time spent to get to vertex i while the path length was l
    let result=0
    dp[0]=0
    // forward dp
    for(let len=1;len<n;len++){ //for every length
        let dp2=[...Array(n+1)].map(d=>Infinity)
        for (let curnode = 0; curnode < n; curnode++)  // for every node
            if(adj[curnode])
                for(let [next,time] of adj[curnode]) //for every next node
                    if(dp[curnode]+time<dp2[next]){ //update next's time 
                        dp2[next]=dp[curnode]+time,
                        prev[next][len+1]=curnode // and save a pointer for the best solution
                        if(next==n-1&&dp2[next]<=T) 
                            result=len+1 
                    }
        dp=dp2
    }

    console.log(result+'')
    // path reconstruction
    let last=result, res=[n-1]
    while(last>1)
        res.unshift(prev[res[0]][last]),
        last--
    console.log(res.map(d=>d+1).join(' '))

}

//there's also a topological sorting solution
var solve=(n,m,T,edges)=>{
    let adj={},next={}
    for( let [f,t,cost] of edges){
        if(adj[f-1]===undefined)
            adj[f-1]=[]
        adj[f-1].push([t-1,cost])
        if(next[f-1]===undefined)
            next[f-1]=new Set()
        next[f-1].add(t-1)
    }
    let topoOrder=[],visited=new Set()
    let dfs=(node)=>{
        if(node===undefined||visited.has(node))
            return
        visited.add(node)
        if(next[node]&&next[node].size)
            next[node].forEach(d=>dfs(d))
        topoOrder.unshift(node)
    }
    for(let i=0;i<n;i++)
        dfs(i)
    let dp=[...Array(n)].map(d=>[-Infinity,Infinity,-2]) //1 row optimziation to pass the test cases 

    console.log(topoOrder)
    dp[0]=[1,0,-1]
    for(let curnode of topoOrder){
        let [maxLength,minTime,prevcur]=dp[curnode]
        if(adj[curnode])
            for(let [next,time] of adj[curnode]){
                let [maxLengthNext,minTimeNext,prev] =dp[next]
                if(maxLength+1>=maxLengthNext&&minTime+time<=T)
                //if(minTime+time<=T)
                    dp[next]=[maxLength+1,minTime+time,curnode]
            }
        console.log(dp)
    }
    console.log(adj[5],n-1)

    console.log(dp[n-1][0]+'')
    // path reconstruction
    let last=n-1, res=[]
    while(last!==-1){
        console.log(last)
        res.unshift(last)
        last=dp[last][2]
    }

    console.log(res.map(d=>d+1).join(' '))

}


