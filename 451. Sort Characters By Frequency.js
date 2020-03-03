// Given a string, sort it in decreasing order based on the frequency of characters.



// O(nlog(n))runtime O(n) space
// basic solution simple sort and hashmap implementation, sort them according to their hasmap score
var frequencySort = function(s) {
    // know the frequencies
    let freq={}
    for (let i = 0; i < s.length; i++) {
        freq[s[i]]=(freq[s[i]]||0)+1
    }

    //create the result out of sorted frequency keys
    let result=''
    let f=Object.keys(freq).sort((a,b)=>freq[b]-freq[a])
    f.forEach(d=>{
        for (let i = 0; i < freq[d]; i++)result+=d
    })
    return result
};


//heap implementation
//supposedly O(n), though O(nlogn)
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
    push(value) {
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

var frequencySort = function(s) {
    // instead of the frequencies,create the end strings
    let freq={}
    for (let i = 0; i < s.length; i++) {
        freq[s[i]]=(freq[s[i]]||'')+s[i]
    }

    let heap=new MaxHeap()
    //but compare them according to their frequencies
    heap.comparator=(s1,s2)=>freq[s2].length-freq[s1].length

    heap.data= [...Object.keys(freq)]
    heap.heapify(heap.data.length-1)
    //create the result out of sorted frequency keys
    //Object.keys(freq).forEach(d=>heap.push(d))

    let result=''
    while(heap.size()){
       result+=freq[heap.poll()]
    }
    
    return result
};



//bucketsort logic, supposedly O(n)
var frequencySort = function(s) {
    // instead of the frequencies,create the end strings
    let freq={}
    //O(n)
    for (let i = 0; i < s.length; i++) {
        freq[s[i]]=(freq[s[i]]||0)+1
    }

    // this bucket will hold the result built strings of frequency i,
    // so arr[2] can be 'aabbccdd' and so on 
    //O(n), a bucket of strings that will be concatenated into the final answer
    let buckets=[...Array(s.length+1)].map(d=>'')

    //O(keys*their freq)=O(n)
    for (const key in freq) {
        for (let i = 0; i <freq[key]; i++) {
            buckets[freq[key]]+=key
        }
    }
    // O(n)
    return buckets.reduce((acc,curr)=>curr+acc,'')
};

console.log(
    frequencySort(
        "loveleetcode"
    )
)