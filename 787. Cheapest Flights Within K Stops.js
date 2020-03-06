// There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w.

// Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.







// //failed dijkstras because it's the classic implementationm where only the best local option is considered




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
        console.log(this.heap[a],this.heap[b])
    }
}




//Intuition, normal dijkstra will not cut it here, because There may be path with lesser cost, but with more previous stops. Instead of getting the most optimal local solution, i will push every possible path's cost  to a priority queue considering the previous stops. 
var findCheapestPrice = function(n, flights, src, Target, maxStops) {
      //source: [distances[i]]
      let conMatrix=[...Array(n)].map(d=>Array(n).fill(Infinity))
      for (const [source,tar,cost] of flights) {
          conMatrix[source][tar]=cost
      }
  
      let settled=new Set()//this will prevent me from expanding previously expanded nodes

      let priorityQueue=new minBinaryHeap()
      priorityQueue.comparator=(a,b)=>a[0]-b[0]
      //nodes are like [costTillDestination,destination,previousStops]
      priorityQueue.push([0,src,-1]) // previousStops==-1 cos every node connected with my src is considered previousStops==0
    
  
      while(priorityQueue.heap.length){
          let [price,city,stops]=priorityQueue.poll()
          //you are guaranteed a correct result here because it will be the highest cost with a valid stops nubmer
          if(Number(city)==Target)return price
          settled.add(city)
          //this guarantees that the elements i will push to my pQ will be within the given previousstops range
          if(stops<maxStops){
              for (const next in conMatrix[city]) {

                  if(conMatrix[Number(city)][next]===Infinity||settled.has(next))continue
                  let cost=conMatrix[Number(city)][next]
                  priorityQueue.push([price+cost,next,stops+1])
              }
          }
      }
  
      return -1

};



// //simple BFS TLE
var findCheapestPrice = function(n, flights, src, Target, maxStops) {

  //source: [distances[i]]
  let adjMatrix=[...Array(n)].map(d=>Array(n).fill(Infinity))
  for (const [source,tar,cost] of flights) {
    adjMatrix[source][tar]=cost
  }



  //nodes are like [costTillDestination,destination,previousStops]
  let q=[[0,src,maxStops+1]]

  let result=Infinity
  
  while(q.length){
      let [price,city,stops]=q.shift()
      //you are guaranteed a correct result here because it will be the lowest cost with a valid stops nubmer
      if(Number(city)==Target){
          result=Math.min(result,price)
          continue
      }

      //this guarantees that the elements i will push to my q will be within the given previousstops range
      if(stops>0){
          for (const next in adjMatrix[city]) {
              if(adjMatrix[Number(city)][next]===Infinity)continue
              let cost=adjMatrix[Number(city)][next]
              q.push([price+cost,next,stops-1])
          }
      }
  }

  return result===Infinity?-1:result

};

console.log(findCheapestPrice(
    3,
    [[0,1,100],[1,2,100],[0,2,500]],
    0,
    2,
    1
))

