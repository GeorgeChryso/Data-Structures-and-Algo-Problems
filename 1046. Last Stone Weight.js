
// We have a collection of rocks, each rock has a positive integer weight.

// Each turn, we choose the two heaviest rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

// If x == y, both stones are totally destroyed;
// If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
// At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

 
//inefficient cos of splice
var lastStoneWeight = function(A) {
    while(A.length>1){
        A.sort((a,b)=>a-b)
        let len=A.length    
        if( A[len-2]==A[len-1]){
            A.splice(len-2,2)
            
        }
        else{
            A[len-1]=A[len-1]-A[len-2]
            A.splice(len-2,1)
        }
    }
    return A[0]==undefined?0:A[0]
};


//intuition: I will implement a max heap and keep track of the max elements at the time
class maxBinaryHeap{
    constructor(){
        this.heap=[]
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
        while(this.hasParent(index)&&(this.heap[index]>this.getParent(index))){
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
        console.log('`ddsds')
        while(this.hasLeft(index)&&(this.heap[index]<this.getLeftChild(index)||(this.hasRight(index)&&this.heap[index]<this.getRightChild(index)) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
                if(this.getLeftChild(index)>=this.getRightChild(index)){
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
}

var lastStoneWeight=A=>{
    let hp=new maxBinaryHeap()
    hp.heap=A.sort((a,b)=>b-a)
    while(hp.length()>1){
        let smashing=Math.abs(hp.poll()-hp.poll())
        if(smashing)hp.push(smashing)

    }

    return hp.length()?hp.poll():0
}






// var lastStoneWeight = function (stones) {
//     stones.sort((a, b) => a - b);
//     while (stones.length > 1) {
//         let a = stones.pop();
//         let b = stones.pop();
//         let diff = a > b ? a - b : b - a;
//         if (stones.length === 0) {
//             stones.unshift(diff);
//         } else if (diff > 0) {
//             let i = 0;
//             for (; i < stones.length; i++) {
//                 if (stones[i] > diff) {
//                     stones.splice(i, 0, diff)
//                     break;
//                 }
//             }
//             if (i >= stones.length) {
//                 stones.push(diff);
//             }
//         }
//     }
//     return stones[0];
// };

console.log(lastStoneWeight(
   
    [1,3]
        ))