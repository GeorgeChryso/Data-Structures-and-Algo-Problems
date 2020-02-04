



//hashmap
var missingNumber = function(nums) {
    let a=new Set(nums)
    for(let i=0;i<=nums.length+1;i++)if(!a.has(i))return i
};

//series formula
var missingNumber = function(nums) {
    return ((nums.length)*(nums.length+1)/2 )-nums.reduce((acc,curr)=>acc+curr)
};


//bit manipulation