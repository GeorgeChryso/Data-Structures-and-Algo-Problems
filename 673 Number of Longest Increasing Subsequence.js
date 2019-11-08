
var findNumberOfLIS = function(A) { 
    var overallBiggestLength=0
    var overallBiggestLengthIndex=-1
    if (!A.length )return 0
    var biggesttLengthAtStart=Array(A.length).fill(1) // each element of this array, represents
    var waysToAchieveIt=Array(A.length).fill(1)
    // the LENGTH of the LONGEST subarray STARTING FROM i, its index.
    // if m[3]=8, that means that the LONGEST subarray starting from A[3] is of length 8



    for (let start = A.length-2; start >= 0; start--) {
        let currMax=0
        for (let potentialNext = start+1; potentialNext < A.length; potentialNext++) {
             if( A[start]<A[potentialNext]) {

                
                if(biggesttLengthAtStart[potentialNext]+1 >biggesttLengthAtStart[start]){
                    
                    waysToAchieveIt[start]=waysToAchieveIt[potentialNext]
                    biggesttLengthAtStart[start]= biggesttLengthAtStart[potentialNext]+1 
                    currMax=biggesttLengthAtStart[potentialNext]+1 
                }
                else if(biggesttLengthAtStart[potentialNext]+1 ==biggesttLengthAtStart[start] ){
                    waysToAchieveIt[start]+=waysToAchieveIt[potentialNext]
  
                }
               

             }  
            
             
        }
   
        
        
    }
    
       

    return waysToAchieveIt,biggesttLengthAtStart
}
console.log(findNumberOfLIS(
 //  [2,2,2,2,2]
 [1,3,5,4,7]
))