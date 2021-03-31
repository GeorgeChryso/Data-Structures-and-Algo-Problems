/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
let dEsopoPape=(edges,source)=>{
    
    let distanceFromStart={}
    //find the maximum Weight and the number of Vertices
    for (let [start,to,cost] of edges) {
        start--,to--
        distanceFromStart[start]=Infinity
        distanceFromStart[to]=Infinity
    }
    distanceFromStart[source]=0
    
    //number of Vertices
    let V=source+1
    
    let AdjacencyMatrix={}
    for (let [start,to,cost] of edges) {
        start--,to--
         if(AdjacencyMatrix[start]===undefined)
              AdjacencyMatrix[start]={}
         AdjacencyMatrix[start][to]=cost
        if(AdjacencyMatrix[to]===undefined)
              AdjacencyMatrix[to]={}
         AdjacencyMatrix[to][start]=cost
    }
    //if m[i]===0 the distance has already been calculated(maybe not final)
    // if m[i]===1 the distance of vertex i is currently being calculated
    // if m[i]===2 the distance of vertex i has not yet been calculated
    let m=[...Array(V)].map(d=>2) //map everything to 2

    let q=[source]
    while(q.length){
        let u=q.shift()
        m[u]=0
        Object.keys(AdjacencyMatrix[u]).forEach( (nei)=>{
            let [v,cost]=[nei,AdjacencyMatrix[u][nei]]
            if(distanceFromStart[u]+cost<distanceFromStart[v]){
                distanceFromStart[v]=distanceFromStart[u]+cost
                if(m[v]==2)
                    m[v]=1,
                    q.push(v)
                
                else if(m[v]==0)
                    m[v]=1,
                    q.unshift(v)
                
            }
        })
    }

    return distanceFromStart

}

var countRestrictedPaths = function(n, edges) {
    // Create the Adjacency Matrix
    let adj={}
    for(let [f,t,cost] of edges){
        f--,t--
        if(adj[f]===undefined)
            adj[f]={}
        adj[f][t]=cost
        if(adj[t]===undefined)
            adj[t]={}
        adj[t][f]=cost
    }

    // Run D'esopo Pape to calculace the minimum cost from any node to N
    let minCost=[...Array(n)].map(d=>0) 
    minCost[n-1]=0 // normalized i-th node to i-1
    let m=[...Array(V)].map(d=>2), q=[n-1]
    while(q.length){
        let u=q.shift()
        m[u]=0
        if(adj[u]===undefined)
            continue
        Object.keys(adj[u]).forEach( (nei)=>{
            let [v,cost]=[nei,AdjacencyMatrix[u][nei]]
            if(minCost[u]+cost<minCost[v]){
                minCost[v]=minCost[u]+cost
                if(m[v]==2)
                    m[v]=1,
                    q.push(v)
                
                else if(m[v]==0)
                    m[v]=1,
                    q.unshift(v)
                
            }
        })
    }
    
    // Memoized DFS the result
    let numWays={ }  //numWays[i]: number of Paths from i->n-1
    numWays[n-1]=1
    let rec=node=>{
        if(numWays[node]===undefined){
            numWays[node]=Object.keys(adj[node]).reduce( (acc,nei)=>{
                if(minCost[nei]<minCost[node])
                    return (acc+rec(nei))%1e9+7
                return acc
            },0)
        }
        return numWays[node]
    }
    return rec(0)
};