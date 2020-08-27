    	
// The old song declares "Go ahead and hate your neighbor", and the residents of Onetinville have taken those words to heart. Every resident hates his next-door neighbors on both sides. Nobody is willing to live farther away from the town's well than his neighbors, so the town has been arranged in a big circle around the well. Unfortunately, the town's well is in disrepair and needs to be restored. You have been hired to collect donations for the Save Our Well fund.

// Each of the town's residents is willing to donate a certain amount, as specified in the int[] donations, which is listed in clockwise order around the well. However, nobody is willing to contribute to a fund to which his neighbor has also contributed. Next-door neighbors are always listed consecutively in donations, except that the first and last entries in donations are also for next-door neighbors. You must calculate and return the maximum amount of donations that can be collected.

 
// Definition
    	
// Class:	BadNeighbors
// Method:	maxDonations
// Parameters:	int[]
// Returns:	int
// Method signature:	int maxDonations(int[] donations)
// (be sure your method is public)
    
 
// Constraints
// -	donations contains between 2 and 40 elements, inclusive.
// -	Each element in donations is between 1 and 1000, inclusive.


var badNeighbors=A=>{
    let n=A.length
    //dp[i]=Max donation with the last donator being the i-th
    // dp[i]= Math.max(dp[j])+A[i], 0<=j<i-1
    // but for dp[A.length-1]=dMath.max(dp[j]+A[i]) 1<=j<i-1

    // I consider 2 arrays instead, 0...n-2 
    // and 1....n-1 to satisfy the circular requirements
    let dp1=[...Array(n)].map(d=>0),result=0
    let dp2=[...Array(n)].map(d=>0)
    //basecase
    dp1[1]=A[0],dp2[1]=A[1]
    for (let i = 1; i <n; i++) {
        for (let j =0; j <i-1; j++) {
            dp1[i]=Math.max(dp1[i],dp1[j]+A[i-1])
            dp2[i]=Math.max(dp2[i],dp2[j]+A[i])
        }     
        result=Math.max(result,dp1[i],dp2[i])
    }
    return result
}

let tests=[
    [10, 3, 2, 5, 7, 8],//19
    [11,15],//15
    [ 7, 7, 7, 7, 7, 7, 7],//21
    [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],//16
    [94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61,  
        6, 237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397,
        52, 72, 37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72]//2926
]

tests.forEach(t=>console.log(badNeighbors(t)))