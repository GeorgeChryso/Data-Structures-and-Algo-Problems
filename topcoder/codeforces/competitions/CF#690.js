process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline())
    for (let i = 0; i < t; i++) {
        let n=Number(readline())
        let A=readline().split(' ').map(d=>Number(d))
        console.log(solve(A,n)+'')
    }
    
});
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

let solve=(A,n)=>{
    
    let pq=new minBinaryHeap()
    pq.comparator=( (a,b)=> a[0]-b[0]),maxSeen=-1
    //val,idx,l,r
    let L=[...Array(n)].map((d,i)=>i-1)
    let R=[...Array(n)].map((d,i)=>i+1)

    for (let i = 0; i < n; i++) {
        pq.push([A[i],i])     ,
        maxSeen=Math.max(maxSeen,A[i])
    }
    let steps=0
    while(pq.length()){
        let [cval,cidx]=pq.poll()
        let [l,r]=[L[cidx],R[cidx]]
        if(cval!==A[cidx])
            continue
        if(cval==maxSeen)
            break
        if(l>=0&&r<n){
            if(A[l]<=A[r]){
                A[l]+=cval
                maxSeen=Math.max(maxSeen,A[l])
                pq.push([A[l],l])
                A[cidx]=Infinity
                R[l]=r
                L[r]=l
            }
            else{
                A[r]+=cval
                maxSeen=Math.max(maxSeen,A[r])
                A[cidx]=Infinity
                pq.push([A[r],r])
                R[l]=r
                L[r]=l
            }

        }
        else if( l>=0){
            A[l]+=cval
            maxSeen=Math.max(maxSeen,A[l])
            pq.push([A[l],l])
            A[cidx]=Infinity
            R[l]=r
        }
        else if(r<n){
            A[r]+=cval
            maxSeen=Math.max(maxSeen,A[r])
            A[cidx]=Infinity
            pq.push([A[r],r])
            L[r]=l
        }
        else break
        steps++
    }

    return steps
}   