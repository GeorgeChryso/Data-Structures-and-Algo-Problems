// Alice and Bob have an undirected graph of n nodes and 3 types of edges:

// Type 1: Can be traversed by Alice only.
// Type 2: Can be traversed by Bob only.
// Type 3: Can by traversed by both Alice and Bob.
// Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge of type typei between nodes ui and vi, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

// Return the maximum number of edges you can remove, or return -1 if it's impossible for the graph to be fully traversed by Alice and Bob.

 

// Example 1:



// Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
// Output: 2
// Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.
// Example 2:



// Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
// Output: 0
// Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.
// Example 3:



// Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
// Output: -1
// Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.
 

 

// Constraints:

// 1 <= n <= 10^5
// 1 <= edges.length <= min(10^5, 3 * n * (n-1) / 2)
// edges[i].length == 3
// 1 <= edges[i][0] <= 3
// 1 <= edges[i][1] < edges[i][2] <= n
// All tuples (typei, ui, vi) are distinct.

class UnionFind {

    // Construction takes O(n)
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
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A) //parent of A
            ,root2=this.find(B) //parent of B

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
var maxNumEdgesToRemove = function(n, edges) {
    edges.sort((a,b)=>b[0]-a[0])
    let bobused=0,aliceused=0,bothused=0
        ,Bob=new UnionFind(n),Alice=new UnionFind(n)

    for (const [type,f,to] of edges) {
        if(type==3){
            if(Bob.sameGroup(f,to))
                continue
            Bob.union(f,to)
            Alice.union(f,to)
            bothused++
        }
        if(type==2&&!Bob.sameGroup(f,to)){
            Bob.union(f,to)
            bobused++
        }
        if(type==1&&!Alice.sameGroup(f,to)){
            Alice.union(f,to)
            aliceused++
        }
    }

    if(Bob.numComponents!=1||Alice.numComponents!==1)
        return -1
    return edges.length-bobused-aliceused-bothused
 };
 


 //slightly less verbose, at the expense of readability
 var maxNumEdgesToRemove = function(n, edges) {
    edges.sort((a,b)=>b[0]-a[0])
    let edgesUsed=0,Bob=new UnionFind(n),Alice=new UnionFind(n)
    
    for (const [type,f,to] of edges) {
        if((type==3||type==2)&&!Bob.sameGroup(f,to)){
            Bob.union(f,to)
            edgesUsed++
        }
        if((type==3||type==1)&&!Alice.sameGroup(f,to)){
            Alice.union(f,to)
            if(type==1)edgesUsed++
        }
    }

    if(Bob.numComponents!=1||Alice.numComponents!==1)
        return -1
    return edges.length-edgesUsed
 };
