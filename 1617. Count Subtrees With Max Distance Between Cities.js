// There are n cities numbered from 1 to n. You are given an array edges of size n-1, where edges[i] = [ui, vi] represents a bidirectional edge between cities ui and vi. There exists a unique path between each pair of cities. In other words, the cities form a tree.

// A subtree is a subset of cities where every city is reachable from every other city in the subset, where the path between each pair passes through only the cities from the subset. Two subtrees are different if there is a city in one subtree that is not present in the other.

// For each d from 1 to n-1, find the number of subtrees in which the maximum distance between any two cities in the subtree is equal to d.

// Return an array of size n-1 where the dth element (1-indexed) is the number of subtrees in which the maximum distance between any two cities is equal to d.

// Notice that the distance between the two cities is the number of edges in the path between them.

 

// Example 1:



// Input: n = 4, edges = [[1,2],[2,3],[2,4]]
// Output: [3,4,0]
// Explanation:
// The subtrees with subsets {1,2}, {2,3} and {2,4} have a max distance of 1.
// The subtrees with subsets {1,2,3}, {1,2,4}, {2,3,4} and {1,2,3,4} have a max distance of 2.
// No subtree has two nodes where the max distance between them is 3.
// Example 2:

// Input: n = 2, edges = [[1,2]]
// Output: [1]
// Example 3:

// Input: n = 3, edges = [[1,2],[2,3]]
// Output: [2,1]
 

// Constraints:

// 2 <= n <= 15
// edges.length == n-1
// edges[i].length == 2
// 1 <= ui, vi <= n
// All pairs (ui, vi) are distinct.

var countSubgraphsForEachDiameter = function(n, edges) {
    let result=[...Array(n-1)].map(d=>0), adj=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    for (const [f,t] of edges) {
        adj[f-1][t-1]=1
        adj[t-1][f-1]=1
    }

    for (let i = 1; i < (1<<n); i++) {
        // determine if the current subset of nodes in the mask
        // are connected, aka is a valid subTREE
        let mask=i,numberEdges=0,numberNodes=0
        for(let j=0;j<n;j++) //calculate the total number of nodes
            numberNodes+=((mask&(1<<j))!==0)
        for (const [f,t] of edges) //calculate the total number of edges
            numberEdges+=Number((mask&(1<<(f-1)))!==0&&(mask&(1<<(t-1)))!==0)
        //it is a valid subtree if numberNodes==numberEdges+1
        if(numberNodes!=numberEdges+1)
            continue
        //run 2 bfs to determine the diameter of that subtree
        // aka the maximum distance between any two nodes
        let memo=0 //stores the nodes already processed    
        let x=0//picka random node x
        while(((1<<x)&mask)==0)
            x++
        memo|=(1<<x) //store it
        //through bfs, find the node z, which is farthest from x
        let q=[x],z=-1
        while(q.length){
            let temp=[]
            for (const node of q){
                z=node
                for (let j = 0; j < n; j++) 
                    //j and node are connected, j is in my mask, and j is not visited already
                    if(adj[j][node]&&(mask&(1<<j))&&((memo&(1<<j))==0)){
                        memo|=(1<<j) //mark j as visited
                        temp.push(j)// and push it to the next level
                    }      
            }    
            q=temp
        }
        if(z==x) //only one node
            continue
        let level=0
        q=[z]
        memo=1<<z
   
        while(q.length){
            let temp=[]
            for (const node of q) 
                for (let j = 0; j < n; j++) 
                    //j and node are connected, j is in my mask, and j is not visited already
                    if(adj[j][node]&&(mask&(1<<j))&&((memo&(1<<j))==0)){
                        memo|=(1<<j) //mark j as visited
                        temp.push(j)// and push it to the next level
                    }    
            level++
            q=temp
        }
        //so the diameter is the number of nodes of the longest path
        // here it wants the number of edges of the longest paths
        // which is always level-1
        // so it wants 1 to go to 0, 2 to 1, so that's another -1
        // so level-2
        result[level-2]++//increment the diameter for the subtree
    }

    return result
};

console.log(
    countSubgraphsForEachDiameter(
        4,[[1,2],[2,3],[2,4]]
    )
)