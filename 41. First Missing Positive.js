
// Given an unsorted integer array, find the smallest missing positive integer.

// Example 1:

// Input: [1,2,0]







// constant EXTRA space, so i m gonna alter my array
// intuition: The indexes of my array are already a memo i can utilize,
// If i save the number corresponding to that index i m golden
// O(n), cos i visit each cell at most twice, and Constant extra space, cos i m only using my array
var firstMissingPositive = function(nums) {
    let n=nums.length
    // put each nums[i]= i+1, ignore the rest of the numbers (aka <=0 ||>n)
    for (let i = 0; i < n; i++){
        let tosort=nums[i]
        while(tosort>=1&&tosort<=n&&nums[tosort-1]!==tosort){
            let temp=tosort
            tosort=nums[tosort-1]
            nums[temp-1]=temp
        }
    }
    // the first number out of place is the result
    for (var i = 0; i <n; i++) 
        if(nums[i]!=i+1)
            return i+1       
    return n+1
};



console.log(
    firstMissingPositive(
        [7,8,9,11,12,1,2,5,3,6,10,13]
    )
)