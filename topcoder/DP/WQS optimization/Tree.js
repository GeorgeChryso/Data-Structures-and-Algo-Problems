
// 　　Given an undirected weighted connected graph, each EDGE is black or white.
//  Find a spanning tree with  minimum weight and exactly K white edges.

// 　　It is guaranteed that there is always a solution.
// number of vertices, number of edges and K is the number of white edges required
// for each side, [ from , to , weight , color]


/*  
        1≤N≤5×1e4,
        N−1≤EDGES<=1e5, 
        1≤weights≤100  
        0≤color≤1 
*/


/*

    Let us denote with f(x) the minimum weight of MST that has x edges

    then necessarily, f(x+1)-f(x)>=f(x)-f(x-1), because for f(x) to be created, an extra white edge was added to f(x-1).
    But not just any edge, the minimum white edge that was not a part of f(x-1) was added. Same goes for the creation
     of f(x+1). A white edge was added, the minimum white edge not in f(x). That minimum white edge is necessarily bigger, than the one which was added to f(x-1). Hence the inequality holds. 

    So now I want to minimize f(x)+ px given some value p. 
*/

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
            return false    
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
        return true
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}

let Tree=(n,K,edges)=>{

    let calc=p=>{
        for (let i = 0; i < edges.length; i++) {
            let [f,t,w,color]=edges[i]
            if(color==0)// white
                edges[i][2]=w+p
        }
        let totalWeight=0,totalCount=0
        // Kruskal's
        // smaller weights first, if equal=> whites first
        edges.sort((a,b)=> a[2]==b[2]?a[3]-b[3]:a[2]-b[2])
        console.log(edges,p)
        let DSU=new UnionFind(n)
        for (const [f,t,w,color] of edges) 
            if(DSU.union(Number(f),Number(t)))
                totalWeight+=Number(w),
                totalCount+=(color===0?1:0) //count the whites
        
        for (let i = 0; i < edges.length; i++) {
            let [f,t,w,color]=edges[i]
            if(color==0)// white
                edges[i][2]=w-p
        }
        console.log(edges)

        console.log(totalWeight,totalCount,p)
        return [totalWeight,totalCount]
    }

    // binary search on the minimum WEIGHT increase we are willing to take by adding a white node 
    // increasing the white nodes in the mst gives me diminishing returns on the totalWeight,
    // that means that 1 extra white will increase my totalWeight by A
    // then if I add another 1 white the totalWeight will increase by B
    // and A>=B always. 
    // So i binary search on the increase of weight
    //the bounds are -100, 100, because if let's say f(x-1) =100 but there is no MST with x whites, f(x)=0
    // hence f(x)-f(x-1)=0-100=-100
    // We binary search on p, at which we use K of something.  p is the minimum gain we re willing to take  for an increase in  k ,
    // here p is the minimum weight we re willing to increase, to get K whitenodes
    let lo=-100, hi=100, result=0
    while(lo <= hi) {
        let mid =(lo+hi)>>1
        // calc() is algorithm A, first is M(mid), second is V(mid)
        console.log(mid)
        let f=calc(mid) 
        let [totalWeight,totalWhites]=f
        if(totalWhites== K) 
            result = totalWeight- mid * K, 
            lo = mid + 1;
        else if(totalWhites>K)
            lo = mid + 1;
        else 
            hi = mid - 1;

    }
    return result
}


let test=[
    [4,3,[[1,3,1,1],[1,3,3,0],[0,2,0,0],[0,1,1,1],[0,1,2,0],[ 1,2,1,0], [0,2,2,1]]]
]

test.forEach( ([A,B,C])=>console.log(Tree(A,B,C)))