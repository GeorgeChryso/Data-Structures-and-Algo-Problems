// There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w.

// Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.

let dijkstras=(src,Target,distances,maxStops)=>{

    //source: [distances[i]]
    let connections={}
    //key:node name, val: its dist from source node
    let finalizedDist={}
    let sptSet=new Set() //all the nodes,whose minimum distance from source
    // is finalized.

    console.log(src,Target,distances)
    for (const [source,tar,cost] of distances) {
         connections[source]==undefined?connections[source]=[[source,tar,cost]]:connections[source].push([source,tar,cost])
         finalizedDist[source]=Infinity    //populate distance for n nodes

    }
 
    let priorityQueue=new minBinaryHeap()
    priorityQueue.comparator=(a,b)=>a[2]-b[2]

    priorityQueue.push([src,src,0])
    finalizedDist[src]=0

  
    let totalNodes=Object.keys(connections).length

    while(sptSet.size!==totalNodes){
        let currentElement=priorityQueue.poll()
        while(sptSet.has(currentElement[1])&&priorityQueue.heap.length!==0){
            currentElement=priorityQueue.poll()
        }
        sptSet.add(currentElement[1])

        for (const [cur,to,cost] of connections[currentElement[1]]) {
            priorityQueue.push([cur,to,cost])
            if(finalizedDist[cur]+cost<finalizedDist[to]){
                finalizedDist[to]=finalizedDist[cur]+cost
            }
        }
        console.log(finalizedDist,currentElement,sptSet)

    }

    return finalizedDist[Target]
}




//minHeap
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
                  index=index*2+1

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







var findCheapestPrice = function(n, flights, src, dst, K) {
    
    return dijkstras(src,dst,flights,K)

};