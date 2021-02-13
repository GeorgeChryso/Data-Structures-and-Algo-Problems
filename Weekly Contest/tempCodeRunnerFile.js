var maxValue = function(A, K) {
//     A.sort((a,b)=>a[0]===b[0]?a[1]-b[1]:a[0]-b[0])
//     A=A.map(([s,e,val],i)=>[s,e,val,i])
//     let n=A.length,
// 		dp=[...Array(K+1)].map(d=>[...Array(n+1)].map(d=>0)),
//         Z=[...A].sort((a,b)=>a[1]-b[1])
//         console.log(Z)

//     for(let k=1;k<=K;k++ ){
//         let indexOfZ=0,optimalPrevious=0
//         for(let i=1;i<=n;i++){
//             let [start,end,val,idx]=A[i-1]
//             while(indexOfZ<n&& Z[indexOfZ][1]<start ){
//                 let originalIdx=Z[indexOfZ][3] //take the original index it used to have
//                 if(dp[k-1][originalIdx+1]>optimalPrevious)
//                     optimalPrevious=dp[k-1][originalIdx+1]
//                 indexOfZ++
//             }
//             dp[k][i]=Math.max(val+optimalPrevious,dp[k][i]) //main dp computation
//         }
//     }
//     dp.forEach(d=>console.log(d+''))

//     return Math.max(...dp[K])
// };
// console.log(maxValue(
//     [[1,3,4],[2,4,1],[1,1,4],[3,5,1],[2,5,5]],
// 3
// ))
// var maxValue = function(A, K) {
//     A=A.sort((a,b)=>a[0]-b[0]).map(([s,e,val],i)=>[s,e,val,i])
//     let n=A.length,Z=[...A].sort((a,b)=>a[1]-b[1]),dp=[...Array(n)].map(d=>0),prev=[...dp]
//     for(let k=0;k<K;k++,prev=[...dp])
//         for(let i=0,indexOfZ=0,optimalPrevious=0;i<n;i++){
//             while(Z[indexOfZ][1]<A[i][0] &&k>=1 )
//                 optimalPrevious=Math.max(optimalPrevious,prev[Z[indexOfZ++][3]])
//             dp[i]=Math.max(A[i][2]+optimalPrevious,i>=1&&k==K-1?dp[i-1]:-Infinity) //main dp computation
//         }
//     return dp[n-1]
// };

// console.log(maxValue(
//     [[1,3,4],[2,4,1],[1,1,4],[3,5,1],[2,5,5]],
// 3
// ))