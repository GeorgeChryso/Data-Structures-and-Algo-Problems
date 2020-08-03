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




// O(Nlogn) Binary Search
var lengthOfLISB = function(nums) {
    const lis = [];

    function insertLIS(lis, n) {
        const len = lis.length;

        // find a new max, create a new array that ends on n 
        if (len < 1 || n > lis[len - 1]) return lis.push(n)

        //find a new min, potentially starting anew array
        if (n < lis[0] && len === 1) return lis[0] = n
        if (n < lis[0] && len > 1) return
        

        // Binary search
        let left = 0;
        let right = len - 1;
        while (left <= right) {
            let mid = Math.ceil((left + right) / 2);
            if (n > lis[mid]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        lis[left] = n;
      }


    for (let n = 0; n < nums.length; n++) {
      insertLIS(lis, nums[n]);
      console.log(lis)
    }


    return lis.length;
  };
  
  
//  Linear search
var lengthOfLIS = function(nums) {
    const lis = [];

    function insertLIS( n) {
        const len = lis.length;

        // find a new max, create a new array that ends on n 
        if (len < 1 || n > lis[len - 1]) return lis.push(n)

        //if n is less than all my current ends
        if (n < lis[0] && len === 1) return lis[0] = n
        if (n < lis[0] && len > 1) return
        

        // looking for first bigger element in the array len
        // so i can have better chances of lenghtening the appropriate array ending at an index bigger than this. 
        let i=0
        while( n>lis[i]){
            i++
        }
        lis[i]=n
      }


    for (let n = 0; n < nums.length; n++) {
      insertLIS( nums[n]);
    }


    return lis.length;
};







//how about a dp[i]=Length of the LIS ENDING at index i
var LIS=A=>{
    let n=A.length
    let dp=[...Array(n+1)].map(d=>1)
    let recon=[...Array(n+1)].map(d=>-1)
    let max=1
    for (let i = 1; i < dp.length; i++) {
        dp[i]=1
        for (let j = 0; j < i; j++) {
            if(A[i-1]>A[j]){ //A[i-1] for correct indexing
                if(dp[j+1]+1>dp[i]){
                    recon[i]=j+1
                }
                dp[i]=Math.max(dp[i],dp[j+1]+1)
            }
            max=Math.max(max,dp[i])
        }
    }


    let reconstruction=idx=>{
        if(idx==-1)return
        reconstruction(recon[idx])
        console.log(A[idx-1])
    }

    reconstruction(dp.indexOf(max))
    return max
}



// PATIENCE SORTING (CARDS GAME PATIENCE)
// O(NlogN) no secondary function approach
// TLDR: Greedy place through Binary Search, any smaller than current tail element
// https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf
var lengthOfLIS = function(A) {
    if(!A.length) return 0;
    let tails = [-Infinity];  //here -Infinity acts as a Sentinel, for cleaner code (or else I would ahve to place A[0] here)

    for(let i=0; i<A.length; i++){
        // If my curr element is bigger than all possible tails, i just need to create a new subarray, which of course will be of length tails.length-1 +1
        if(A[i]>tails[tails.length-1])
            tails.push(A[i]);
        else{
            let lo=0, hi = tails.length-1;
            //binary search to find where to place my current element so i have more chances of creating a bigger subarray
            while(lo<hi){
                let mid = (lo+hi)>>1
                if(tails[mid] < A[i])
                    lo = mid+1;
                else
                    hi = mid;
            }
            tails[lo] = A[i];
        }
    }
    
    return tails.length-1;// is the length of the longest possible subarray (-1 because of the -Infinity I added)
};

console.log(
    lengthOfLIS(
        [1,3,6,7,9,4,10,5,23,2,3]
                       // [2,2,2,2,2]
    )
)