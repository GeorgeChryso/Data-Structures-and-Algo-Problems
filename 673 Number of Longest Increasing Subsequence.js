
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

var findNumberOfLIS = function(A) {
    var counters=Array(A.length).fill(1)


    if(!A.length) return 0;
    let tails = []; // the possible ends of arrays of length i+1, if tails[0]=3, then i have 1 subarray of length 0+1=1, [3]
    tails[0] = A[0]; // the subarray ending at itself of length 1

    for(let i=1; i<A.length; i++){
        
        // If my curr element is bigger than all possible tails, i just need to create a new subarray, which of course will be of length tails.length-1 +1
        if(A[i]>tails[tails.length-1]){
            tails.push(A[i]);
          //  counters[i]=counters[i-1]
            counters[tails.length-1]=Math.max(...counters.slice(0,tails.length-1))
        }

        // If my element is less than every possible end, hence the first element, I need to consider starting a new array, this will not hinder my current longest array as I already have saved it
        else if(A[i] < tails[0]){
            tails[0] = A[i];
            counters[0]++
        }

        // if my element is inbetween every other element , i just need to find somewhere to place it, inface i need to find the first greater element so i can have better chances of creating a longest array. for example
        // If tails=[,....3, 5,9] and I come across an element A[i]= 4, then by replacing 5 with 4 I have a better chance of coming across an element bigger than 4 in the future, let's say another 5, therefore extending my current array.
        else{
            if(tails.length==1){
                counters[0]++
                continue
            }
            let lo=0, hi = tails.length-1;
            //binary search to find where to place my current element so i have more chances of creating a bigger subarray
            while(lo<hi){
                let mid = Math.floor((lo+hi)/2);
                if(tails[mid] < A[i]){
                    lo = mid+1;
                }else{
                    hi = mid;
                }
            }
            tails[lo] = A[i];

            counters[lo]=Math.max(...counters.slice(0,lo))+1

        }
    }
    console.log(tails)
    console.log(counters)
    return counters[tails.length-1];// meaning the length of the longest possible subarray
};
console.log(findNumberOfLIS(
//[1,3,5,4,7,2,3,1,7,324,12,31,1,12,33]
[2,2,2,2,2]
//[1,3,5,4,7]
))