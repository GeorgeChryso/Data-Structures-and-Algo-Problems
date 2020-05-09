// Given an array nums, we call (i, j) an important reverse pair if i < j and nums[i] > 2*nums[j].

// You need to return the number of important reverse pairs in the given array.

//O(n^2) TLE
var reversePairs = function(nums) {
    let result=0
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            result+=Number(nums[i]>2*nums[j])      
        }
    }
    return result
};



var reversePairs = function(nums) {
    let result=0
    let q=[nums[nums.length-1]]
    
    for (let i  = nums.length-2; i >=0; i--) {
        let ele=nums[i]
        let temp=[]
        console.log(ele)
        let idx=null
        while(q.length&&(ele<=2*q[0])){
            if(idx===null){
                if(q[0]<=ele){
                    temp.push(ele)
                    idx=true
                }
            }
            temp.push(q.shift())
        }

        result+=q.length
        if(idx===null){
            while(q.length&&(ele<q[0]))temp.push(q.shift())
            temp.push(ele)
        }
        console.log(temp,q,result)

        q=temp.concat(q)
    }
    return result
};

console.log(
    reversePairs(
        [1,3,2,3,1]
    )
)