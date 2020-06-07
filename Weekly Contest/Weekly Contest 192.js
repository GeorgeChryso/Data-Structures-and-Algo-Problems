




var shuffle = function(nums, n) {
    let result=[]

    for (let i = 0,j=n; j < nums.length||i<n; i++,j++) {
        result.push(nums[i])        
        result.push(nums[j])        
    }
    return result
};


console.log(shuffle(
    [1,2,3,4,4,3,2,1],4

))

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



var getStrongest = function(arr, k) {
    let n=arr.length
    arr.sort((a,b)=>a-b)
    let median=arr[ Math.floor((n-1)/2)]
    console.log(arr,median)
    arr.sort((a,b)=>
(Math.abs(a-median)===Math.abs(b-median))?b-a:Math.abs(b-median)-Math.abs(a-median)
        )

    // let pq=new minBinaryHeap()

    // pq.comparator=(a,b)=>{
        
    //     if(Math.abs(a-median)===Math.abs(b-median))return b-a
    //     return Math.abs(a-median)-Math.abs(b-median)
    // }

    // for (const ele of arr) {
    //     pq.push(ele)
    //     if(pq.length()>k)pq.poll()
    // }

    return arr.slice(0,k)
};


console.log(
    getStrongest(
 [-7,22,17,3],  2
// [22,17]
    )
)


/**
 * @param {string} homepage
 */
var BrowserHistory = function(homepage) {
    this.history=[]
    this.history.push(homepage)
    this.curr=0
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
    if(this.curr===this.history.length-1)this.history.push(url)
    else{
        this.history.splice(this.curr+1,this.history.length-this.curr-1,url)
    }
    this.curr++
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
    if(this.curr-steps>=0){
        this.curr-=steps
    }
    else{
        this.curr=0
    }
    return this.history[this.curr]
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
    if(this.curr+steps<=this.history.length-1){
        this.curr+=steps
    }
    else{
        this.curr=this.history.length-1
    }
    return this.history[this.curr]
};

/** 
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */



var minCost = function(houses, cost, m, n, target) {
    let available=1
    let zeroes=0
    let last=houses[0]
    for (let i = 1; i < houses.length; i++) {
        if(houses[i]===0){
            zeroes++
        }
        else{
            available+= (houses[i]===last)?0:1
        }
        last=houses[i]

    }

    //dp[i][j] minimum cost needed to paint houses 1 to i into j groups
};