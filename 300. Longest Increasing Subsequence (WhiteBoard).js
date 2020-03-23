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
var lengthOfLIS = function(nums) {
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


// PATIENCE SORTING
// O(NlogN) no secondary function approach
var lengthOfLIS = function(A) {
    if(!A.length) return 0;
    let tails = []; // the possible ends of arrays of length i+1, if tails[0]=3, then i have 1 subarray of length 0+1=1, [3]
    tails[0] = A[0]; // the subarray ending at itself of length 1

    for(let i=1; i<A.length; i++){
        
        // If my curr element is bigger than all possible tails, i just need to create a new subarray, which of course will be of length tails.length-1 +1
        if(A[i]>tails[tails.length-1]){
            tails.push(A[i]);
        }

        // If my element is less than every possible end, hence the first element, I need to consider starting a new array, this will not hinder my current longest array as I already have saved it
        else if(A[i] < tails[0]){
            tails[0] = A[i];
        }

        // if my element is inbetween every other element , i just need to find somewhere to place it, inface i need to find the first greater element so i can have better chances of creating a longest array. for example
        // If tails=[,....3, 5,9] and I come across an element A[i]= 4, then by replacing 5 with 4 I have a better chance of coming across an element bigger than 4 in the future, let's say another 5, therefore extending my current array.
        else{
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
        }
    }
    
    return tails.length;// meaning the length of the longest possible subarray
};


var lengthOfLIS=A=>{
    let q=new Monoq()

    let result=0
    for (const element of A) {
        q.pushMax(element)
        console.log(q.q)
        result=Math.max(result,q.size())
    }

    return result
}
class Monoq{

    constructor(){
        this.q=[]
    }
    
    getMax=()=>this.size?this.q[this.size()-1]:null
    getMin=()=>this.size()?this.q[0]:null
    size=()=>this.q.length

    pollMax=()=>this.q.pop()

    pollMin=()=>this.q.shift()

    pushMax(element){
        while(this.size&&this.getMax()>=element)this.pollMax()
        this.q.push(element)
    }

    pushMin(element){
        while(this.size&&this.getMin()<element)this.pollMin()
        this.q.push1(element)
    }

}
console.log(
    lengthOfLIS(
        [1,3,6,7,9,4,10,5,6]
                       // [2,2,2,2,2]
    )
)