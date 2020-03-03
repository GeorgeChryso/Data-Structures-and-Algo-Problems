// We have a list of points on the plane.  Find the K closest points to the origin (0, 0).

// (Here, the distance between two points on a plane is the Euclidean distance.)

// You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)

 


class MaxHeap {
    constructor(data = []) {
      this.data = data;
      this.comparator = (a, b) => b - a;
      this.heapify();
    }
  
    // O(nlog(n)). In fact, O(n)
    heapify() {
      if (this.size() < 2) return;
      for (let i = 1; i < this.size(); i++) {
        this.bubbleUp(i);
      }
    }
  
    // O(1)
    peek() {
      if (this.size() === 0) return null;
      return this.data[0];
    }
  
    // O(log(n))
    offer(value) {
      this.data.push(value);
      this.bubbleUp(this.size() - 1);
    }
  
    // O(log(n))
    poll() {
      if (this.size() === 0) return null;
      const result = this.data[0];
      const last = this.data.pop();
      if (this.size() !== 0) {
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
      const lastIndex = this.size() - 1;
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
    size() {
      return this.data.length;
    }
  }


//intuition, using a maxHeap to keep a track of the biggest distance 
// should be O(n)
var kClosest = function(points, K) {
   let heap=new MaxHeap() 
   //change the comparator of my heap, the priority function
   heap.comparator=function(i,j){
       return distfrom0(j)-distfrom0(i)
   }

   let distfrom0=(x)=>Math.sqrt(points[x][0]**2+points[x][1]**2)   

   for (let i = 0; i <=K-1; i++) {
        heap.offer(i)
   }

   for (let i = K; i < points.length; i++) {
     if(distfrom0(i)<distfrom0(heap.peek())){
        heap.offer(i)
        heap.poll()  
     }       
   }

   return heap.data.map((d=>points[d]))
};


//O(nlogn) just sort them according to increasing distance and slice em
var kClosest=(points,K)=>{
    points.sort(([x1,y1],[x2,y2])=>Math.sqrt(x1**2+y1**2)- Math.sqrt(x2**2+y2**2)  )
    return points.slice(0,K)
}
console.log(kClosest(
    [[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[1,1]],
    1
))