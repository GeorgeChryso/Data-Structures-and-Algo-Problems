// Given an array of integers arr and two integers k and threshold.

// Return the number of sub-arrays of size k and average greater than or equal to threshold.

var numOfSubarrays = function(arr, k, threshold) {
    if(arr.length<k||k===0)return 0
    let result=0

    
    //calculate the sum of the first subarray 
    let sums=arr.slice(0,k).reduce((a,b)=>a+b)
    if(sums/k>=threshold)result++


    //and every possible next sum
    for (let i = k; i < arr.length; i++) {
      //find the next sum
      sums+=(arr[i]-arr[i-k])

      //increment if of wanted type
      if(sums/k>=threshold)result++
    }
      
    return result
};

