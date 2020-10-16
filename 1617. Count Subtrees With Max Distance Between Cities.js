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
var countSubgraphsForEachDiameter = function(n, edges) {
    let result=[...Array(n-1)].map(d=>0), adj=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    let subtreesprocessed=new Set()
    for (const [f,t] of edges) {
        adj[f-1][t-1]=1
        adj[t-1][f-1]=1
    }

    for (let i = 1; i < (1<<n); i++) {
        let nodes=[]
        for (let j = 0; j <= n; j++) 
            if(i&(1<<j))
                nodes.push(j)

        let uf=new UnionFind(nodes.length)
        for (let i = 0; i < nodes.length; i++) 
            for (let j = 0; j < nodes.length; j++)
                if(adj[nodes[i]][nodes[j]]==1)
                    uf.union(i,j)
                
        let parentmask={}
        for (let i = 0; i <nodes.length; i++) {
            let p=uf.find(i)
            if(parentmask[p]==undefined)
                parentmask[p]=(1<<nodes[p])|(1<<nodes[i])
            else
                parentmask[p]|=(1<<nodes[i])
        }


        console.log(`grp `,i.toString(2))
        for (const mask of Object.values(parentmask)) {
            console.log(mask.toString(2))
            if(subtreesprocessed.has(mask))
                continue           

            let count=0
            for (let i = 0; i <=n; i++)
                count+=((mask&(1<<i)) !==0)                
            if(count==1){
                continue
            }
            result[count-2]++
            subtreesprocessed.add(mask)
        }
        console.log(`result `,result)
    }

    return result
};

