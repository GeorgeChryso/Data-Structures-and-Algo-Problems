// Given an array of integers arr, you are initially positioned at the first index of the array.

// In one step you can jump from index i to index:

// i + 1 where: i + 1 < arr.length.
// i - 1 where: i - 1 >= 0.
// j where: arr[i] == arr[j] and i != j.
// Return the minimum number of steps to reach the last index of the array.
// Notice that you can not jump outside of the array at any time.




 // Ok so immediately this struck me as a dp problem, a classic knapsack way of finding the mininmum number of steps and I ve got a pretty nice O(N^2) solution here
 var minJumps = function(arr) {
    let previous=Array(arr.length).fill(null).map(d=>Infinity) //previous[i] is the minimum steps needed to reach the index i


    //basically the dictionary logic helps me with the 3d option of choosing any possible element of my previous array that shares the same value inside the input array
    let dictionary={ } //key: arr's values, val: the minimum value it holds on my previous array
    arr.forEach(
        (d,i)=>{
            if(i==0)dictionary[d]=0 // Already at the start
            else dictionary[d]=dictionary[d]||Infinity
    })
    //basecase
    previous[0]=0 // I m already at the start

    let minsofar=Infinity
    let result=Infinity
    for (let i = 0; i < arr.length; i++) { // for each number of moves
        previous=previous.map((d,j)=>{   // I map one line to the next
            let res=Math.min(previous[j],  // updating my previous line
                j-1>=0?1+previous[j-1]:Infinity,          
                j+1<=arr.length-1?1+previous[j+1]:Infinity,
                dictionary[arr[j]]+1  // considering the minimum value of my element in the whole array
                )
            minsofar=Math.min(res,minsofar)  //early termination
            dictionary[arr[j]]=Math.min(dictionary[arr[j]],res) //update the minimum of dictionary
            return res
        })

        if(minsofar==result)return result //early termination
        result=Math.min(result,previous[arr.length-1]) //always update the result ways
    }


    return result
};
// Unfortunately this method gets TLEd but manages 21/26 tests

// The order in which you process for the sub problem is basically wrong. The reason is in this problem we are allowed to move any number of steps in backwards.
// You are considering only the one step move in backwards.
// If you observe closely there is cyclic dependency of sub problems and hence dp fails.
// The subproblem depends on the original problem and is not independent. It cannot be solved by DP method.


// Apparently the correct way is BFS

var minJumps = function(arr) {
    //Essentially my dictionary of values will hold arrays of  indexes that correspond to the key value
    let dictionary={} // key: arr[i], value:[i,i0,i1,i2,...] where arr[i]==arr[i0]==arr[i1]==...
    arr.forEach(
        (d,i)=>{
            if(dictionary[d])dictionary[d].push(i)
            else dictionary[d]=[i]
        }
    )    


    let visited=new Set() //visited indices that I do not want to expand anymore
    visited.add(0)

    let q=[0] //my queue will store the indexes to be expanded
    let step=0

    // BFS
    while(q.length){
        let temp=[] //this will hold the expanded indexes to be processed during the next round

        // expand all of the q's elements (indexes) 
        while (q.length){

            let shifted=q.shift() //that's the index I want to expand 

            //Am I already at my target? If so I'm done
            if(shifted==arr.length-1)return step    

            //Check the previous index, if possible and not visited
            if(!visited.has(shifted-1)&&shifted>=1){ 
                temp.push(shifted-1)
                visited.add(shifted-1)
            }
            
            //Check the next index,if possible and not visited
            if (!visited.has(shifted+1)&&shifted + 1 < arr.length ){ 
                if (shifted + 1 === arr.length-1 ) return step + 1 ////basically checking the i+1 activity(saving a loop)
                temp.push(shifted+1)
                visited.add(shifted+1)
            }

            // check all the other indexes with the same arr[j] value
            for (const j of dictionary[arr[shifted]]) {
                if(j>=0 && j<arr.length&& !visited.has(j)){ //for every unvisited candidate index
                    visited.add(j) //make it visited
                    temp.push(j) // and add it to the queue
                    if(j===arr.length-1)return step+1// save a loop
                    if(j+1===arr.length-1)return step+2// save 2 loops
                }
            }   

        }
        q=temp// go to the next round
        step++ 
    }


    // it will never exit the loop cos my target is always reachable. 
};

var minJumps = function(arr) {
    if (arr.length === 1) return 0;
    const sameValIdx = new Map();
    //populate map
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!sameValIdx.has(val)) sameValIdx.set(arr[i], [i]);
      else sameValIdx.get(arr[i]).push(i);
    }
    
    const seen = new Set();
    seen.add(0);
    const queue = [[0, 0]];//

    //bfs
    while (queue.length) {
        const [idx, step] = queue.shift();
        
        if (idx - 1 >= 0 && !seen.has(idx - 1)) {
            queue.push([idx - 1, step + 1]);
            seen.add(idx - 1);
        }
        if (idx + 1 < arr.length && !seen.has(idx + 1)) {
            if (idx + 1 === arr.length - 1) return step + 1; // You have to check here to handle this case [7,7,7,7,7...]
            queue.push([idx + 1, step + 1]);
            seen.add(idx + 1);
        }
        
        const targetArr = sameValIdx.get(arr[idx]);

        for (let j = 0; j < targetArr.length; j++) {
            const i = targetArr[j];
            if (!seen.has(i) && i !== idx - 1 && i !== idx + 1) {
                if (i === arr.length - 1) return step + 1; // You have to check here to handle this case [7,7,7,7,7...]
                queue.push([i, step + 1]);
                seen.add(i);
            }
        }
    }

  };
console.log(minJumps([100,-23,-23,404,100,23,23,23,3,404]))