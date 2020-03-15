
var luckyNumbers  = function(A) {
    

    let result=[]


    for (let i = 0; i < A.length; i++) {
        let min=Infinity
        let minIndex=[]
        for (let j = 0; j < A[0].length; j++) {
            if(A[i][j]<min){
                min=A[i][j]
                minIndex=[i,j]
            }
        }
        if(minIndex.length)result.push(minIndex)
    }

    result=result.filter(([k,j])=>{
        let ele=A[k][j]
        for (let i = 0; i < A.length; i++) {
            if(i!==k&&A[i][j]>ele)return false
        }
        return true
    })

    return result.map(([i,j])=>A[i][j])
};

console.log(
    luckyNumbers([[7,8],[1,2]])
)


/**
 * @param {number} maxSize
 */
var CustomStack = function(maxSize) {
    this.stack=[]
    this.maxSize=maxSize
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
    if(this.stack.length+1<=this.maxSize)this.stack.push(x)
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
    if(this.stack.length)return this.stack.pop()
    return -1
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
    
    for (let i = 0; i < Math.min(k,this.stack.length); i++) {
        this.stack[i]+=val        
    }
};

/** 
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */



 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

var balanceBST = function(root) {

    function TreeNode(val) {
        this.val = val;
       this.left = this.right = null;
    }
    let arr=[]

    let q=[root]

    while(q.length){
        let ele=q.shift()
        if(q===null)continue
        arr.push(ele.val)
        if(ele.left)q.push(ele.left)
        if(ele.right)q.push(ele.right)
    }

    arr.sort((a,b)=>a-b)

    let arr2Bst=(start,end)=>{
        if(start>end)return null

        let mid=Math.floor((start+end)/2)

        let midNode=new TreeNode(arr[mid])
        midNode.left=arr2Bst(start,mid-1)
        midNode.right=arr2Bst(mid+1,end)
        return midNode
    }

    let newRoot=arr2Bst(0,arr.length-1)
    return newRoot
};




class maxBinaryHeap{
    constructor(){
        this.heap=[]
        this.comparator=(a,b)=>b-a
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length

    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))>0)){
            //swap the two elements until the Invariant is reached
            [this.heap[index],this.heap[Math.floor((index-1)/2)]]= [this.heap[Math.floor((index-1)/2)],this.heap[index]]
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
       
        while(this.hasLeft(index)&&( this.comparator(this.heap[index],this.getLeftChild(index))<0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))<0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
   
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))>=0){
                    //and swap
                  [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                  index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  [this.heap[index],this.heap[index*2+2]]=[this.getRightChild(index),this.heap[index]]
                  index=index*2+2  
                }
                
            }
        }
    }

    heapify() {
        if (this.length() < 2) return;
        for (let i = 1; i < this.length(); i++) {
          this.bubbleUp(i);
        }
      }
}

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
        console.log(mask.toString(2))
        while(mask&&counter<speed.length){
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

console.log(
    maxPerformance(
        3,
        [2,8,2],
        [2,7,1],
        2
    )
)