// Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.




// O(n*2**n) recursive brute force, but to no avail. 
// The bitmasks are cool but unnecessary 
// A simple dfs of the same complexity would be shorter
var canPartitionKSubsets = function(nums, k) {
    
    let totalSum=nums.reduce((a,b)=>a+b)
    if(totalSum%k)return false
    let targetSum=totalSum/k
    let totalNumbers=2**(nums.length)-1
    if (targetSum===totalSum)return true

    let possMasks=[]

    // O(n*2**n)
    for (let i = 0; i <= totalNumbers; i++) {
        let mask=i
        let sum=0
        let counter=0
        while(mask){
            if(mask&1)sum+=nums[counter]
            mask>>>=1
            counter++
        }
        if(sum===targetSum)possMasks.push(i)
    }

    // O(2**n)
    let dfs=(currIndex,totalNum,totalAnd=null,totalOR=0)=>{

        if(totalAnd===0&&totalNum===k&&totalOR===totalNumbers){
            return true
        }
        if(currIndex>=possMasks.length||totalNum>k){
            return false
        }


        if(totalAnd===null){
            return  dfs(currIndex+1,totalNum+1,possMasks[currIndex],possMasks[currIndex])
            ||dfs(currIndex+1,totalNum,totalAnd,totalOR)
        }
        
    
        return dfs(currIndex+1,totalNum+1,totalAnd&possMasks[currIndex],totalOR|possMasks[currIndex])
            ||dfs(currIndex+1,totalNum,totalAnd,totalOR)
    }

    return dfs(0,0)
};



console.log(
    canPartitionKSubsets(
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        1
    )
)
