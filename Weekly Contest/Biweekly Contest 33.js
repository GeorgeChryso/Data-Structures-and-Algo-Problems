
var minOperations = function(nums) {
    let result=0
    let max=-1
    let flag=false

    let n=1000000000
    let min=Infinity
    for (let j = 0; j < 32; j++) {
        let num=n/(1<<j)
        if(num===(num>>0)){
            console.log(num,num*(1<<j),j)
            min=Math.min(min,num+j)
        }
     
    }        
    return min
 


    for (let i = 0; i < nums.length; i++) {
        console.log(nums[i])
        console.log(2**30)
        if(nums[i]==1){
            result++
        }
        else if (nums[i]===1000000000){
            result++
            max=41
            flag=true
        }
        else if(nums[i]>1){
            result++
            for (let j= 1; j <= 32; j++) {
                if((1<<j)>nums[i]){
                        console.log(i)
                        result+= (nums[i]-(1<<(j-1)))
                        max=Math.max(max,j-1)
                        break
                 }           

            }
          
        }        
    }
    return result+max
};
console.log(minOperations(
    [1000000000]
))

