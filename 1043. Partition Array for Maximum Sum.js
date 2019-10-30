// Given an integer array A, you partition the array into (contiguous) subarrays of length 
//at most K. 
// After partitioning, each subarray has their values changed to become the maximum value of that subarray.

// Return the largest sum of the given array after partitioning.

 

// Example 1:

// Input: A = [1,   15 ,9,2,5,10], K = 3
// Output: 84
// Explanation: A becomes [15,15,15,9,10,10,10]




// function maxSumAfterPartitioning( A,  K) {
//     var N = A.length,
//         dp=new Array(N).fill(0) // edw apothi

//     for (let i = 0; i < N; i++) {
//         var curMax = 0;
//         // tha dokimasw na antikatastisw ola ta pithana k me ton arithmo poy thelw
//         console.log('i='+i,'dp= ['+dp+']    A= ['+A+']')
//         for (let k = 1; k <= K && i - k + 1 >= 0; k++) {
//                       console.log('   k='+k+'\n'+'    dp= ['+dp+']' +'\n' )
//                       console.log('    curMax= Max('+curMax+', A['+(i+k-1)+']='+A[i-k+1]+') = '+Math.max(curMax, A[i - k + 1])+'\n')

//             curMax = Math.max(curMax, A[i - k + 1]);
        
//                     console.log('   dp['+i+']= Max('+dp[i]+','+(i-k >=0 ? dp[i - k] : 0)+'+curMax*k ('+curMax*k+')) = '+ Math.max(dp[i],
//                         (i-k >=0 ? dp[i - k] : 0) + curMax * k)+'\n' )
//             dp[i] = Math.max(dp[i],
//                  (i-k >=0 ? dp[i - k] : 0) + curMax * k);
//                       console.log('    dp= ['+dp+']'   +'\n   -----------------')
//         }
//     }
//     return dp[N - 1];
// }

var maxSumAfterPartitioning = function(A, K) {
    let dp =  Array(A.length+1).fill(0);


    for (var i in dp) {

        let maximum=0
        let stop=Math.min(i,K) // I can move back until i-stop elements


        for (let j = 1 ; j <=stop ; j++) {

                maximum=Math.max(maximum, A[i-j])
                
                dp[i] = Math.max(dp[i], dp[i - j] + maximum * j);
        }



    }
    return dp[A.length];
}; 


// var maxSumAfterPartitioning = function(a, k) {    
//     let dp = a.slice(); // a copy of the array
//     dp.push(0); 
//     for (let i = a.length-1; i--; ) {
//         let best = -1;
//         let max = a[i];

//         for (let j = i, end = Math.min(i+k, a.length); j < end; j++) {
//             max = Math.max(max, a[j]);
//             best = Math.max(best, max*(j-i+1) + dp[j+1]);
//         }
//         dp[i] = best;
//     }
//     return dp[0];
// };
console.log(
    maxSumAfterPartitioning(
        [5,2,7,8,3,1,9],3
    )
)

