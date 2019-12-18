// Given a non-empty array containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

// Note:

// Each of the array element will not exceed 100.
// The array size will not exceed 200.




// Let us see what we seek: Whether (boolean) there is a pair of partition subsets
// A1,A2, such that sum(A1)=sum(A2)
//  now let's advance what we seek to a clearer formula
//  I know that sumA1 + sumA2= sumA
//  so 2*sumA1=sumA since sumA1=sumA2
//  so sumA1=sumA/2
// that means I seek a subset of my current set so that it equals the sum of all my elements divided by two, 
// From that I can deduce that the sum of all my elements must be divisible by two
// so It must be even, or there is no such subset
 
// Ok so this is apparently another knapsack problem which DP can handle. 
// I will create a matrix of N rows (for each Item I can potentially use)
// and M columns (all the possible results of the sum of my item selection)

// The dp relies on the intuition that: On my final selecion, I can Either choose an Item, or Ignore it, hence each cell of my dp matrix will represent 
// dp[i][j] : The total number of ways sum J can be reached using the first i items
// dp[i][j]=dp[i-1][j]+dp[i-1][j-A[i-1]]
// that means: the Number of ways i can reach sum J with the first i items is the sum of:
// the number of ways I can reach the same sum with the previous i-1 elements (which basically means I didnt choose the i-th item)
// plus
// the number of ways I can reach the same sum minus the sum of the i-1th item , which means that I chose the last item in order to get to my sum J 
var canPartition = function(A) {
    
};