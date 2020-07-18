// There are a total of n courses you have to take, labeled from 0 to n-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.

// There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.

// Example 1:

// Input: 2, [[1,0]] 
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you should have finished   
//              course 0. So the correct course order is [0,1] .
// Example 2:

// Input: 4, [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,1,2,3] or [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both     
//              courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. 
//              So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3] .
// Note:

// The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
// You may assume that there are no duplicate edges in the input prerequisites.



//bfs-ish with a memo
var findOrder = function(n, prerequisites) {
    let adj=[...Array(n)].map(d=>[...Array(n)].map(q=>0)) 
    for (const [next,prev] of prerequisites) {
        adj[next][prev]=1
    }
    let result=[],q=[...Array(n)].map((d,i)=>Number(i))
    let done=new Set(), times=0
    while(result.lenth!=n&&q.length){
        if(times>n)return []
        let ele=q.shift()
        if(done.has(ele))continue
        if(adj[ele].every((d,i)=>d==0||done.has(i))){
            times=0
            done.add(ele)
            result.push(ele)
        }
        else{ 
            times++
            q.push(ele)
        }
    }   
    return result
};


//topological sort dfs
var findOrder = function(n, prerequisites) {
    let adj=[...Array(n)].map(d=>[...Array(n)].map(q=>0)) 
    for (const [next,prev] of prerequisites) {
        adj[prev][next]=1
    }

    //has cycles? through naive dfs TLE O(V+E)
    let visited=[...Array(n)].map(d=>0)
    let finished=new Set()
    let hasCycles=node=>{
        if(visited[node])return true
        if(finished.has(node))return false
        visited[node]=true
        finished.add(node)
        if(adj[node])
           for (let i = 0; i < adj[node].length; i++) {
                if(adj[node][i]){
                    if(hasCycles(i))return true
                }               
           }
        visited[node]=false
        return false
    }

    for (let i = 0; i < n; i++) {   
        if(hasCycles(i))return [] 
    }



    //topo sort O(V+E)
    visited=new Set()
    let result=[]
    let dfs=(node)=>{
        if(node===undefined||visited.has(node))return
        visited.add(node)
        for (let i = 0;adj[node]&& i < adj[node].length; i++) {
           if(adj[node][i]) dfs(i)            
        }
        result.unshift(node)
    }

    for (let i = 0; i < n; i++) {
        dfs(i)        
    }
    
    return result
};

console.log(
    findOrder(
        2,[[1,0]]
     //2,   [[0,1],[1,0]]
    )
)