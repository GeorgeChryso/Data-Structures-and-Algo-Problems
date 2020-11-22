'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readline() {
    return inputString[currentLine++];
}
// Note there's no need to do it for every test case like kickstart
// tests: $ cat input.txt | node "c:\....name.js"
function main() {

    let solve=(A)=>{
        let y=([M,C],x)=> M*x+C
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let n=A.length,prefixSum=[0],totalChar=A.reduce((a,c,i)=>a+c*(i+1),0)
    for (let i = 0; i < n; i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])

    let result=totalChar

    let pq=new minBinaryHeap
    pq.comparator=(a,b)=>a[0]-b[0]
    let Q=[ ] 
    for (let i = 0; i <=n ; i++){
        while(Q.length>=2&&y(Q[0],i)<=y(Q[1],i))
            Q.shift()
        if(Q.length)
            result=Math.max(y(Q[0],i)-prefixSum[i]+totalChar,result)
        let newLine=[A[i],-A[i]*(i+1)+prefixSum[i+1]]
        while(Q.length>=2&&
            Intersection(Q[Q.length-2],newLine).x<=Intersection(Q[Q.length-2],Q[Q.length-1]).x
            )
            Q.pop()
        Q.push(newLine)
        Q.sort((a,b)=>a[0]-b[0])
    }
    Q=[ ] 
    for (let i = n-1; i >=0 ; i--){
        while(Q.length>=2&&y(Q[0],i)<=y(Q[1],i))
            Q.shift()
        if(Q.length)
            // for(let cc of Q)
            // result=Math.max(y(cc,i)-prefixSum[i]+totalChar,result)
            result=Math.max(y(Q[0],i)-prefixSum[i]+totalChar,result)
        let newLine=[A[i],-A[i]*(i+1)+prefixSum[i+1]]
        while(Q.length>=2&&
            Intersection(Q[Q.length-2],newLine).x<=Intersection(Q[Q.length-2],Q[Q.length-1]).x
        )
            Q.pop()
        Q.push(newLine)
        Q.sort((a,b)=>a[0]-b[0])
    } 
    return result
    }

    let n=readline() //reads just the n for a simple test case
    let A=readline().split(' ').map(d=>Number(d))
    let result=solve(A) //solves a simple test case
    console.log(result.toString())

}

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