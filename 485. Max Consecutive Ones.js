
var findMaxConsecutiveOnes = function(nums) {
    let cur=0
    let max=0
    
 for (let i = 0; i < nums.length; i++) {
    if(nums[i]){
    cur++
    continue}
    
    max=Math.max(max,cur)
    cur=0
  
 }

    return max=Math.max(max,cur)

};