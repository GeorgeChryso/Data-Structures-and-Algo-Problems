// You are given a two-dimensional list of integers edges where each element contains [u, v, distance] representing a weighted undirected graph. You are currently at node 0 and your home is the largest node. You can go from u to v if it's immediately connected and the shortest distance from u to home is larger than the shortest distance from v to home.

// Return the number of unique paths possible to go from node 0 to home. Mod the result by 10 ** 9 + 7.

// Constraints

// 1 ≤ n ≤ 100,000 where n is the length of edges
// 0 ≤ distance


/*
    - All nodes arent necessarily connected
    - The starting graph may contain cycles
    - There is not always a path from 0 home

*/
class minBinaryHeap{
    constructor(){
        this.heap=[]
        //this is the simplest comparator between a and b and returns 
        // a positive number if a >b
        // a negative number if a < b
        // or 0 when a ===b, 
        // adjusting this for every situation will allow me to use heaps outside of the 
        // just numbers context
        this.comparator=(a,b)=>a-b
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length

    peek=()=>this.heap[0]

    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))<0)){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1)return this.heap.pop()

        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&(this.comparator(this.heap[index],this.getLeftChild(index))>0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))>0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))<=0){
                    //and swap
                    this.swap(index,index*2+1)
                    index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  this.swap(index,index*2+2)
                  index=index*2+2

                }
                
            }
        }
    }
    swap=(a,b)=>{
        if(a===b)return
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}
class Solution {
    solve(edges) {
        let home=0,nodes=new Set(),adj={}
        var dijkstras=(distances)=>{
            let connections={},finalizedDist={},prev={},sptSet=new Set() 
            for (const [source,tar,cost] of distances) {
                connections[source]==undefined?connections[source]=[[source,tar,cost]]:connections[source].push([source,tar,cost])
                connections[tar]==undefined?connections[tar]=[[tar,source,cost]]:connections[tar].push([tar,source,cost])
                finalizedDist[source]=Infinity    //populate distance for n nodes
                finalizedDist[tar]=Infinity
                nodes.add(source)
                nodes.add(tar)
                if(adj[source]===undefined)
                    adj[source]={}
                if(adj[tar]===undefined)
                    adj[tar]={}
                adj[source][tar]=cost
                adj[tar][source]=cost
                home=Math.max(source,tar,home)
            }
        
            let priorityQueue=new minBinaryHeap(),totalNodes=Object.keys(connections).length
            priorityQueue.comparator=(a,b)=>a[2]-b[2]
            priorityQueue.push([home,home,0])
            finalizedDist[home]=0

            while(priorityQueue.length()&&sptSet.size<totalNodes){
                let currentElement=priorityQueue.poll()
                if(sptSet.has(currentElement[1])&&priorityQueue.length())
                    continue
                sptSet.add(currentElement[1])
                for (const [cur,to,cost] of connections[currentElement[1]]) 
                    if(finalizedDist[cur]+cost<finalizedDist[to])
                        finalizedDist[to]=finalizedDist[cur]+cost,
                        priorityQueue.push([cur,to,finalizedDist[cur]+cost])
            }
            return finalizedDist
        }
        let topologicalSort=(nodes,adj,minD)=>{
            let seen=new Set(),topo=[],next={}
            nodes.forEach(d=>{
                nodes.forEach(q=>{
                    if(adj[d][q]!=undefined&&d!==q){
                        if(next[q]===undefined)
                            next[q]=new Set()
                        if(next[d]===undefined)
                            next[d]=new Set()
                        if(minD[d]<minD[q])
                            next[q].add(d)
                        if(minD[d]>minD[q])
                            next[d].add(q)
                    }
                })
            })
            let dfs=node=>{
                if(seen.has(node)||node===undefined)
                    return
                seen.add(node)
                if(next[node])
                    for(let nei of next[node])
                        dfs(nei)
                topo.unshift(node)
            }
            nodes.forEach(d=>{
                dfs(d)
            })
            return [topo,next]
        }   
        let minD=dijkstras(edges), //find the minimum distances from home
            [topo,next]=topologicalSort(nodes,adj,minD) //find the topological order of the new adjacency list according to minD
        if(home==0)
            return 0
        //do forward dp
        let dp={},mod=1e9+7
        dp[0]=1
        for(let node of topo){
            if(dp[node]===undefined)
                dp[node]=0
            next[node].forEach(nei=>
                    dp[nei]=((dp[nei]||0)+dp[node])%mod
                )
        }
            
        return dp[home]
    }   
}

