
// var largestNumber = function(A, target) {
//     let B = [...Array(A.length + 1)].map(d =>
//         [...Array(target + 1)].map(q => null)
//     );
//     B[0][0] = '';
//     let result = 0;
//     let calc = (a, b) => {
//         if (!a && !b) return '';
//         if (!a) return b;
//         if (!b) return a;
//         if (a.length > b.length) return a;
//         if (b.length > a.length) return b;

//         let i = 0;
//         while (a[i] == b[i]) i++;

//         if (i === a.length) return a;
//         if (a[i] > b[i]) return a;
//         return b;
//     };
//     for (let i = 1; i <= A.length; i++) {
//         for (let j = 0; j <= target ; j++) {
//             if (j - A[i - 1] >= 0) {

//                 B[i][j] =
//             } else {
//                 B[i][j] = B[i - 1][j];
//             }
//         }
//     }
//     B.forEach(d=>console.log(d+''))
//     return B[B.length-1][B[0].length-1]
//     return result.toString();
    
//     let B= [Array(target+1)].map(d=>0)
//     for(let i = 0; i <= target; i++){ 
//         for(let j = 0; j <A.length; j++){ 
//             if(A[j] <= i){ 
//                 B[i] = max(B[i], B[i - wt[j]] +  
//                             A[j]); 
//             } 
//         } 
//     } 
//     return dp[W]; 

// };