// Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements from the stream. For each call to the method KthLargest.add, return the element representing the kth largest element in the stream.

// Example:

// int k = 3;
// int[] arr = [4,5,8,2];
// KthLargest kthLargest = new KthLargest(3, arr);
// kthLargest.add(3);   // returns 4
// kthLargest.add(5);   // returns 5
// kthLargest.add(10);  // returns 5
// kthLargest.add(9);   // returns 8
// kthLargest.add(4);   // returns 8
// Note:
// You may assume that nums' length ≥ k-1 and k ≥ 1.




class BinaryHeap{
    constructor(){
        this.heap=[]
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    peek=()=>this.heap[0]

    push(element){
        this.heap.push(element)
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        while(this.hasParent(index)&&(this.heap[index]<this.getParent(index))){
            //swap the two elements until the Invariant is reached
            [this.heap[index],this.heap[Math.floor((index-1)/2)]]= [this.heap[Math.floor((index-1)/2)],this.heap[index]]
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }

    bubbleDown(index){
        while(this.hasLeft(index)&&(this.heap[index]>this.getLeftChild(index)||(this.hasRight(index)&&this.heap[index]>this.getRightChild(index)) )){

            if(!this.hasRight(index)){
                [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                index=index*2+1
            }
            else{

                if(this.getLeftChild(index)<=this.getRightChild(index)){
                  [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                  index=index*2+1
                }
                else {
                  [this.heap[index],this.heap[index*2+2]]=[this.getRightChild(index),this.heap[index]]
                  index=index*2+2  
                }
                
            }
        }
    }
}



var KthLargest = function(k, nums) {
    this.k=k
    this.hp=new BinaryHeap()
    nums.forEach(d=>this.hp.push(d))

    while(this.hp.heap.length>k)this.hp.poll()
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    
    if(this.hp.heap.length<this.k){
        this.hp.push(val)
        return this.hp.peek()
    }
    else{
        if(val<this.hp.peek())return this.hp.peek()
        this.hp.push(val)
        this.hp.poll()
        return this.hp.peek()
    }

};
