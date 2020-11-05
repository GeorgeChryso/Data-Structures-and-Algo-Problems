// A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

// Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

// Return a list of all MHTs' root labels. You can return the answer in any order.

// The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

 

// Example 1:


// Input: n = 4, edges = [[1,0],[1,2],[1,3]]
// Output: [1]
// Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
// Example 2:


// Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
// Output: [3,4]
// Example 3:

// Input: n = 1, edges = []
// Output: [0]
// Example 4:

// Input: n = 2, edges = [[0,1]]
// Output: [0,1]
 

// Constraints:

// 1 <= n <= 2 * 104
// edges.length == n - 1
// 0 <= ai, bi < n
// ai != bi
// All the pairs (ai, bi) are distinct.
// The given input is guaranteed to be a tree and there will be no repeated edges.




// through floyd-warshall O(n^3) TLE

// through bfs from every node O(n^2) TLE 66/68
var findMinHeightTrees = function(n, edges) {
    if(n==1)
        return [0]

    let adj=[...Array(n)].map(d=>[])
    for (const [f,t] of edges) 
        adj[f].push(t),
        adj[t].push(f)
    let bfs=root=>{
        let q=[root], seen=new Set([root]),depth=-1
        while(q.length){
            let temp=[]
            while(q.length){
                let ele=q.shift()
                for (const neighbor of adj[ele]) 
                    if(!seen.has(neighbor))
                        temp.push(neighbor),
                        seen.add(neighbor)                
            }
            q=temp
            depth++
        }
        return depth
    }
    let result=[],bestseen=Infinity
    for (let i = 0; i < n; i++) {
        let depth=bfs(i)
        if(depth<bestseen)
            result=[i],
            bestseen=depth
        else if(depth==bestseen)
            result.push(i)        
    }
    return result
};
// The roots of the MHT's  ARE the middle vertice(s) of the path of its diameter
// O(n)
var findMinHeightTrees = function(n, edges) {
    if(n==1)
        return [0]
    let adj=[...Array(n)].map(d=>[])
    for (const [f,t] of edges) 
        adj[f].push(t),
        adj[t].push(f)
    //returns the longest path that starts from node
    let dfs=(node,seen)=>{ 
        let max=[]
        for (const neighbor of adj[node]) 
            if(!seen.has(neighbor)){
                seen.add(neighbor)
                let cur=dfs(neighbor,seen)
                if(cur.length>max.length)
                    max=cur
            }
        return max.concat([node])
    }
    //find the diameter's path with x2 DFSes
    let vertex1=dfs(0,new Set([0]))[0],diameterPath=dfs(vertex1,new Set([vertex1]))

    if(diameterPath.length&1!==0) //if the longest path is odd
        return [diameterPath[diameterPath.length>>1]] //theres only 1 mht root
    //else there are 2 ( the middle points)
    return [diameterPath[(diameterPath.length>>1)-1],diameterPath[diameterPath.length>>1]]
};
// the result can be at most of length 2 
// Iteratively, cut leaves until you get to the last <=2 nodes, which are the roots of the MHT's
// The roots of the MHT's can be the middle vertice(s) of the path of its diameter
// if the diameter is Even=> there are 2 middle points=> 2 roots
// if the diameter is Odd=> there s 1 middle point => 1 root
var findMinHeightTrees = function(n, edges) {
    let g={};
    for(let i=0;i<n;i++) 
        g[i]=new Set;
    for(let [a,b] of edges)
        g[a].add(b),
        g[b].add(a);
    
    while(Object.keys(g).length > 2){
        //for every leaf v 
        Object.keys(g).filter(v=>g[v].size<=1) // a leaf of a tree connects only to 1 noed
                      .forEach(v=>{
                                //for every neighbor of that leaf
                                g[v].forEach(nextv=>
                                                //delete the leaf 
                                                g[nextv].delete(parseInt(v)));
                                                    delete g[v];
        })
    }
    
    return Object.keys(g);
};



// DP solution todo
//https://leetcode.com/problems/minimum-height-trees/discuss/76052/Two-O(n)-solutions

console.log(findMinHeightTrees(
   4, [[1,0],[1,2],[1,3]]
))