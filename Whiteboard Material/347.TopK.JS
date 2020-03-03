


//just sort, O(nlogn)
var topKFrequent = function(nums, k) {
    var memo={}
    nums.forEach(d=>memo[d]=(memo[d]||0)+1)
    return Object.keys(memo).sort((a,b)=>memo[b]-memo[a]).slice(0,k)
};

//heap implementation O(nlogn)
var topKFrequent = function(nums, k) {
    var memo={}
    nums.forEach(d=>memo[d]=(memo[d]||0)+1)

    let heap=new maxBinaryHeap()
    heap.comparator=(a,b)=>memo[a]-memo[b]

    for (const key in memo) {
        heap.push(key)
    }

    let result=[]
    while(result.length!==k){
        result.push(Number(heap.poll()))
    }
    return result

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
        while(
            this.hasParent(index)&&
            (this.comparator(this.heap[index],this.getParent(index))>0)
            ){
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


//bucketsort O(n)
var topKFrequent = function(nums, k) {
    var memo={}
    nums.forEach(d=>memo[d]=(memo[d]||0)+1)

    //nums.length+1 bucket for each possible frequency that holds the element with that frequency
    let bucket=[...Array(nums.length+1)].map(d=>[])
    for (const key in memo) {
        bucket[memo[key]].push(Number(key))
    }

    let result=[]
    while(result.length!==k){
        result=result.concat(bucket.pop())
    }
    return result
};

console.log(topKFrequent(
    [6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0],
6
))



//heapsort
function swap(data, i, j){
    let temp = data[i]
    data[i] = data[j]
    data[j] = temp
    
}

function heapAjust(data, i, end) {
    var child = 2*i + 1;
    while(child <= end) {
        if(child + 1 <= end && data[child][1] < data[child + 1][1]) {
            child = child + 1;
        }
        if(data[i][1] < data[child][1]) {
            swap(data, i, child)
            i = child
            child = 2*i + 1
        }else {
            break
        }
    }
}

function heapSort(data, k) {

    var len = data.length;

    for(var i=Math.floor(len/2); i>=0; i--) {
        heapAjust(data, i, len-1);
    }
    
    swap(data, len-1, 0);
    var i=len-2;
    for(; i>=0; i--) {
        heapAjust(data, 0, i);
        swap(data, i, 0);
    }
    return data;
}

function topKFrequent (nums, k) {
    var map = new Map()
    nums.forEach(i => {
        if (map.get(i)) {
            map.set(i, map.get(i)+1)
        } else {
            map.set(i, 1)
        }
    })


   if (k >= nums.length) {
         k = nums.length
    }
   let res = heapSort([...map], k)
   return res.splice(res.length-k).map(i => i[0]).reverse()
}
