

// Given n and m which are the dimensions of a matrix initialized by zeros and given an array indices where indices[i] = [ri, ci]. For each pair of [ri, ci] you have to increment all cells in row ri and column ci by 1.

// Return the number of cells with odd values in the matrix after applying the increment to all indices.



// var oddCells = function(n, m, A) {
//     var row=[]
//     for (let i = 0; i < m; i++) {
//         row.push(0)        
//     }
//     var M=[]

//     for (let i = 0; i <n; i++) {
//         M.push(new Array(m).fill(0))        
//     }
  



//     for (let i = 0; i < A.length; i++) {
//         var [r,c]=A[i]        
//         M[r]=M[r].map(d=>d+1)
//         for (let j = 0; j <n; j++) {
//             M[j][c]+=1
//          }
//     }


//     console.log(M)

//     var counter=0
  

//     for (let i = 0; i < M.length; i++) {
//         for (let j = 0; j < M[0].length; j++) {
//             if(M[i][j]%2)counter++
//         }        
//     }
//     return counter
// };

// console.log(
//     oddCells(
//         // 2,2,[[1,1],[0,0]]
//         // 2,3,[[0,1],[1,1]]
//   28,
//   38,
//   [[17,16],[26,31],[19,12],[22,24],[17,28],[23,21],[27,32],[23,27],[23,33],[18,7],[4,20],[0,31],[25,33],[5,22]]
//     )
// )



// 5256. Reconstruct a 2-Row Binary Matrix
// User Accepted:0
// User Tried:0
// Total Accepted:0
// Total Submissions:0
// Difficulty:Medium
// Given the following details of a matrix with n columns and 2 rows :

// The matrix is a binary matrix, which means each element in the matrix can be 0 or 1.
// The sum of elements of the 0-th(upper) row is given as upper.
// The sum of elements of the 1-st(lower) row is given as lower.
// The sum of elements in the i-th column(0-indexed) is colsum[i], where colsum is given as an integer array with length n.
// Your task is to reconstruct the matrix with upper, lower and colsum.

// Return it as a 2-D integer array.

// If there are more than one valid solution, any of them will be accepted.

// If no valid solution exists, return an empty 2-D array.





