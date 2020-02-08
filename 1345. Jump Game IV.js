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


