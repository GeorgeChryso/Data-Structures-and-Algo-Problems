// Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements that appear twice in this array.

// Could you do it without extra space and in O(n) runtime?



console.log( Number(5^1^2^1)==Number(5^1^2^1))

console.log(5^5)

var findDuplicates = function(nums) {
 for (let i = 0; i<nums.length; i++) {
    if(i==nums.lastIndexOf(nums[i])){
        nums.splice(i,1)

        i--
    }
 }
 let c


 

};
var findDuplicates = function(nums) {
    if(nums.length === 0) return [];
    var index, ans =[];
    for(var i = 0; i < nums.length; i++){
        index = Math.abs(nums[i]);
        if(nums[index-1] < 0){
            ans.push(index);
        } else {
            nums[index-1] *= -1;
        }
    }
    return ans;
};
var findDuplicates = function(A) {
    const a = [];

    
    for (let i = 0; i < A.length; i++) {
       (A[Math.abs(A[i]) - 1] < 0)? 
            a.push(Math.abs(A[i]))
:             A[Math.abs(A[i]) - 1] = -A[Math.abs(A[i]) - 1];
    }
    
    return a;
};

var findDuplicates = function(A) {
    const a = [];

    /*
     * mark visited number with "-" in index & record duplicates 
     * by telling if a number is already visited.
     */
    for (let i = 0; i < A.length; i++) {
        const position = Math.abs(A[i]) - 1;
        if (A[position] < 0){ 
            a.push(position + 1);}
        else {
            A[position] = -A[position];}
    }
    
    return a;
};
// SMART

console.log(findDuplicates(
    [4,3,2,7,8,2,3,1]
))