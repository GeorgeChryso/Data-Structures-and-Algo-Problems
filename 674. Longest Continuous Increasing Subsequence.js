'use strict'



// Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray).

// Example 1:
// Input: [1,3,5,4,7]
// Output: 3
// Explanation: The longest continuous increasing subsequence is [1,3,5], its length is 3. 
// Even though [1,3,5,7] is also an increasing subsequence, it's not a continuous one where 5 and 7 are separated by 4. 



//2 counters
var findLengthOfLCIS = function(A) {
    if(!A.length)return 0

    //curr longest subsequence's length
    var curr=1

    var result=-1
    
    for (let i = 0; i < A.length; i++) {
        if(A[i]<A[i+1]){
            curr++
        }        
        else{
            result=Math.max(result,curr)
            curr=1
        }
    }
    
    return Math.max(result,curr)
    
};


// sliding window
var findLengthOfLCIS = function(A) {
    if(!A.length)return 0


    var start=0 // start of the window

    var result=0 // maximum length witnessed until current window
    
    for (let end = 0; end < A.length; end++) {
        
        // window reset when the first Anomaly is witnessed
        if(A[end-1]>=A[end]){
            start=end
        }

        // the result attempts to update on each new window state
        // end-start+1 is the length of the currrent window, [2,3,1] start=0,end=2, length= end-start+1=3
        result=Math.max(result,end-start+1)
    }
    
    return result
    
};

console.log(
    findLengthOfLCIS(
        [2,2,2,2,2]
    )
)