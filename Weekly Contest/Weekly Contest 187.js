var destCity = function(paths) {
    let result = new Set();
    let got = new Set();
    for (const [a, b] of paths) {
        got.add(a);
        if (result.has(a)) result.delete(a);
        if (!got.has(b)) result.add(b);
    }
    let res = [];
    result.forEach(d => res.push(d));
    return res[0];
};

var kLengthApart = function(nums, k) {
    if (nums.every(d => d == 0)) return true;

    let first = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == 1) {
            first = i;
            break;
        }
    }

    let start = 1;

    for (let i = first + 1; i < nums.length; i++) {
        if (nums[i] == 1) {
            if (start < k) return false;
            start = 0;
        } else start++;
    }

    return true;
};



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

var kthSmallest = function(mat, k) {
    let pq = new minBinaryHeap();

    if(mat.length==1){
        mat[0].forEach(d=>pq.push(d))
        for (let i = 0; i < k; i++) {
            if(pq.length()!==1)pq.poll()            
        }
        return pq.poll()
    }

    let start = mat[0];

    for (let i = 1; i < mat.length; i++) {
        let pq2 = new minBinaryHeap();
        pq2.comparator = (a, b) => b - a;
        for (let j = 0; j < mat[i].length; j++) {
            start.forEach(d => {
                if (pq2.length() < k) pq2.push(d + mat[i][j]);
                else {
                    if (pq2.peek() > d + mat[i][j]) {
                        pq2.poll();
                        pq2.push(d + mat[i][j]);
                    }
                }
            });
        }
        start = pq2.heap;
        if(i==mat.length-1)return pq2.poll()
    }

};
// console.log(
//     kthSmallest(
//         [[14,15,21]],
//         3
//     )
// );
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

var longestSubarray = function(nums, limit){

    if(nums.length==0)return 0
    let result=1

    let minq=new minBinaryHeap()
    let maxq=new minBinaryHeap()
    maxq.comparator=(a,b)=>b-a
    let todel1={}
    let todel2={}
    
    let start=0
    let min=nums[0]
    let max=nums[0]
    for (let end =1; end < nums.length; end++) {
     
        minq.push(nums[end])
        maxq.push(nums[end])
        min=Math.min(nums[i],minq.peek())
        max=Math.max(nums[i],maxq.peek())
    }
    return result
};

console.log(longestSubarray(
    [8,2,4,7],4
))