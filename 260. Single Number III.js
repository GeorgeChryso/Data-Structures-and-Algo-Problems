// Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

// Example:

// Input:  [1,2,1,3,2,5]
// Output: [3,5]
// Note:

// The order of the result is not important. So in the above example, [5, 3] is also correct.
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

var singleNumber = function(nums) {
        let objy={}
        nums.forEach((d)=>{
            console.log(objy)
        if(!objy[d]){
            objy[d]=' '
        }else{
            delete objy[d]
        }}
        )
        return Object.keys(objy)
    };  


var singleNumber = function(N) {
        for (let i = 0; i < N.length; i++) {
           for (let j = i+1 ; j < N.length; j++) {
               if( N[i]==N[j]){
                   N.splice(i,1)
                   N.splice(j-1,1)
                   j--
                   i--
               }
           }
            
        } 

return N
    };  



console.log(singleNumber(
    [1,2,1,3,2,5]
))

console.log(3^3,3^1,1^3,4^1)