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

var threeSum = function(z) {
    
    let l=z.length
    if(l==0){return []}
    let sols=[]
    for (let i = 0; i < l; i++) {
        
            for (let j = i+1 ;j <l; j++) {
                for (let k = j+1; k < l; k++) {
                 if (z[k]+z[j]+z[i]==0){
                   let u= [z[j],z[i],z[k]].sort((a,b)=>a-b).toString()
                   if(!sols.includes(u))sols.push(u.toString())
                  }
                }                
            }        
    }

    return sols.map(d=>d.split(',').map((d)=>Number(d)))
};


// true but time limit exceeded



console.log(threeSum(
    [-1, 0, 1, 2, -1, -4]
))