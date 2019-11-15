// Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.

// You need to find the shortest such subarray and output its length.

// Sorting O(nlogn)
var findUnsortedSubarray=A=>{

    //copy the array A without creating a reference
    var sorted=[...A].sort((a,b)=>a-b)

    let firstDiff=-1 //-1 
    let lastDiff=-2 // and 2 here so my end result always give me 0 when sorted==A
    for (let i = 0; i < A.length; i++) {
            
        if(A[i]!=sorted[i]){
            //the first different element will be the start Index
            if(firstDiff==-1){
                firstDiff=i
            }
            

            // the last different will give me the end index of my subarray
            lastDiff=i

        }
    }

    return lastDiff-firstDiff+1


}

var findUnsortedSubarray = function(A) {
  class dequeue {
    constructor() {
      this.dq = [];
      this.len = this.dq.length;
      this.start=-1
      this.end=-2
    }

    pushy(x, i) {
      //  let old=new Number(this.dq.length)

      while (this.dq.length && x <= this.dq[this.dq.length - 1]) {
        if (this.cors[0] == -1) {
          this.cors[0] = i - 1;
        }
        this.dq.pop();

        this.cors[1] = i;
      }
      this.dq.push(x);
    }
  }

  var deq1 = new dequeue();

  for (let i = 0; i < A.length; i++) {
    deq1.pushy(A[i], i);
  }
  console.log(deq1.cors);

  return deq1.end-deq1.start+1
};

// Two pass O(n) solution
var findUnsortedSubarray = function(A) {
  var start = -1;
  var end = -2;
  min = A[A.length - 1];
  max = A[0];
    
  //The last seen element which is SMALLER than my MAX SEEN SO FAR
  // will be the end index of my subarray
  for (let i = 1; i < A.length; i++) {
    max = Math.max(max, A[i]); // this is the max  SO FAR
    if (A[i] < max) {
      end = i;
    }
  }

  //the FIRST element, BIGGER than my MIN sofar, traversing backwards,
  // will be the start of my array
  for (let i = A.length - 1; i >= 0; i--) {
    min = Math.min(min, A[i]); // This is the MIN of the subarray from i to A.length-1
    if (A[i] > min) {
      start = i; 
    }
  }

  return end - start + 1;
};

console.log(
  findUnsortedSubarray(
    [2, 6, 4, 8, 10, 9, 15]
    // [1, 2, 3, 3, 3]
    //[1,3,2,2,2]
    //[1,2,3,4]
  )
);
