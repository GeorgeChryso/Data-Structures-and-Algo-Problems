



var maxDepth = function(s) {
    if(s.length==0)
        return s.length
    s=s.split('').filter(d=>d=='('||d==')')
    let counter=0,result=0
    for (const char of s) {
        if(char==')')
            counter--
        else
            counter++
        result=Math.max(counter,result)
    }
    return result
};
console.log(maxDepth(
    `1`
))

var maximalNetworkRank = function(n, roads) {
    let adj=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    let count=[...Array(n)].map(d=>0),result=0
    for (const [f,to] of roads) {
        adj[f][to]=1
        adj[to][f]=1
        count[f]++
        count[to]++
    }
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            let max=count[i]+count[j]-adj[i][j]            
            result=Math.max(max,result) 
        }        
    }
    return result
};




var checkPalindromeFormation = function(a, b,end=false) {
    let n=a.length,cA=n%2,cB=n%2,left=(n>>1)-1,right=(n>>1)+n%2
    for (var q = 0; q <right&&a[q]===b[n-1-q]; q++){}
    for (let len = 0; len <right&&a[left-len]==a[right+len]; len++,cA+=2){}
    for (let len = 0; len <right&&b[left-len]==b[right+len]; len++,cB+=2){}
    if(2*q+cA>=n||2*q+cB>=n)
        return true
    return end==true?false: checkPalindromeFormation(b,a,true)
};
console.log(checkPalindromeFormation(
    "pvhmupgqeltozftlmfjjde",
    "yjgpzbezspnnpszebzmhvp"
))

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

console.log(
    countSubgraphsForEachDiameter(
       4, [[1,2],[2,3],[2,4]]
    )
)