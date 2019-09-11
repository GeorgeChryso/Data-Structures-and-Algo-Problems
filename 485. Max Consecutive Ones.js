
var findMaxConsecutiveOnes = function(nums) {
    let cur=0
    let max=0
    
    nums.forEach((d)=>{
        if(d)cur++
        else{
            max=Math.max(max,cur)
            cur=0
        }
        
    })
    return max=Math.max(max,cur)

};