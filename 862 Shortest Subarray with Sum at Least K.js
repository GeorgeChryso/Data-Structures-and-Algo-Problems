// Return the length of the shortest, non-empty, contiguous subarray of A with sum at least K.

// If there is no non-empty subarray with sum at least K, return -1.



var shortestSubarray = function(A, K) {
    
    var result=Infinity
    var currSum=0
    var currBestLength=Infinity
    var start=0

    for (let end = 0; end <  A  .length; end++) {
    
            currSum+=A[end]

            if(currSum>=K){
                currBestLength=Math.min(end-start+1,currBestLength)
                result=Math.min(result,currBestLength)
                let tempSum=currSum
                while (tempSum>=K&&start<end) {
                    tempSum-=A[start]
                    start++
                    if(tempSum>=K){
                        currSum=tempSum
                        currBestLength=Math.min(end-start+1,currBestLength)
                        result=Math.min(result,currBestLength)

                    }
                    else{
                        start--
                        break;
                    }
                }

            }
        
    }
    
    return result==Infinity?-1:result
};

console.log(shortestSubarray(
   // [1,2],4
   // [1],1
 //  [2,-1,2], 3
 
[84,37,32,40,95],167
))