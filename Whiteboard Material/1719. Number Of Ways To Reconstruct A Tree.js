/**
 * @param {number[][]} pairs
 * @return {number}
 */
var checkWays = function(pairs) {
    let adj={},total=new Set()
    for(let [x,y] of pairs){
        if(adj[x]===undefined)
            adj[x]=new Set()
        if(adj[y]===undefined)
            adj[y]=new Set()
        total.add(x),total.add(y)
        adj[x].add(y),adj[y].add(x)
    }
    let dfs=(nodes)=>{
        let n=nodes.size,root=null,sizes={}
        nodes.forEach(node=>{
            if(sizes[adj[node].size]===undefined)
                sizes[adj[node].size]=[]
            sizes[adj[node].size].push(node)
            }
        )
        if(sizes[n-1]===undefined)
            return 0
        root=sizes[n-1][0] //greedily pick a root
        nodes.delete(root)
        //find connected components through another dfs on the graph
        let processed=new Set(),components=[]
        let cdfs=(node,comp)=>{
            if(!processed.has(node))
                adj[node].delete(root),
                processed.add(node),
                comp.add(node),
                adj[node].forEach(d=>cdfs(d,comp))
        }
        nodes.forEach(node=>{
            if(!processed.has(node)&&node!==root)
                components.push(new Set()),
                cdfs(node,components[components.length-1])
        })
        let freq=[0,0,0] //compo
        components.forEach(comp=>freq[dfs(comp)]++)
        if(freq[0]>0) //if some component is not possible, always return 0 first
            return 0
        if(freq[2]>0 || sizes[n-1].length>1) //else if some component can be created in 2 ways, or i can assign another root, then return 2
            return 2
        return 1
    }
    return dfs(total)
};

console.log(checkWays(
   [[1,2],[2,3],[1,3]]

))