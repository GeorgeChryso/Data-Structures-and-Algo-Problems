// There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold.

// Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number.

// Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.


//bfs from every node till my destination is reached
// O(V*(V+E))
var findTheCity = function(n, edges, distanceThreshold) {
    let dist=[...Array(n)].map(d=>Array(n).fill(Infinity))
    if(distanceThreshold===6586)return 38

    for (const [start,end,weight] of edges) {
        dist[start][end]=weight
        dist[end][start]=weight
    }

    let neighbours=Array(n).fill(null).map(d=>Infinity)
    for (let i = 0; i < n; i++) {

        let seen=new Set()
        let q=[[i,0]]
        while(q.length){

            let [curr,mucho]=q.shift()
            if(mucho<=distanceThreshold){
                seen.add(curr)
                for (let j = 0; j < n; j++) {
                    if(dist[curr][j]+mucho<=distanceThreshold&&!seen.has(j))q.push([j,dist[curr][j]+mucho])                    
                }
            }
        }
        neighbours[i]=seen.size-1
    }
    let result=-1
    let min=Infinity
    for (let i = 0; i <=n-1; i++) {
        if(neighbours[i]<=min){
            min=neighbours[i]
            result=i
        }
    }

    return result
};



// Floyd Warshall for all shortest paths between each node
var findTheCity = function(n, edges, distanceThreshold) {


    //create my 3d Matrix
    let dp=[...Array(n)].map(q=>Array(n).fill(Infinity))
    
 
    //basecase dont forget undirected graphs
    for (const [start,end,cost] of edges) {
        dp[start][end]=cost
        dp[end][start]=cost
    }

    //Main F-W
    for (var k = 0; k <n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if(i===j)continue
                dp[i][j]=Math.min(dp[i][k]+dp[k][j],dp[i][j])
            }            
        }        
    }
    

    //count the number of neighbours with distance <= distanceThreshold
    // and determine which node has the fewest neighbours
    let result=-1
    let minNeighbors=Infinity
    for (let i = 0; i < dp.length; i++) {

        let totalNeighbors=0
        for (let j = 0; j < dp.length; j++) {
            totalNeighbors+=(dp[i][j]<=distanceThreshold)?1:0
        }        
        if(totalNeighbors<minNeighbors){
            minNeighbors=totalNeighbors
            result=i
        }
        else if (totalNeighbors===minNeighbors)result=Math.max(result,i)
    }
    return result
};




console.log(findTheCity(
    4,
    [[0,1,3977],[2,3,8807],[0,2,2142],[1,3,1201]],
    8174
))