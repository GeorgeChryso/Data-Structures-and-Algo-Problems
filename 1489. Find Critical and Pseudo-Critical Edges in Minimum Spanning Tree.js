// Given a weighted undirected connected graph with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between nodes fromi and toi. A minimum spanning tree (MST) is a subset of the edges of the graph that connects all vertices without cycles and with the minimum possible total edge weight.

// Find all the critical and pseudo-critical edges in the minimum spanning tree (MST) of the given graph. An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. A pseudo-critical edge, on the other hand, is that which can appear in some MSTs but not all.

// Note that you can return the indices of the edges in any order.

// Potential solution

// Kruskal=>find MST's cost =>ElogE+ElogV
// Knapsack=>number of ways to reach  said cost=>E**2
// recursion=>generate all possible combinations of edges that reach that cost
// Unionfind=> check if said combinations are actually spanning the whole tree
// Process which nodes appear in every MST with the different combination of edges 
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
  //but that would be tooo long of a solution  
};


//alternative: 
// Kruskal's for MST's cost
// for every edge
//  
//  rerun Kruskal's without edge and see if cost grows
//      if(it's bigger)=>critical edge (belongs to every MST)
//      else{
//   rerun Kruskal's but with said edge preaccepted to the solution
//  (pre accepted to the MST group), if the cost doesnt change its a 
//     non critical (belongs to some MSTS)
class UnionFind {

    constructor(size){
        //the total count of different elements(not groups) in this union find
        this.count=size
        //tracks the sizes of each of the components(groups/sets)
        //groupsize[a] returns how many elements the component with root a has 
        this.groupSize=[...Array(size)] 
        //number of components(groups) in the union find
        this.numComponents=size
        //points to the parent of i, if parent[i]=i, i is a root node
        this.parent=[...Array(size)]  //which is also the index of the group

        //put every element into its own group
        // rooted at itself
        for (let i = 0; i < size; i++) {
            this.groupSize[i]=i     
            this.parent[i]=i            
        }
    }

    //returns to which component (group) my element belongs to 
    // α(n) --Amortized constant time 
    // Update: Also compresses the paths so that each child points to its 
    // parent
    find(element){
        let root=element
        //find the parent of the group the elemnt belongs to
        // When root===parent[root] is always the parent of that group (root)
        while(root!=this.parent[root])
            root=this.parent[root]

        // Compression, point the element to its parent if its not already pointed
        // Tldr: Not only do I point my element to its actual root, i point any
        // inbetween elements to that root aswell
        while(element!=root){
            let next=this.parent[element]
            this.parent[element]=root
            element=next
        }
        
        return root
    }   

    //Unifies the sets containing A and B
    // if not already unified 
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A) //parent of A
            ,root2=this.find(B) //parent of B
        if(root1===root2) //already unified
            return
        // I want to put the set with fewer elements 
        // to the one with more elemenets
        if(this.groupSize[root1]<this.groupSize[root2]){
            this.groupSize[root2]+=this.groupSize[root1]
            this.parent[root1]=this.parent[root2]
        }
        else {
            this.groupSize[root1]+=this.groupSize[root2]
            this.parent[root2]=this.parent[root1]
        }

        this.numComponents-- //cos 1 less group, since i merged 2
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}
let kruskals=(n,e,wannaleaveout=-1,wannabeparent=-1)=>{
    let nonC,critical,UF=new UnionFind(n),result=0
    //so essentially i place my wannabe first
    // so it gets picked by Kruskal's algo
    //for non criticals
    let edges=[...e]
    if(wannabeparent!=-1)
        nonC=[...edges[wannabeparent]]
    if(wannaleaveout!=-1)
        critical=[...edges[wannaleaveout]]
    edges.sort((a,b)=>{
        if(wannabeparent!=-1){
            if(a.every((d,i)=>d==nonC[i]))return -1
            if(b.every((d,i)=>d==nonC[i]))return 1
        }
        return a[2]-b[2]
    })

    for (let idx in edges) {
        if(wannaleaveout!=-1&&critical.every((d,i)=>d==edges[idx][i]))
            continue
        let [from,to,cost]=edges[idx]
        if(!UF.sameGroup(from,to)){
            UF.union(from,to)
            result+=cost
        }
    }
    if(UF.numComponents>1)// No MST
        return Infinity
    return result
}
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
    let MSTcost=kruskals(n,edges),criticals=[],nonCriticals=[]
    //but that would be tooo long of a solution  

    for (let i = 0; i < edges.length; i++) 
        if(kruskals(n,edges,i,-1)>MSTcost) //including non msts
            criticals.push(i)
        else if(kruskals(n,edges,-1,i)===MSTcost)
            nonCriticals.push(i)
    
    return [criticals,nonCriticals]
};


console.log(findCriticalAndPseudoCriticalEdges(
    6,
    [[0,1,1],[1,2,1],[0,2,1],[2,3,4],[3,4,2],[3,5,2],[4,5,2]]
))
