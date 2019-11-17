// Return the length of the shortest, non-empty, contiguous subarray of A with sum at least K.

// If there is no non-empty subarray with sum at least K, return -1.

// Would work with only positives
var shortestSubarray = (A, K) => {
  var currBestLength = Infinity;
  var currSum = 0;
  var start = 0;

  for (let end = 0; end < A.length; end++) {
    currSum += A[end];

    while (currSum >= K) {
      console.log(start, end);
      currBestLength = Math.min(currBestLength, end - start + 1);
      currSum -= A[start];
      start++;
    }
  }

  return currBestLength == Infinity ? -1 : currBestLength;
};

// DEQUEUE  O(N) time and space godLee
var shortestSubarray = (A, K) => {
  if(A.length==1 && A[0]>=K)return 1
  var PrefixSum = [0];
  var currSum = 0;
  var currBestLength = A.length+1;

  for (var val of A) {
    currSum += val;
    PrefixSum.push(currSum);
  }



  class dequeue {
    constructor() {
      //holds the indices of increasing P[i]
      this.q = [];
    }

    push = x => {
      //mystery
      while (this.q.length && PrefixSum[x] - PrefixSum[this.q[0]] >= K) {
        //pop the smallest index (first)
        let smallest = this.q.shift()
        //update the result
        currBestLength = Math.min(currBestLength, x - smallest);
      }

      //keeps the dq increasing
      //handles negative numbers
      while (this.q.length && PrefixSum[x]<=PrefixSum[this.q[this.q.length-1]]) {
        this.q.pop();
      }
      this.q.push(x);
    };
  }

  var dq = new dequeue();

  //push every index in the dequeue
  for (let i = 0; i < A.length+1; i++) {
    dq.push(i);
  }

  return currBestLength<=A.length?currBestLength:-1;
};



//dequeue without class
var shortestSubarray = function(A, K) {
  let n = A.length;
  let min = n+1;
  let B = new Array(n+1).fill(0);
  for(let i=0; i<n; i++) B[i+1] = B[i] + A[i];
  console.log(B)
  let stack = [];
  for(let i=0; i<n+1; i++){
      while(stack.length > 0 && B[i]-B[stack[0]] >= K){
          min = Math.min(min, i-stack[0]);
          stack.shift();
      }
      while(stack.length > 0 && B[i] <= B[stack[stack.length-1]]){
          stack.pop();
      }
      stack.push(i);
  }
  return min <= n ? min : -1;
};

console.log(
  shortestSubarray(
    //    [1,2],4 //-1
   
   // [1],1 //1
     [2,-1,2], 3  //3
    //[84, -37, 32, 40, 95],167 //3
  )
);