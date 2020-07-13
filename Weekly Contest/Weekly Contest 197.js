


var numIdenticalPairs = function(nums) {
  
    let result=0
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            if(nums[i]===nums[j])result++
        }        
    }
    return result
};






var numSub = function(s) {
    
    let n=s.length

    let ones=[]
    let sum=0
    for (let i = 0; i < s.length; i++) {
        if(s[i]=='1'){
            sum++
        }
        else{
            if(sum!=0)ones.push(sum)
            sum=0
        }
    }

    if(sum!=0)ones.push(sum)

    let result=0
    for (let i = 0; i < ones.length; i++) {
        result=(result+( ones[i]*(ones[i]+1 )/2    )   )%(1e9+7 )
    }
    return result
};





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

var maxProbability = function(n, edges, succProb, start, end) {
    if(start===end)return 1
    let visited=new Set()
    visited.add(start)

    let con=[...Array(n)].map(d=>[...Array(n)].map(q=>0))

    for (let i = 0; i < edges.length; i++) {
        let [from,to]=edges[i]
        let prob=succProb[i]
        con[from][to]=prob
        con[to][from]=prob
    }

    let finalizedDist=[...Array(n)].map(d=>0)

    let priorityQueue=new minBinaryHeap()
    priorityQueue.comparator=(a,b)=>b[2]-a[2]

    priorityQueue.push([start,start,1])
    finalizedDist[start]=1
    let sptSet=new Set() //all the nodes,whose minimum distance from source


    while(sptSet.size!==n){
        
            let currentElement=priorityQueue.poll()
            while(sptSet.has(currentElement[1])&&priorityQueue.heap.length!==0){
                currentElement=priorityQueue.poll()
            }
            sptSet.add(currentElement[1])
      
            for (let i = 0; i < n; i++) {
                
                let cur=currentElement[1]
                let to=i
                let cost=con[cur][to]

                console.log(cur,finalizedDist[cur],cost,to,finalizedDist[to])

                if(finalizedDist[cur]*cost>finalizedDist[to]){
                    finalizedDist[to]=finalizedDist[cur]*cost
                    priorityQueue.push([cur,to,cost])

                }          

            }
            console.log(finalizedDist)

        
            
             //stop early optimization, If the target node is processed I can end it as the distance is not going to change
            // BUT, THE REST OF THE NODES ARE NOT OPTIMIZED
            // if(currentElement[0]===Target)return finalizedDist[Target]
        
    }
    console.log(finalizedDist)
    return finalizedDist[end]

};


let BellmanFord=(src,target,edges)=>{
    let distanceFromSource={}
    //only if i want to find the path aswell
    let prev={}
    //initialize the distance of every node with Infinity
    for (const [start,end,cost] of edges) {
        distanceFromSource[start]=Infinity
        distanceFromSource[end]=Infinity
        prev[start]=Infinity
        prev[end]=Infinity
    }

    distanceFromSource[src]=0
    
    //Number of Nodes
    let N=Object.keys(distanceFromSource).length

    // main
    for (let i = 1; i <=N-1; i++) {
        for (const [start,end,cost] of edges) {
            if(distanceFromSource[start]===Infinity)continue
            if( distanceFromSource[start]+cost<distanceFromSource[end]){
                distanceFromSource[end]=distanceFromSource[start]+cost
                prev[end]=start
            }
        }
    }


    return distanceFromSource[target]

}
var maxProbability = function(n, edges, succProb, src, tar) {
    let distanceFromSource={}


    for (const [st,e] of edges) {
        distanceFromSource[st]=0
        distanceFromSource[e]=0
    }
    distanceFromSource[src]=1

    for (let q = 1; q <n; q++) {

        for (let i = 0; i < edges.length; i++) {
            let [start,end]=edges[i]
            let cost=succProb[i]
            if(distanceFromSource[start]===0)continue
            if( distanceFromSource[start]*cost>distanceFromSource[end]){
                distanceFromSource[end]=distanceFromSource[start]*cost
            }
        }
        console.log(distanceFromSource)
    }
    return distanceFromSource[tar]

}

