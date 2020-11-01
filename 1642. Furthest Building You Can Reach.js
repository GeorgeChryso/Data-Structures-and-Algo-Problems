// You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

// You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

// While moving from building i to building i+1 (0-indexed),

// If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
// If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
// Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

// Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
// Output: 4
// Explanation: Starting at building 0, you can follow these steps:
// - Go to building 1 without using ladders nor bricks since 4 >= 2.
// - Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
// - Go to building 3 without using ladders nor bricks since 7 >= 6.
// - Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
// It is impossible to go beyond building 4 because you do not have any more bricks or ladders.





// Intuition:
// Binary search for the answer, if he cant get to k-th city, he surely cant get to k+1th etc
// O (N* logN* logN)
var furthestBuilding = function(heights, bricks, ladders) {
    // First, we can view the array as an array of deltas,
    // differences that I have to pay to get a specific location
    // delta[i]=0 if the previous element is smaller ( I can just jump to this)
    // delta[i]=A[i]-A[i-1] I have to use some bricks/ ladder to get her and pay that diff
    let deltas=heights.map((d,i)=>{
        if(i==0 || (heights[i]<=heights[i-1]))
            return 0
        return heights[i]-heights[i-1]
    })
    //================ Juicy Part ===================\\
    // How can I check if I can get to the k-th building?
    // I will try to use the ladders for my most expensive jumps`
    var isPossible=k=>{
        let current=deltas.slice(0,k+1)
        current.sort((a,b)=>b-a) //sort descending, too check the most expensive 
        // deltas
        let total=current.reduce((a,b)=>a+b,0)
        // remove the ladders highest of them
        for (let i = 0; i < Math.min(ladders,current.length); i++) 
            total-=current[i] 
        // and see if its still possible to get there
        // with just bricks
        return total<=bricks
    }   
    //========= Binary Search for the answer =========\\
    let lo=0, hi=heights.length-1, res=0
    while(lo<=hi){
        let mid=(lo+hi)>>1 
        //checks if I can get to mid-th building
        if(isPossible(mid))
            res=mid,
            lo=mid+1
        else
            hi=mid-1
    }
    return res
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
// Better approach, maybe a use of a priority queue of length k=ladders, holding the 
// k biggest elements so far can indicate whether I can travel up to this  point or not
// I store the total amount of bricks required to get to a point with a simple prefix sum
// then I hold a window on my pq of length ladders, and keep track of the currentsum of that window
// the sum indicates the bricks that can be replaced using ladders
// O(NlogK), where K=available ladders
var furthestBuilding = function(heights, bricks, ladders) {
    let deltas=heights.map((d,i)=>{
        if(i==0 || (heights[i]<=heights[i-1]))
            return 0
        return heights[i]-heights[i-1]
    }),
        n=deltas.length,prefixSum=[0]
    for (let i = 0; i <n; i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+deltas[i])

    let pq=new minBinaryHeap(),currentKsum=0
    // min heap, for storing the k max elements in reverse order
    pq.comparator=(a,b)=>a-b

    for (let i = 0; i <n; i++){
        if(pq.length()<ladders) //maintain a pq of length ladders
            pq.push(deltas[i]),
            currentKsum+=deltas[i]
        else{
            // An element is found that must be placed on the pq
            if(deltas[i]>=pq.peek()) 
                currentKsum-=pq.poll(), //remove the smallest
                currentKsum+=deltas[i], // add the new
                pq.push(deltas[i])

            // Is this impossible? The first impossible location means 
            // that the previous one was the biggest possible. 
            if(prefixSum[i+1]-currentKsum>bricks)
                return i-1  //if yes, then the previous was possible
        }
    }
    return n-1 // I can get to every location
};



console.log(furthestBuilding(
    [4,2,7,6,9,14,12],
    5,
    1
))