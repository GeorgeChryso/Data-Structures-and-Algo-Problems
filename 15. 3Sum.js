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
        
            // for (let j = i+1 ;j <l; j++) {
            //     for (let k = j+1; k < l; k++) {
            //      if (z[k]+z[j]+z[i]==0){
            //        let u= [z[j],z[i],z[k]].sort((a,b)=>a-b).toString()
            //        if(!sols.includes(u))sols.push(u.toString())
            //       }
            //     }                
            // }     // solA


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



console.log(threeSum(
    [-1, 0, 1, 2, -1, -4]
))

