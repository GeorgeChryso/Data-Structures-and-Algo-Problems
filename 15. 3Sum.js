'use strict'

// Given an array nums of n integers, are there elements a, b, c 
// in nums such that a + b + c = 0? Find all unique
//  triplets in the array which gives the sum of zero.

// Note:

// The solution set must not contain duplicate triplets.

// Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

var twoSum = function(nums, target) {


    let answer=[]
    nums.some((d, j) => {
         if(nums.includes(target-d)&&j!=nums.indexOf(target-d)){
           answer=[j,nums.indexOf(target-d)]
          return true;
           }
          
      })
             
  return answer
  };

var threeSum = function(z) {
    
    let l=z.length
    if(l==0){return []}
    let sols=[]
    var memo=[]
    for (let i = 0; i < l; i++) {

        let answer=[]
            z.some((d, j) => {
         if(z.includes(-z[i]-d)&&j!=z.indexOf(-z[i]-d)&&j!=i&&i!=z.indexOf(-z[i]-d)){
           answer=[i,j,z.indexOf(-z[i]-d)].sort((a,b)=>a-b).join('')
           }
         if (answer.length!=0&&!memo.includes(answer)) {
          memo.push(answer)

          sols.push([z[i],d,-z[i]-d])

        }
      })
            
            


    }

    //return sols.map(d=>d.split(',').map((d)=>Number(d)))
    return sols
};


// true but time limit exceeded



var threeSum = function(arr) {
let results=[]
arr=arr.sort((a,b)=>a-b)
for (let i = 0; i <=arr.length-3; i++) {
  if (arr[i] > 0) {
    return results;     // Since im  actually searching for 2 elements a,b so that arr[i]+a+b=0, a+b=-arr[i]
                        // but, if arr[i]>0, that means that a,b>0 since arr is sorted . Impossible
  }

    if(i==0|| arr[i]>arr[i-1]){
        let start=i+1; // I search from here
        let end=arr.length-1 // to here

        while(start<end){

            if( arr[i]+arr[start]+arr[end]==0){
              results.push([arr[i],arr[start],arr[end]])
            }
            
            if( arr[i]+arr[start]+arr[end]<0){
              let curStart=start

              while(arr[start]==arr[curStart] && start < end){
              start++}  

            }
            else{
              let curEnd=end
              while (arr[curEnd]==arr[end]&& start < end) {
                end--

              }

            }

        }

    }


  
}
  
return results
}

// nice but slow

// optimal O(N)
var threeSum = function(nums) {
  var rtn = [];
  
  //I need the 3 sum, not 2sum or 1sumlol
	if (nums.length < 3) {
		return rtn;
  }

  // Sorting 
	nums = nums.sort(function(a, b) {
		return a - b;
  });
  

	for (var i = 0; i < nums.length - 2; i++) {

		if (nums[i] > 0) {
			return rtn;
		}
		if (i > 0 && nums[i] == nums[i - 1]) {
      // I need unique triplets, therefore If A[i] repeats itself i dont want it
			continue;
    }
    


		for (var j = i + 1, k = nums.length - 1; j < k;) {

			if (nums[i] + nums[j] + nums[k] === 0) {
              // add the unique triplet to my end result
              rtn.push([nums[i], nums[j], nums[k]]);
              // narrow the indexes
              j++;
              k--;
              
              //increment nums[j] if it repeats itself
              while (j < k && nums[j] == nums[j - 1]) {
                j++;
              }

              
              //increment nums[k] if it repeats itself
              while (j < k && nums[k] == nums[k + 1]) {
                k--;
              }
        

      } 

      
      // if my result is bigger than 0, you need to reduce it.
      // that will happen if I reduce k so i can go to smaller numbers
      // which will reduce the total sum
      else if (nums[i] + nums[j] + nums[k] > 0) {
				k--;
      }

      // if my result is less than 0, I need to increase the total sum, 
      // therefore I increase the j index, going to bigger numbers.

      else {

				j++;
			}
		}
	}
	return rtn;
};




console.log(threeSum(

  [0,0,0]
  ))

