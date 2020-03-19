// There are N workers.  The i-th worker has a quality[i] and a minimum wage expectation wage[i].

// Now we want to hire exactly K workers to form a paid group.  When hiring a group of K workers, we must pay them according to the following rules:

// Every worker in the paid group should be paid in the ratio of their quality compared to other workers in the paid group.
// Every worker in the paid group must be paid at least their minimum wage expectation.
// Return the least amount of money needed to form a paid group satisfying the above conditions.



// Example 1:

// Input: quality = [10,20,5], wage = [70,50,30], K = 2
// Output: 105.00000
// Explanation: We pay 70 to 0-th worker and 35 to 2-th worker.
// Example 2:

// Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], K = 3
// Output: 30.66667
// Explanation: We pay 4 to 0-th worker, 13.33333 to 2-th and 3-th workers seperately. 

var mincostToHireWorkers = function(quality, wage, K) {
    
    let ratios=[]

    for (let i = 0; i < quality.length; i++) {
        ratios.push( [quality[i],wage[i],wage[i]/quality[i]] )        
    }
    //sort ascending ratios 
    // I will keep feeding entries to my pq
    ratios.sort((a,b)=>a[2]-b[2])   
    console.log(ratios)

    //max pq for removing the highest quality employee
    // because the highest quality will yield the highest paid value
    // when I multiply it by the desired ratio.
    let pq=new minBinaryHeap()

    pq.comparator=(a,b)=>b[0]-a[0]


    let result=Infinity;
    let totalQsum=0
    for (const [q,w,r] of ratios) {
        pq.push([q,w,r])
        totalQsum+=q

        if(pq.length()>K)totalQsum-=pq.poll()[0] //remove the element along with its quality
        // the BEST ratio is the one of the element im pushing into the q
        // because I already sorted ratios ascending
        if(pq.length()===K)result=Math.min(result,totalQsum*r)
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



// FAQ:
// Question: "However, it is possible that current worker has the highest quality, so you removed his quality in the last step, which leads to the problem that you are "using his ratio without him".
// Answer: It doesn't matter. The same group will be calculated earlier with smaller ratio.
// And it doesn't obey my logic here: For a given ratio of wage/quality, find minimum total wage of K workers.


console.log(mincostToHireWorkers(
    [10,20,5],
[70,50,30],
2
))