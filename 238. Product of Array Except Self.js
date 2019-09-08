// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

// Example:

// Input:  [1,2,3,4]
// Output: [24,12,8,6]
// Note: Please solve it without division and in O(n).

// Follow up:
// Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

var productExceptSelf = function(A) {
    return A.map((d,i)=>{
        let sum=1
        for (let k = 0; k < A.length; k++) {
           i!=k?sum*=A[k]:null 
        }
        return sum
    })
};
var productExceptSelf=(A)=>{
    var answ=new Array(A.length)
    answ[0]=1
    for (let i = 1; i < A.length; i++) {
        answ[i]=answ[i-1]*A[i-1]        
    }
    let R=1
    for (let i = A.length-1; i >-1; i--) {
        answ[i]=answ[i]*R
        R*=A[i]
    }

    return answ

}
console.log(productExceptSelf(
    

    [1,0]
))