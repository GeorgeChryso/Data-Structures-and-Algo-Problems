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


//monotonic queue approach, elements : [A[i],i]
// front of the queue: the minimum element INSIDE THE WINDOW
// insert new elements from back of the queue, that pop all the elements bigger than them
// O(n), every element gets inside the queue only once.
var minslidingwindow=(A,k)=>{
    let n=A.length,result=[...Array(n)].map(d=>Infinity),
        monoq=[]
    for (let i = -k+1; i < n; i++){
        //if there is a new element to insert
        // aka the last element of the current window 
        // and this new element pops anything bigger than it / anything that 's not inside my curr window
        while(i+k-1<n&&monoq.length&&(monoq[monoq.length-1][0]>=A[i+k-1]||monoq[monoq.length-1][1]<i))
            monoq.pop()
        monoq.push([A[i+k-1],i+k-1]) 
        //push any elements out of the window at the front of the queue
        while(monoq.length&&monoq[0][1]<i)
            monoq.shift()
        if(i>=0)
            result[i]=monoq[0][0]
    }        
    return result
}

console.log(
    minslidingwindow(
        [1,2,4,2,4,5,3,1], 3
    )
)