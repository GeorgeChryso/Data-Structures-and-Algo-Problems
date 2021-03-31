
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let T=Number(readline()) //1st line is usually the number of testcases
let solve2=(n,A,C)=>{
    let adj={},edges=[],result=0
    //rows:[0,n-1], cols:[n,2n-1]
    for(let i=0;i<2*n;i++)
        adj[i]=new Set()
    for(let i=0;i<n;i++)
        for(let j=0;j<n;j++)
            if(A[i][j]==-1)
                adj[i].add(j+n),
                adj[j+n].add(i),
                edges.push([i,j+n,C[i][j]])
    //detect cycles, aka if target is ever reached
    let dfs=(node,tar,seen=new Set())=>{
        if(seen.has(node))
            return 0
        if(node===tar)
            return 1
        let res=0
        seen.add(node)
        adj[node].forEach(nei=>res|=dfs(nei,tar,seen))
        return res
    }
    edges.sort((a,b)=>a[2]-b[2])
    for(let [f,t,cost] of edges){
        adj[f].delete(t),adj[t].delete(f)
        if(dfs(t,f)) //if there is a cycle
            result+=Number(cost)
        else
            adj[f].add(t),adj[t].add(f)
    }
    return result
}
class MaxHeap {
    constructor(data = []) {
      this.data = data;
      this.comparator = (a, b) => b - a;
      this.heapify();
    }
  
    // O(nlog(n)). In fact, O(n)
    heapify() {
      if (this.length() < 2) return;
      for (let i = 1; i < this.length(); i++) {
        this.bubbleUp(i);
      }
    }
  
    // O(1)
    peek() {
      if (this.length() === 0) return null;
      return this.data[0];
    }
  
    // O(log(n))
    push(value) {
      this.data.push(value);
      this.bubbleUp(this.length() - 1);
    }
  
    // O(log(n))
    poll() {
      if (this.length() === 0) return null;
      const result = this.data[0];
      const last = this.data.pop();
      if (this.length() !== 0) {
        this.data[0] = last;
        this.bubbleDown(0);
      }
      return result;
    }
  
    // O(log(n))
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = (index - 1) >> 1;
        if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
          this.swap(index, parentIndex);
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    // O(log(n))
    bubbleDown(index) {
      const lastIndex = this.length() - 1;
      while (true) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;
        let findIndex = index;
        if (
          leftIndex <= lastIndex &&
          this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
        ) {
          findIndex = leftIndex;
        }
        if (
          rightIndex <= lastIndex &&
          this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
        ) {
          findIndex = rightIndex;
        }
        if (index !== findIndex) {
          this.swap(index, findIndex);
          index = findIndex;
        } else {
          break;
        }
      }
    }
  
    // O(1)
    swap(index1, index2) {
      [this.data[index1], this.data[index2]] = [
        this.data[index2],
        this.data[index1]
      ];
    }
  
    // O(1)
    length() {
      return this.data.length;
    }
  }
let solvePrims=(n,A,C)=>{
    let adj={},result=0,total=0
    //rows:[0,n-1], cols:[n,2n-1]
    let pq=new MaxHeap(),seen=new Set()
    pq.comparator=((a,b)=>a[1]-b[1])
    for(let i=0;i<2*n;i++)
        adj[i]=[]
    for(let i=0;i<n;i++)
        for(let j=0;j<n;j++)
            if(A[i][j]==-1)
                adj[i].push([j+n,-C[i][j]]),
                adj[j+n].push([i,-C[i][j]]),
                total+=C[i][j]

    for(let i=0;i<2*n;i++){
        if(!seen.has(i))
            pq.push([i,0])
        while(pq.length()){
            let [node,val]=pq.poll()
            if(!seen.has(node)){
                seen.add(node)
                result+=Number(val)
                for(let [nei,val] of adj[node])
                    if(!seen.has(nei))
                        pq.push([nei,val])
            }
        }
    }
    return total+result
}
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
            this.parent[root1]=root2
            this.parent[A]=this.parent[B]=root2
        }
        else {
            this.groupSize[root1]+=this.groupSize[root2]
            this.parent[root2]=root1
            this.parent[A]=this.parent[B]=root1
        }

        this.numComponents-- //cos 1 less group, since i merged 2
        return true
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}
let solve=(n,A,C)=>{
    let edges=[],total=result=0
    //rows:[0,n-1], cols:[n,2n-1]
    let DSU=new UnionFind(2*n-1)
    for(let i=0;i<n;i++)
        for(let j=0;j<n;j++)
                edges.push([i,j+n,-C[i][j]]),
                total+=C[i][j]

    edges.sort((a,b)=>a[2]-b[2])
    for(let [f,t,val] of edges)
        if(DSU.union(f,t))
            result+=val
    return total+result
}

for (let t = 0; t <T; t++) { //for each testcase
    // input  logic
    let n=Number(readline()),A=[],B=[]
    for (let i = 0; i < n; i++) 
        A.push(readline().split(' ').map(d=>Number(d)))       
    for (let i = 0; i < n; i++) 
        B.push(readline().split(' ').map(d=>Number(d))) 
    readline(),readline()
    let result=solve(n,A,B)
    //output logic
    console.log('Case #'+(t+1).toString()+': '+result.toString())
}

