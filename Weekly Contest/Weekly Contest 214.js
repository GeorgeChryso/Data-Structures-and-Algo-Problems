// var getMaximumGenerated = function(n) {
//     if(memo[n]!==undefined)
//         return memo[n]
//     if(n==0||n==1)
//         return n
//     if(n%2==1)
//          memo[n]=getMaximumGenerated((n-1)/2)+getMaximumGenerated((n+1)/2)
//     else{
//          memo[n]=getMaximumGenerated(n/2)
//     }
//     return memo[n]
// };
// console.log()



// var minDeletions = function(s) {
//     let freq={}
//     for(let char of s)
//         freq[char]=(freq[char]||0)+1
    
//     let Keys=Object.keys(freq).sort((a,b)=>a-b)
    
//     let fs={}
//     Object.values(freq).forEach(d=>
//         fs[d]=(fs[d]||0)+1

//         )
        
//     let result=0
//     for (let len = s.length; len>=0; len--) {
//         if(fs[len]===undefined||fs[len]==1)
//             continue
//         let [times,count]=[len,fs[len]]

//         while(count>1){
//             let current=times
//             while(fs[current]!=undefined&&current>0){
//                 console.log(current)
//                 result++
//                 current--
//             }
//             if(current!==0)
//                 fs[current]=1
//             count--
//             fs[len]--
//         }
//     }
//     return result
// };  

// console.log(minDeletions("aaabbbcc"))



// class minBinaryHeap{
//     constructor(){
//         this.heap=[]
//         //this is the simplest comparator between a and b and returns 
//         // a positive number if a >b
//         // a negative number if a < b
//         // or 0 when a ===b, 
//         // adjusting this for every situation will allow me to use heaps outside of the 
//         // just numbers context
//         this.comparator=(a,b)=>a-b
//     }

//     hasParent=index=>index>=1
//     getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
//     hasLeft=(index)=>2*index+1<=this.heap.length-1
//     getLeftChild=(index)=>this.heap[2*index+1]
    
//     hasRight=index=>2*index+2<=this.heap.length-1
//     getRightChild=(index)=> this.heap[2*index+2]
    
//     length=()=>this.heap.length

//     peek=()=>this.heap[0]

//     push(element){
//         this.heap.push(element)
//         //this element is pushed on the rightmost node of the lowest level
//         // and needs  to be bubbled up accordingly
//         this.bubbleUp(this.heap.length-1)
//     }

//     bubbleUp(index){
//         //if there is a parent with a bigger priority, switch places with my index
//         while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))<0)){
//             //swap the two elements until the Invariant is reached
//             this.swap(index,Math.floor((index-1)/2))
//             // and update the new index to be its parent's index, since u switched the items
//             index=Math.floor((index-1)/2)
//         }
//     }

//     //get the highest(lowest) priority element
//     poll(){
//         if(this.length()==1)return this.heap.pop()

//         let result=this.heap[0]
//         this.heap[0]=this.heap.pop()
//         this.bubbleDown(0)
//         return result
//     }
    
//     //after every poll, the new item on place 0 needs to be bubbled down to its correct position
//     bubbleDown(index){
//         if(this.length()<=1)return

//         while(this.hasLeft(index)&&(this.comparator(this.heap[index],this.getLeftChild(index))>0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))>0) )){

//             //if there is no right child, swap with the left
//             if(!this.hasRight(index)){
//                 this.swap(index,index*2+1)
//                 index=index*2+1
//             }
//             else{
//                 // if the left child is less than or equal to the right child, choos the left
//                 if(this.comparator(this.getLeftChild(index),this.getRightChild(index))<=0){
//                     //and swap
//                     this.swap(index,index*2+1)
//                     index=index*2+1
//                 }
//                 // else choose the right child
//                 else {
//                     //and swap
//                   this.swap(index,index*2+2)
//                   index=index*2+2

//                 }
                
//             }
//         }
//     }
//     swap=(a,b)=>{
//         if(a===b)return
//         let temp=this.heap[b]
//         this.heap[b]=this.heap[a]
//         this.heap[a]=temp
//     }
// }



var maxProfit = function(A, k) {
    //rangeSum Formula
    let rangesum=(i,j)=>{
        i=BigInt(i),j=BigInt(j)
        return ((j*((j+1n))/2n)-(i*(i+1n)/2n))
    }
    A.unshift(0) //prepend the sentinel 0 
    A.sort((a,b)=>a-b)
    let n=A.length,result=0n,mod=BigInt(1e9+7),i=n-1
    // can use all current levels
    while((k>=(n-i)*(A[i]-A[i-1]))&&i>0){
        if(A[i]!=A[i-1])
            result=(result+(rangesum(A[i-1],A[i])*BigInt(n-i)))%mod,
            k-=(n-i)*(A[i]-A[i-1])
        i--
        console.log(result)
    }
    //can use some of the current levels
    if(k>0&&k>=n-i){
        let levels=Math.floor(k/(n-i)) //the levels i can use 
        result=(result+(BigInt(n-i)*rangesum(A[i]-levels,A[i])))%mod
        k-=levels*(n-i)
        A[i]-=levels
    }
    // can use some of the items OF the first level
    if(k>0&&k<n-i)
        result=(result+BigInt(k)*BigInt(A[i]))%mod
    return Number(result)
};

console.log(
    maxProfit( 
       // [497978859,167261111,483575207,591815159],
        //                                1000000007
       // 836556809 //373219333
        [2,4,6,6,8,12],
        20
        
        )
 
)


let rangesum=(i,j)=>{
    i=BigInt(i),j=BigInt(j)
    return ((j*((j+1n))/2n)-(i*(i+1n)/2n))
}
console.log(rangesum(4,6))


