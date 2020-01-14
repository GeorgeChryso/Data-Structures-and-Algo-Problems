// Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.


//classic dp bottom top
var minimumTotal = function(A) {
    let dp= Array(A[A.length-1].length).fill(null).map((d,i)=>A[A.length-1][i])
    //dp[i] is the minimum sum required to get from dp[i] to the end
    // base case is the the last row as It is and we move bottom to top

    for (let i = A.length-2; i >=0; i--) {
        console.log(dp)
        dp= dp.map((value,j)=>{
            if(j<A[i].length) return Math.min(dp[j],dp[j+1])+A[i][j]
            else return Infinity
          })          
    }

    return dp[0]

};

// let's use no extra space
var minimumTotal = function(A) {

    
    for (let i = A.length-2; i >=0; i--) {
          for (let j = 0; j < A[i].length; j++) {
              A[i][j]+=Math.min(A[i+1][j],A[i+1][j+1])
          }          
    }

    return A[0][0]

};

console.log(minimumTotal(
//     [
//         [2],
//        [3,4],
//       [6,5,7],
//      [4,1,8,3]
//    ]
[[-1],[-2,-3]]
))