// Given an unsorted array of integers, find the length of longest increasing subsequence.

// Example:

// Input: [10,9,2,5,3,7,101,18]
// Output: 4 
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
// Note:

// There may be more than one LIS combination, it is only necessary for you to return the length.
// Your algorithm should run in O(n2) complexity.
// Follow up: Could you improve it to O(n log n) time complexity?


// O(N^2) pretty straight forward dp with memo , to be whiteboarded
var lengthOfLISz = function(A) { 
    if (!A.length )return 0
    var biggesttLengthAtStart=Array(A.length).fill(1) // each element of this array, represents
    // the LENGTH of the LONGEST subarray STARTING FROM i, its index.
    // if m[3]=8, that means that the LONGEST subarray starting from A[3] is of length 8



    for (let start = A.length-2; start >= 0; start--) {
        for (let potentialNext = start+1; potentialNext < A.length; potentialNext++) {
             if( A[start]<A[potentialNext]) {
                biggesttLengthAtStart[start]=Math.max(biggesttLengthAtStart[potentialNext]+1,biggesttLengthAtStart[start])
                      // the max length of the subarray starting from index start
                    // is the MAX length of the subarray that starts from a potential next element +1, because I add a new start, m[start], or

                    // example


                    // say A= [0,1,5,6,1,8,5]
                        
                    // then   lets say m[2]=1 currently, cos before i process the index start=2
                    // the only subarray that starts from start=2 has length 1, it's the [5] subarray
                    // now, wouldnt the length of the maximum increasing subarray starting from 5, equal the length of the maximum increasing subarray starting from each potential second element x,  [5,x,...] ?

                    // yes. 
                    // so what are the next potential elements? 
                    // 6 and 8, 
                    // so the 2 possible subarrays are 
                    //    [5,6,...]
                    //    [5,8,..]
                    // what are the lengths of these subarrays?
                    // [5,6,...].length= [5].length +[6,...].length= 1+[6,...].length
                    // but what is the length of [6,...] . well we just need to find the  max length of the increasing subarray beginning with 6. We do exactly the same thing. 
             }  
            
             
        }
    }
    
       

    return Math.max(...m)
};


console.log(
    lengthOfLIS(
      [1,3,5,4,7]
       // [2,2,2,2,2]
    )
)