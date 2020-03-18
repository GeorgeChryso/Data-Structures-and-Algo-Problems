


// There are n engineers numbered from 1 to n and two arrays: speed and efficiency, where speed[i] and efficiency[i] represent the speed and efficiency for the i-th engineer respectively. Return the maximum performance of a team composed of at most k engineers, since the answer can be a huge number, return this modulo 10^9 + 7.

// The performance of a team is the sum of their engineers' speeds multiplied by the minimum efficiency among their engineers. 



//TLE 23/53
// Brute force Over all Bitmasks
var maxPerformance = function(n, speed, efficiency, k) {
    let modu=10**9 + 7

    let end=BigInt(2**(speed.length+1)-1)

    let result=-1
    for (let i = 0n; i <end; i++) {
        let mask=i
        let totalMates=0
        let totalSum=0
        let totalMin=Infinity
        let counter=0
        while(mask&&counter<speed.length&&totalMates<=k){
            if(mask&1n){
                totalSum+= speed[counter]
                totalMin=Math.min(totalMin,efficiency[counter])
                totalMates++
            }
            mask>>=1n
            counter++
        }

        if(totalMates>k||totalMin===Infinity)continue

        result=Math.max(result,(totalSum*totalMin) %modu)
    }
    return result
};




// Use a min heap (PQ) over the speed, The PQ will at any given point hold the 
// candidate group of people. 
var maxPerformance = function(n, speed, efficiency, k) {
    //[Speed, Efficiency]Pairs
    let group=[]
    for (let i = 0; i < speed.length; i++) {
        group.push([speed[i],efficiency[i]])
    }
    
    //sort descending efficiency
    // We want to try all the higher efficiency factors first
    group.sort(([s1,e1],[s2,e2])=>e2-e1)

    let pq=new minBinaryHeap()
    //pq based on min speed
    pq.comparator=([s1,e1],[s2,e2])=>s1-s2
    
    let result=0
    let totalSpeed=0

    for (const [curSpeed,curEff] of group) {
        totalSpeed+=curSpeed
        pq.push([curSpeed,curEff])
        while(pq.length() >k){
            let [polledSpeed,polledEff]=pq.poll()  
            totalSpeed-=polledSpeed
        }
        if(pq.length()===k)result=Math.max(result,totalSpeed*pq.heap[0][1])
    }
    return result%(1e9+7)
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


console.log(maxPerformance(
    6,
[2,10,3,1,5,8],
[5,4,3,9,7,2],
2
))