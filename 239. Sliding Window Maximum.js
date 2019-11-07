// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.


// It's actually inefficient, as I have to process every element and resort the array O(n*(K+K))
var maxSlidingWindow=(A,K)=>{
  var sorted=Array(K).fill(0)
  var result=[]

  sorted=A.slice(0,K).sort((a,b)=>a-b)
  result.push(sorted[K-1])

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

var maxSlidingWindow = (A, K) =>{
      var result=[]
      var queue=[]
      var removeMemo={}

      for (let end = 0; end < K; end++) {
        queue.push(A[end])        
      }
      queue.sort((a,b)=>a-b)

      result.push(queue[K-1]) // push the max element
      removeMemo[queue[0]]=1 // the first element to be deleted


      //places an element on my queue
      var place=(x)=>{
        for (var i = 0; x>= A[i]&&i<A.length-1; i++) {

        }
        queue.splice(i,0,x)
      }


      for (let end = K; end < A.length; end++) {
          if(removeMemo[queue[K-1]]){
            queue.pop()
            removeMemo[queue[K-1]]--
          }
          if( A[end]>=queue[queue.length-1]){
              queue.push(A[end])
              result.push(queue[K-1])

          }
          else{
            place(A[end])
            result.push(queue[K-1])
          }  
          removeMemo[queue[0]]=removeMemo[queue[0]]||0+1
      }
      

      return result

  }



  console.log(maxSlidingWindow(
    [1,3,-1,-3,5,3,6,7],3
  ))