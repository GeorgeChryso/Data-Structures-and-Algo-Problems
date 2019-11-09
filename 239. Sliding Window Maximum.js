// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.


// It's actually inefficient, as I have to process every element and resort the array O(n*(K+K))
var maxSlidingWindow=(A,K)=>{
  // my sorted array
  var sorted=Array(K).fill(0)

  // the array containint each window's maximum
  var result=[]

  sorted=A.slice(0,K).sort((a,b)=>a-b)
  result.push(sorted[K-1])


  // removing an element and re-sorting the array
  var removeEl=(x)=>{
    console.log(sorted,`removed`,  x)
    let i=0
    while (x!==sorted[i])i++
    //i einai o deiktis tou stoixeiou pou prepei na tzasw
    
    while(i<K-1){
      sorted[i]=sorted[i+1]
      i++
    }
    sorted[K-1]=Infinity
    console.log(sorted ,'\n')

  }


  // inserting an element and resorting the array
  var insertEl=(x)=>{
    console.log(sorted,`inserted`,  x)

    let i=0 
    while(sorted[i]<x)i++
    // i einai o diktis tou prwtou megaluterou tou
    var j=K-2
    while(j>=i){
      sorted[j+1]=sorted[j]
      j--
    }
    sorted[i]=x
    console.log(sorted ,'\n')
  }


  for (let i = K; i < A.length; i++) {
      removeEl(A[i-K])
      insertEl(A[i])
      result.push(sorted[K-1])
  }
  

  return result
}



// MONOTONIC QUEUE
function maxSlidingWindow(nums, k) {
  const res = [];
  const q = [];

  for (let i = 0; i < nums.length; i++) {


    while (q.length - 1 >= 0 && nums[i] > q[q.length - 1]) q.pop();
    q.push(nums[i]);

    // When i + 1 - k >= 0, the window is fully overlapping nums
    const j = i + 1 - k;

    if (j >= 0) {
      res.push(q[0]);
      if (nums[j] === q[0]) q.shift();  // If the biggest element in q is about to exit window, remove it from q
    }
  }
  return res;
}


// WITH COMMENTS
var maxSlidingWindow = (nums, k) => {

  // Store the max values for each window position
  let maxes = [];
  
  // Queue to determine maxes
  let q = [];

  // Iterate through all window positions
  for (let last = 0, first = 1 - k; last < nums.length; last++, first++) {


      // Make sure q will stay in descending order after adding new window el
      while (q.length && nums[last] > q[q.length - 1]) {
        q.pop(); }

      // Add new window el to q, gauranteed to be smallest in q
      q.push(nums[last]);

      // If window isn't fully overlapping nums, don't yet know the first max
      if (first < 0) { 
        continue; }
        

      // Add q[0] to output, since it's current largest el in window
      maxes.push(q[0]);
      // If biggest el in q is about to exit window, remove it from q
      if (nums[first] === q[0]) { 
        q.shift(); }
  }

  return maxes;
    
}




// class queue
var maxSlidingWindow = function(nums, k) {
  class Queue {
    constructor() {
        this.queue = [];
    }
    
    push(e) {
        //remove all elements that less then e
        while(this.queue.length > 0 && e > this.queue[this.queue.length - 1]){
            this.queue.pop();
        }
        
        this.queue.push(e);
    }
    
    pop() {
        this.queue.shift();
    } 
    
    max() {
        return this.queue[0];
    }
  }


  let q = new Queue();
  let res = [];
  
  for(let i = 0; i < nums.length; i++){
      console.log(q.queue)
      q.push(nums[i]);
      if(i + 1 >= k){
          res.push(q.max());
          if(q.max() === nums[i + 1 - k]) q.pop();
      }
  }   
  
  return res;
};





// MY CLASS
var maxSlidingWindow = function(A, K) {
  if (!A.length)return []
  var result=[]
  
  class dequeue {

    constructor(){
      this.dq=[]
    }


    pushy(x){
      while(this.dq.length&&x>this.dq[this.dq.length-1]){
        this.dq.pop()
        }
      this.dq.push(x)
    }
 

    getMax(){
      return this.dq[0]
    }

    maintainWindowAtIndex(i){
      //if we have a Window and not just the first Z elements with Z<K
      // the current window is [i-K+1, i]
      // so for example [0,3], [1,4], [2,5] if k=4 
      // so we want i-K+1>=0 so we  have our full window
      if(i-K+1>=0){
        result.push(deque1.getMax())

        let lastEle=A[i-K+1]
        if(lastEle==this.getMax()){
          this.dq.shift()
        }
      }

    }
  }

  var deque1=new dequeue
  



  // process the rest and keep pushing to the result
  for (let i = 0; i <A.length; i++) {
   
    deque1.pushy(A[i])

    deque1.maintainWindowAtIndex(i)

   
    
  }

  return result
  
};


  console.log(maxSlidingWindow(
  //  [-7,-8,7,5,7,1,6,0],4
   // [1,3,-1,-3,5,3,6,7],3
   [1,-1],1
  ))