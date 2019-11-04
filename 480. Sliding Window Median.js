// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.

// Examples:
// [2,3,4] , the median is 3

// [2,3], the median is (2 + 3) / 2 = 2.5

// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Your job is to output the median array for each window in the original array.


var medianSlidingWindow = function(A, K) {
    if (K%2==0) {
        var result=[]
        var currSum=0
        
        for (let i = 0; i < K; i++) {
            currSum+=A[i]
        }
        result.push(currSum/K)
        
        for (let i = K; i < A.length; i++) {
                currSum+=A[i]
                currSum-=A[i-K]  
                result.push(currSum/K)      
        }
        
        return result
    }
    else{
        var result=[]
        
        for (let i = K-1; i < A.length; i++) {
            var sort=A.slice(i-K+1,i+1).sort((a,b)=>a-b)
            result.push(sort[(sort.length-1)/2])
        }



        return result
    }
};

console.log(medianSlidingWindow(
  // [1,3,-1,-3,5,3,6,7],3
  // [1,4,2,3],4
  // [7,0,3,9,9,9,1,7,2,3],6
))
