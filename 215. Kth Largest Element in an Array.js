// Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

//sort solution O(NlogN)
var findKthLargest=(A,K)=>A.sort((a,b)=>b-a)[k-1]


//minheap solution O(NlogK)
var findKthLargest = function(nums, k) {
    
    let pq=new minBinaryHeap()

    //maintain length k 
    for (const x of nums) {
        pq.push(x)    
        if(pq.length()>k)pq.poll()
    }

    //poll the excess
    while(pq.length>1){
        pq.poll()
    }
    
    return pq.poll()
};
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


// Trivial QUICKSELCT O(N)

// Intuition: Quicksort results in a sorted array from lowest to highest
// This is the code for quicksort
let main=(arr)=>{

    let QuickSort=(low,high)=>{
        if(low<high){
          let indexOfPivot=partition(low,high) 
          QuickSort( low, indexOfPivot-1)
          QuickSort( indexOfPivot+1,high)
        }
    }

    let partition=(l,h)=>{
        let pivot=arr[h] 

        let i=l 
        for (let j = l; j < h; j++) {
            if(arr[j]<pivot){
              [arr[i],arr[j]]=[arr[j],arr[i]] 
              i++
            }        
        }
        [arr[i],arr[h]]=[arr[h],arr[i]]
        return i
    } 
    QuickSort(0,arr.length-1)
    return arr
}

// Each time I call partition(low,high) I get an index of my NEW PIVOT point as the result,That index is the  index
// of the element considered as a pivot at the time after the rearrangement occurs. This index, is the FINAL INDEX that element will have when the array is sorted. 
// So, if this function, ever returns K, that will be the K-TH smallest element. MIC DROP. 
// Now, I can Either return the nums.length-k-th smallest element, ( the k-th largest)
// or follow a same logic only  SELECTIVELY executing the  part of the D&C  approach that suits me
var findKthLargest = function(arr, k) {
    let partition=(l,h)=>{
        let pivot=arr[h]  // notice that i consider the pivot as the last element
        let i=l 
        for (let j = l; j < h; j++) {
            if(arr[j]<pivot){
              [arr[i],arr[j]]=[arr[j],arr[i]] 
              i++
            }        
        }
        [arr[i],arr[h]]=[arr[h],arr[i]]
        return i
    } 

    k=arr.length-k // Im instead trying to find th arr.length-k smallest
    let low=0
    let high=arr.length-1
    while(low<high){
        let indexOfPivot=partition(low,high) 
        if(indexOfPivot<k)low=indexOfPivot+1
        else if(indexOfPivot>k)high=indexOfPivot-1
        else break //case k
    }
    return arr[k]
};


// The previus has a worst case of O(n**2)
//So how can we improve the above solution and make it O(N) guaranteed? The answer is quite simple, we can randomize the input, so that even when the worst case input would be provided the algorithm wouldn't be affected. So all what it is needed to be done is to shuffle the input.
// RSELECT

var findKthLargest = function(arr, k) {
    let shuffle=(arr)=>{
        for (let i = 0; i < arr.length; i++) {
            var r=Math.floor(Math.random() * (i+1)); //this boi here does the trick, randomizes the input
            // and therefore betters my chances of running at O(N)
            [arr[i],arr[r]]=[arr[r],arr[i]]        
        }
        return arr
    }
    arr=shuffle(arr)

    let partition=(l,h)=>{
        let pivot=arr[h]  // notice that i consider the pivot as the last element
        let i=l 
        for (let j = l; j < h; j++) {
            if(arr[j]<pivot){
              [arr[i],arr[j]]=[arr[j],arr[i]] 
              i++
            }        
        }
        [arr[i],arr[h]]=[arr[h],arr[i]]
        return i
    } 

    k=arr.length-k  // Im instead trying to find th arr.length-k smallest
    let low=0
    let high=arr.length-1
    while(low<high){
        let indexOfPivot=partition(low,high) 
        if(indexOfPivot<k)low=indexOfPivot+1
        else if(indexOfPivot>k)high=indexOfPivot-1
        else break //case k
    }
    return arr[k]
};

//BLUN-FLOYED-PRATT-RIVEST-TARJAN -GUARANTEED O(N)
// DETERMINISTIC SELECT

// Normally the algorithm finds the kth smallest element of an array,
// but it can be modified to find the median if k=|_n/2_|
// Essentially like Quick Select but always selecting the median as the pivot

// 1. Group the array into  groups of 5 elements and find the median of each group through sorting. Takes O(n) cos the groups are too small
// 2. Recursively find the true median of the medians, call it p
// 3. Use p as a pivot to split the array into 2 subarrays, Less and Greater
// 4. recurse on the wanted subarray


var findKthLargest = function(arr, k) {
   
    k=arr.length-k  // Im instead trying to find th arr.length-k-th smallest element


    let select=(A,k)=>{


        if(A.length<10){
            A.sort((a,b)=>a-b)
            return A[k]
        }

        let subsets=[]
        let group=[]
        for (var i = 0; i < A.length; i++) {
            if(group.length==5){ 
                subsets.push(group)
                group=[]
            }
            group.push(A[i])
        }
        subsets[subsets.length-1]=subsets[subsets.length-1].concat(group)
        
        let mediansOfSubsets=[]
        for (const subset of subsets) {
            mediansOfSubsets.push(select(subset,3)) //guaranteed to hit the first if Clause
        }

        let M=select(mediansOfSubsets,Math.ceil(mediansOfSubsets.length/2))
    
        
        //partition around Pivot M
        let L1=[],L2=[],L3=[]
        let pivot=M 
        for (let j = 0; j < A.length; j++) {
            if(A[j]<pivot) L1.push(A[j])
            else if( A[j]==pivot)L2.push(pivot)
            else L3.push(A[j])
        }

        if (k <=L1.length)return select(L1,k)
        else if (k > L1.length+L2.length)return select(L3,k-L1.length-L2.length)
        else return M //k===L1.length+1
    }


    return select(arr,k)
};


console.log(findKthLargest(
    [3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6],20
    //[3,2,3,1,2,4,5,5,6],4
    //[3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6],2
    ))