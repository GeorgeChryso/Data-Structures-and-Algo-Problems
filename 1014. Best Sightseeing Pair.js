// Given an array A of positive integers, A[i] represents the value of the i-th sightseeing spot, and two sightseeing spots i and j have distance j - i between them.

// The score of a pair (i < j) of sightseeing spots is (A[i] + A[j] + i - j) : the sum of the values of the sightseeing spots, minus the distance between them.

// Return the maximum score of a pair of sightseeing spots.

 

// Example 1:

// Input: [8,1,5,2,6]
// Output: 11
// Explanation: i = 0, j = 2, A[i] + A[j] + i - j = 8 + 5 + 0 - 2 = 11

var maxScoreSightseeingPair = function(A) {
    let max=0
    for (let i = 0; i < A.length; i++) {
        for (let j = i+1; j < A.length; j++) {
            
            max=Math.max(max,A[i]+A[j]+     i-j)
        }
        
    }
    return max
};

// O(N^2)


var maxScoreSightseeingPair = function(A) {
    var cur=0
    var result=0
    for (var a of A) {
        
        result=Math.max(result, cur+a)

        cur=Math.max(cur, a) - 1;

    }

    return result
  };

console.log(maxScoreSightseeingPair(
    [8,1,5,2,6]
))