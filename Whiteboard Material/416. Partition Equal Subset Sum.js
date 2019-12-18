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
    //calculate the sum of my Array
    var sumA=A.reduce((acc,curr)=>acc+curr)

    if(sumA%2)return false

    //create Rows
    // i want a row for each of my candidate elements+ one for my 
    // 0th element( no element ) which I know for a fact can add up to 0 if selected
    var dp=new Array(A.length+1).fill(null)
    
    // create Columns
    // My final total sum ranges from 0 to sumA, which are totally sumA+1 candidates
    dp=dp.map(d=>Array(sumA+1).fill(0))
    
    // now that the matrix is created i have to use my base case which is: 
    // The number of ways I can end up with sum=0 by using 0 items is 1 ways: just by selecting the 0th item (doesnt exist, which means i just take no item at all)
     dp[0][0]=1

     //now let's see what I actaully want to find
     //if there is ANY subset, that adds Up to sumA/2
     //so that would mean ANY element of the column A/2, that would be dp[;][A/2]

     //now, theoretically, I could fill the whole board and then check my column but that's BOOOOOOOOOOORING
     // so let's look at my formula again
     // dp[i][j]=dp[i-1][j]+dp[i-1][j-A[i-1]]

};