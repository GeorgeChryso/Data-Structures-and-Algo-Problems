// Given a directed, acyclic graph of N nodes.  Find all possible paths from node 0 to node N-1, and return them in any order.

// The graph is given as follows:  the nodes are 0, 1, ..., graph.length - 1.  graph[i] is a list of all nodes j for which the edge (i, j) exists.

// Example:
// Input: [[1,2], [3], [3], []] 
// Output: [[0,1,3],[0,2,3]] 
// Explanation: The graph looks like this:
// 0--->1
// |    |
// v    v
// 2--->3
// There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
// Note:

// The number of nodes in the graph will be in the range [2, 15].
// You can print different paths in any order, but you should keep the order of nodes inside one path.




//bfs top down
var allPathsSourceTarget = function(graph) {
    let n=graph.length
    let Matrix=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            Matrix[graph[i][j]][i]=1            
        }        
    }
    let result=[]
    let q=[[n-1]]
    while(q.length){
        let ele=q.shift()
        if(ele[0]===0)result.push(ele)
        for (let i = 0; i <n; i++) {
            if(Matrix[ele[0]][i]===1){
                q.push([i,...ele])    
            }
        }
    }
    return  result
};

console.log(allPathsSourceTarget(
    [[1,2], [3], [3], []] 
))