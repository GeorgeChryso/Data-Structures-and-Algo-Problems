
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let currentline = 0;
function readline(){
    return input[currentline++];
}

//boilerplate ends here
// Test it with node ./name.js < input.txt

let n=Number(readline()) //1st line is usually the number of testcases
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
let solve=(A,n,m)=>{

    let pq=new MaxHeap()
    pq.comparator=(([x1,y1],[x2,y2])=>A[x2][y2]-A[x1][y1])
    for(let i=0;i<n;i++)
        for(let j=0;j<m;j++)
            pq.push([i,j])
    let result=0
    let dir=[[0,1],[0,-1],[-1,0],[1,0]]
    while(pq.length()){
        let [i,j]=pq.poll()
        for(let [dx,dy] of dir){
            let nx=dx+i,ny=dy+j
            if(nx>=0&&nx<n&&ny>=0&&ny<m&&A[i][j]>1+A[nx][ny] ){
                result+=A[i][j]-1-A[nx][ny]
                A[nx][ny]=A[i][j]-1
                pq.push([nx,ny])
            }
        }

    }
    return result

}
for (let i = 0; i <n; i++) { //for each testcase
    // input  logic
    let [N,M]=readline().split(' ').map(d=>Number(d))
    let A=[]
    for(let i=0;i<N;i++)
        A.push(readline().split(' ').map(d=>Number(d)))
    ////////////////////
    // solve
    
    let result=solve(A,N,M)
    //output logic
    console.log('Case #'+(i+1).toString()+': '+result.toString())
}
