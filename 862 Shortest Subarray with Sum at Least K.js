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
  var P = [];
  var currSum = 0;
  var currBestLength = Infinity;


  for (var val of A) {
    currSum+=val
    P.push(currSum)
  }

  class dequeue {
    constructor() {
      //holds the indices of increasing P[i]
      this.q = [];
    }

    push = x => {
      //mystery
      while (this.q.length && P[x] - P[this.q[0]] >= K) {
        currBestLength = Math.min(currBestLength, x - this.q.shift());
      }

      //keeps the dq increasing
      while (this.q.length && P[this.q[this.q.length - 1]] >= P[x]) {
        this.q.pop();
      }
      this.q.push(x);
    };
  }

  var dq = new dequeue();

  for (let i in P) {
    dq.push(i);
  }
  return currBestLength;
};

console.log(
  shortestSubarray(
    //    [1,2],4 //-1
    // [1],1 //1
    // [2,-1,2], 3  //3
    [84, -37, 32, 40, 95],
    167 //3
  )
);
