// Given an array of integers arr, you are initially positioned at the first index of the array.

// In one step you can jump from index i to index:

// i + 1 where: i + 1 < arr.length.
// i - 1 where: i - 1 >= 0.
// j where: arr[i] == arr[j] and i != j.
// Return the minimum number of steps to reach the last index of the array.
// Notice that you can not jump outside of the array at any time.



var minJumps = function(A) {
    let q=new Set([0]),level=0,f={},n=A.length,seen=new Set(), result=Infinity
    for(let i=0; i<n; i++) // create groups of indices with the same value
        if(!f[A[i]])
           f[A[i]]=[i]
        else
           f[A[i]].push(i)
    while(q.size&&result===Infinity){ // process each BFS level seperately
        let temp=new Set //holds the indices of the next level
        q.forEach(idx=>{
            if(idx==n-1)
                return result=level
            //process each valid neighbor only once
            for(let nei of [idx-1, idx+1, ...f[A[idx]]]) 
                if(!seen.has(nei)&&nei>=0&&nei<n)
                    seen.add(nei),
                    temp.add(nei),
                    f[A[idx]]=[-1] //and invalidate the Value-neighbors previously processed
           })
       
        q=temp level++
    }
    return result
};
console.log(minJumps([100,-23,-23,404,100,23,23,23,3,404]))
