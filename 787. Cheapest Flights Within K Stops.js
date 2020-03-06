// There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w.

// Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.







// //failed dijkstras because it's the classic implementationm where only the best local option is considered
// let dijkstras=(src,Target,distances,maxStops)=>{

//     //source: [distances[i]]
//     let connections={}
//     //key:node name, val: its dist from source node
//     let finalizedDist={}

//     let previousParents={}

//     let sptSet=new Set() //all the nodes,whose minimum distance from source
//     // is finalized.

//     for (const [source,tar,cost] of distances) {
//          connections[source]===undefined?connections[source]=[[source,tar,cost]]:connections[source].push([source,tar,cost])
//          connections[tar]===undefined?connections[tar]=[]:null
//          finalizedDist[source]=Infinity    //populate distance for n nodes
//          finalizedDist[tar]=Infinity    //populate distance for n nodes
//          previousParents[source]=[ [0,0]]// [previousfinalized,previousscore]
//          previousParents[tar]=[[0,0]]//

//     }
 
//     let priorityQueue=new minBinaryHeap()
//     priorityQueue.comparator=(a,b)=>a[2]-b[2]

//     priorityQueue.push([src,src,0])
//     finalizedDist[src]=0
//     previousParents[src]=0
  
//     let totalNodes=Object.keys(connections).length

//     while(sptSet.size!==totalNodes&&priorityQueue.length){
//         let currentElement=priorityQueue.poll()
//         console.log(currentElement)
//         if(currentElement===undefined)return -1
//         while(sptSet.has(currentElement[1])&&priorityQueue.heap.length!==0){
//             currentElement=priorityQueue.poll()
//         }
//         if(currentElement===undefined||sptSet.has(currentElement[1]))return finalizedDist[Target]!==Infinity?finalizedDist[Target]:-1

//         sptSet.add(currentElement[1])
//         for (const [cur,to,cost] of connections[currentElement[1]]) {
//             priorityQueue.push([cur,to,cost])
//             if(finalizedDist[cur]+cost<finalizedDist[to]&&(previousParents[cur]+1<=maxStops+1)){
//                 finalizedDist[to]=finalizedDist[cur]+cost
//                 previousParents[to]=previousParents[cur]+1
//             }
//         }
//         console.log(finalizedDist,currentElement,sptSet)

//     }

//     return finalizedDist[Target]
// }



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
let dijkstras=(src,Target,distances,maxStops,n)=>{

    //source: [distances[i]]
    //let connections={}
    let conMatrix=[...Array(n)].map(d=>Array(n).fill(Infinity))
    for (const [source,tar,cost] of distances) {
        conMatrix[source][tar]=cost
    }


    let priorityQueue=new minBinaryHeap()
    priorityQueue.comparator=(a,b)=>a[0]-b[0]
    //nodes are like [costTillDestination,destination,previousStops]
    priorityQueue.push([0,src,maxStops+1])
  

    while(priorityQueue.heap.length){
        let [price,city,stops]=priorityQueue.poll()
        if(Number(city)==Target)return price
        if(stops>0){
            for (const next in conMatrix[city]) {
                if(conMatrix[Number(city)][next]===Infinity)continue
                let cost=conMatrix[Number(city)][next]
                priorityQueue.push([price+cost,next,stops-1])
            }
        }
    }

    return -1
}









//Intuition, normal dijkstra will not cut it here, because There may be path with lesser cost, but with more previous stops. Instead of getting the most optimal local solution, i will push every possible path's cost  to a priority queue considering the previous stops. 
var findCheapestPrice = function(n, flights, src, dst, K) {
    
    return dijkstras(src,dst,flights,K,n)

};


console.log(findCheapestPrice(
    18,
    [[16,1,81],[15,13,47],[1,0,24],[5,10,21],[7,1,72],[0,4,88],[16,4,39],[9,3,25],[10,11,28],[13,8,93],[10,3,62],[14,0,38],[3,10,58],[3,12,46],[3,8,2],[10,16,27],[6,9,90],[14,8,6],[0,13,31],[6,4,65],[14,17,29],[13,17,64],[12,5,26],[12,1,9],[12,15,79],[16,11,79],[16,15,17],[4,0,21],[15,10,75],[3,17,23],[8,5,55],[9,4,19],[0,10,83],[3,7,17],[0,12,31],[11,5,34],[17,14,98],[11,14,85],[16,7,48],[12,6,86],[5,17,72],[4,12,5],[12,10,23],[3,2,31],[12,7,5],[6,13,30],[6,7,88],[2,17,88],[6,8,98],[0,7,69],[10,15,13],[16,14,24],[1,17,24],[13,9,82],[13,6,67],[15,11,72],[12,0,83],[1,4,37],[12,9,36],[9,17,81],[9,15,62],[8,15,71],[10,12,25],[7,6,23],[16,5,76],[7,17,4],[3,11,82],[2,11,71],[8,4,11],[14,10,51],[8,10,51],[4,1,57],[6,16,68],[3,9,100],[1,14,26],[10,7,14],[8,17,24],[1,11,10],[2,9,85],[9,6,49],[11,4,95]],
    7,
    2,
    6
))

