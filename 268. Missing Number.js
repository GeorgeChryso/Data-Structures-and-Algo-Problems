// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.



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
// taking advantage of the XOR condition N^B=0, 0^X=X
var missingNumber=A=>{
    let bucket=A.reduce((acc,curr,i)=>acc^(i),A.length) //xoring every possible number of the starting set including the last number 
    let total=A.reduce((acc,curr)=>acc^curr) // xoring the given numbers
    return total^bucket // getting the result
}

