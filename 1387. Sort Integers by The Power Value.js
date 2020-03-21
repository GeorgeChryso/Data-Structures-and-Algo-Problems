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
  
  
console.log(
    getKth(
        12,15,2
      //  7,11,4
    )
)