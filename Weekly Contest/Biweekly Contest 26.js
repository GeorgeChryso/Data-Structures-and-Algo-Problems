// var maxPower = function(s) {
//     let result = 1;
//     let curr = 1;
//     let str = s[0];
//     for (let i = 0; i < s.length; i++) {
//         if (str !== s[i]) {
//             result = Math.max(result, curr);
//             str = s[i];
//             curr = 1;
//         } else if (i !== 0) curr++;
//     }
//     result = Math.max(result, curr);

//     return result;
// };

// var simplifiedFractions = function(n) {
//     if (n === 1) return [];

//     let memo = new Set();
//     let result = [];
//     for (let i = 2; i <= n; i++) {
//         for (let j = 1; j < i; j++) {
//             if (!memo.has(Number.parseFloat(j / i))) {
//                 result.push(String(j) + '/' + String(i));
//                 memo.add(Number.parseFloat(j / i));
//             }
//         }
//     }
//     return result;
// };

// var goodNodes = function(root) {
//     let result = 0;

//     let dfs = (node, max) => {
//         if (node === null) return;
//         if (node.val >= max) {
//             console.log(node.val);
//             max = node.val;
//             result++;
//         }
//         if (node.left) dfs(node.left, max);
//         if (node.right) dfs(node.right, max);
//     };
//     dfs(root, -Infinity);
//     return result;
// };

// // var largestNumber = function(A, target) {
// //     let B = [...Array(A.length + 1)].map(d =>
// //         [...Array(target + 1)].map(q => null)
// //     );
// //     B[0][0] = '';
// //     let result = 0;
// //     let calc = (a, b) => {
// //         if (!a && !b) return '';
// //         if (!a) return b;
// //         if (!b) return a;
// //         if (a.length > b.length) return a;
// //         if (b.length > a.length) return b;

// //         let i = 0;
// //         while (a[i] == b[i]) i++;

// //         if (i === a.length) return a;
// //         if (a[i] > b[i]) return a;
// //         return b;
// //     };
// //     for (let i = 1; i <= A.length; i++) {
// //         for (let j = 0; j <= target ; j++) {
// //             if (j - A[i - 1] >= 0) {

// //                 B[i][j] =
// //             } else {
// //                 B[i][j] = B[i - 1][j];
// //             }
// //         }
// //     }
// //     B.forEach(d=>console.log(d+''))
// //     return B[B.length-1][B[0].length-1]
// //     return result.toString();
    
// //     let B= [Array(target+1)].map(d=>0)
// //     for(let i = 0; i <= target; i++){ 
// //         for(let j = 0; j <A.length; j++){ 
// //             if(A[j] <= i){ 
// //                 B[i] = max(B[i], B[i - wt[j]] +  
// //                             A[j]); 
// //             } 
// //         } 
// //     } 
// //     return dp[W]; 

// // };


var largestNumber = function(A, target) {
    let B= [...Array(target+1)].map(d=>'')
    let calc = (a, b) => {
        if (a.length> b.length) return a
        if (b.length> a.length) return a

        for (let i = 0; i < a.length; ++i) {
            if (a[i] == b[i]) continue;
            return a[i] > b[i]?a:b;
        }
        return a;
    };

    for(let i = 0; i <= target; i++){ 
        for(let j = 0; j <A.length; j++){ 
            
            if(A[j] <= i){ 
                if (j< A[i] || B[j - A[i]] == "") continue;
                B[i] =calc(String(j+1)+B[i - A[j]], B[i])
            } 
        } 

    } 

    return B[target]; 
};
console.log(largestNumber([4, 3, 2, 5, 6, 7, 2, 5, 5], 9));
console.log(largestNumber([7,6,5,5,5,6,8,7,8],  12    ));
console.log(largestNumber([6,10,15,40,40,40,40,40,40],47   ));
