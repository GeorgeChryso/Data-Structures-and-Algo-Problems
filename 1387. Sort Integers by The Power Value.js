//just sort
var getKth = function(lo, hi, k) {
    
    let steps=(x)=>{
        let result=0
        while(x!=1){
            x=x%2?3*x+1:x/2
            result++
        }
        return result
    }

    let q=[]
    for (let i = lo; i < hi+1; i++) {
        q.push([i,steps(i)])        
    }
    let comparator=(a,b)=>a[1]==b[1]?a[0]-b[0]:a[1]-b[1]
    q.sort(comparator)

    return q[k-1][0]
};


//maxheap
var getKth = function(lo, hi, k) {
    
    let steps=(x)=>{
        let result=0
        while(x!=1){
            x=x%2?3*x+1:x/2
            result++
        }
        return result
    }

    let pq= new MaxHeap()
    pq.comparator=(a,b)=>a[1]==b[1]?b[0]-a[0]:b[1]-a[1]

    for (let i = lo; i < hi+1; i++) {
        pq.push([i,steps(i)])        
        if(pq.length()>k)pq.poll()
    }

    return pq.poll()[0]
};

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
  

//QUICK SELECT 
var getKth = function(lo, hi, k) {
    if(lo===hi)return lo

    let steps=(x)=>{
        let result=0
        while(x!=1){
            x=x%2?3*x+1:x/2
            result++
        }
        return result
    }

    let pq= []

    for (let i = lo; i < hi+1; i++) {
        pq.push([i,steps(i)])        
    }

    let comparator=(a,b)=>{
        return a[1]===b[1]?a[0]-b[0]:a[1]-b[1]
    }

    var Qselect=(Arr,k)=>{
    
        let partition=(l,h)=>{
            let pivot=Arr[h]  // notice that i consider the pivot as the last element
            let i=l 
            for (let j = l; j < h; j++) {
                if( comparator(Arr[j],pivot)<0){
                  [Arr[i],Arr[j]]=[Arr[j],Arr[i]] 
                  i++
                }        
            }
            [Arr[i],Arr[h]]=[Arr[h],Arr[i]]
            return i
        } 
    
        let low=0
        let high=pq.length-1
        while(low<high){
            let indexOfPivot=partition(low,high) 
            if(indexOfPivot<k)low=indexOfPivot+1
            else if(indexOfPivot>k)high=indexOfPivot-1
            else break //case k
        }
        return Arr[k]
    
    }

    return Qselect(pq,k-1)[0]
};


// Deterministic Select
var getKth = function(lo, hi, k) {
    if(lo===hi)return lo

    
    let steps=(x)=>{
        let result=0
        while(x!=1){
            x=x%2?3*x+1:x/2
            result++
        }
        return result
    }

    let pq= []

    for (let i = lo; i < hi+1; i++) {
        pq.push([i,steps(i)])        
    }
    console.log(pq.sort(comparator))
    return Dselect(pq,k-1)[0]
};
let comparator=(a,b)=>{
    return a[1]===b[1]?a[0]-b[0]:a[1]-b[1]
}

let Dselect=(A,k)=>{


    if(A.length<=10){
        console.log(A,A[k],A.length,k)

        if(A.length==1)return [...A[0]]
        A.sort(comparator)
        return [...A[k]]
    }
  
    let subsets=[]
    let group=[]
 
    for (const ele of A) {
        if(group.length==5){ 
            subsets.push(group)
            group=[]
        }
        group.push(ele)
    }
        

    subsets[subsets.length-1]=subsets[subsets.length-1].concat(group)   

    
    let mediansOfSubsets=[]
    for (const subset of subsets) {
        mediansOfSubsets.push(Dselect(subset,Math.ceil(subset.length/2))) 
    }
    let M= Dselect(mediansOfSubsets,Math.ceil(mediansOfSubsets.length/2))
    
    //partition around Pivot M
    let L1=[],L2=[],L3=[]
    let pivot=M 
    while(A.length){
        let ele=A.shift()
        if(comparator(ele,pivot)<0) L1.push(ele)
        else if( comparator(ele,pivot)==0)L2.push(ele)
        else L3.push(ele)
    }
  
    if (k <=L1.length)return Dselect(L1,k)
    else if (k> L1.length+L2.length)return Dselect(L3,k-L1.length-L2.length)
    else return [...L2[0]] //k===L1.length+1
  }
  







  
console.log(
    getKth(
       // 1,43,40
        1,1000, 777
       // 7,11,4
     //7,11,4
    )
)