let dEsopoPape=(edges,source)=>{
    
    let distanceFromStart={}
    //find the maximum Weight and the number of Vertices
    for (const [start,to,cost] of edges) {
        distanceFromStart[start]=Infinity
        distanceFromStart[to]=Infinity
    }
    distanceFromStart[source]=0
    
    //number of Vertices
    let V=Object.keys(distanceFromStart).length
    
    let AdjacencyMatrix=[...Array(V)].map(d=>Array(V).fill(Infinity))
    for (const [start,to,cost] of edges) {
         AdjacencyMatrix[start][to]=cost
         //Change if Undirected
         AdjacencyMatrix[to][start]=cost
    }

    //if m[i]===0 the distance has already been calculated(maybe not final)
    // if m[i]===1 the distance of vertex i is currently being calculated
    // if m[i]===2 the distance of vertex i has not yet been calculated
    let m=[...Array(V)].map(d=>2) //map everything to 2

    let q=[source]
    while(q.length){
        let u=q.shift()
        m[u]=0
        for (let i = 0; i < AdjacencyMatrix[u].length; i++) {
            let [v,cost]=[i,AdjacencyMatrix[u][i]]
            if(distanceFromStart[u]+cost<distanceFromStart[v]){
                distanceFromStart[v]=distanceFromStart[u]+cost
                if(m[v]==2){
                    m[v]=1
                    q.push(v)
                }
                else if(m[v]==0){
                    m[v]=1
                    q.unshift(v)
                }

            }

        }
    }

    return distanceFromStart

}

var maxProbability = function(n, edges, succProb, source, tar) {
    let distanceFromStart={}



    let AdjacencyMatrix=[...Array(n)].map(d=>[...Array(n)].map(q=>0))

    for (let i = 0; i < edges.length; i++) {
        let [from,to]=edges[i]
        let prob=succProb[i]
        distanceFromStart[from]=0
        distanceFromStart[to]=0
        AdjacencyMatrix[from][to]=prob
        AdjacencyMatrix[to][from]=prob
    }
    distanceFromStart[source]=1
    let V=n
    let m=[...Array(V)].map(d=>2) //map everything to 2

    let q=[source]
    while(q.length){
        let u=q.shift()
        m[u]=0
        for (let i = 0; i < AdjacencyMatrix[u].length; i++) {
            let [v,cost]=[i,AdjacencyMatrix[u][i]]
            if(distanceFromStart[u]*cost>distanceFromStart[v]){
                distanceFromStart[v]=distanceFromStart[u]*cost
                if(m[v]==2){
                    m[v]=1
                    q.push(v)
                }
                else if(m[v]==0){
                    m[v]=1
                    q.unshift(v)
                }

            }

        }
    }

    return distanceFromStart[tar]

}

console.log(maxProbability(
    5,
    [[1,4],[2,4],[0,4],[0,3],[0,2],[2,3]],
    [0.37,0.17,0.93,0.23,0.39,0.04],
    3,4
))









var getMinDistSum = function(positions) {
    
    let all=positions[0]
    for (let i = 1; i < positions.length; i++) {
        all[0]=(all[0]+positions[i][0])/2
        all[1]=(all[1]+positions[i][1])/2

    }
    let num=.1
    let result=Infinity
    let moves=[[0,num],[0,-num],[num,0],[-num,0],[num,num],[-num,-num],[num,-num],[-num,num]]

    while(true){
        let newres=Infinity

        for (const [dx,dy] of moves) {
            let sum=0
            for (const [x,y] of positions) {
                sum+=Math.sqrt( (x-(all[0]+dx))**2  + (y-(all[1]+dy))**2)
            }
            console.log(sum)
            newres=Math.min(Math.fround(sum),newres)
            if(sum<result){
                all[0]=all[0]+dx
                all[1]=all[1]+dy
            }
        }

        console.log(all,result)

        if(newres>=result)return result
        else if(newres<result)result=newres
    }
};

console.log(getMinDistSum(
    [[0,1],[1,0],[1,2],[2,1]]
))