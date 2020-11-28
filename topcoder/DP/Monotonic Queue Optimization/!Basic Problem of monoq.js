// Minimum/Maximum value in a sliding window
// Given an sequence A1,A2,…,AN and a integer K, for every 1≤i≤N−K+1, find min i≤j≤i+k−1 Aj.


// example
// A=[1,2,4,2,4,5,3,1], K=3

// result=[1,2,2,2,3,1,1,1] //essentially the minimum of each window of length 3


// naive approach
// O(n*k)
var minslidingwindow=(A,k)=>{
    let n=A.length,result=[...Array(n)].map(d=>Infinity)
    for (let i = 0; i < n; i++) 
        for (let j = i; j <= Math.min(i+k-1,n-1); j++) 
            result[i]=Math.min(result[i],A[j])            
    return result
}

console.log(
    minslidingwindow(
        [1,2,4,2,4,5,3,1], 3
    )
)


//monotonic queue approach, elements : [i]
// front of the queue: the minimum element INSIDE THE WINDOW
// insert new elements from back of the queue, that pop all the elements bigger than them
// O(n), every element gets inside the queue only once.
var maxSlidingWindow = function(A, k) { 
   let n=A.length,result=[],monoq=[]
   for (let i =0; i < n; i++){
        while(i>=k&&monoq.length&& monoq[0]<=i-k) //remove invalid front (aka out of the window)
            monoq.shift()
        while(monoq.length&& A[monoq[monoq.length-1]]<=A[i]) // remove lesser back 
            monoq.pop()
        monoq.push(i) // push the new index of the current
        if(i>=k-1)
            result.push(A[monoq[0]]) // monoq[0] is the index of the smallest element inside the k-length window
   }        
   return result
};
console.log(
    minslidingwindow(
        [1,2,4,2,4,5,3,1], 3
    )
)