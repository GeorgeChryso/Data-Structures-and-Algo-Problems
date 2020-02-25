// // Given the array arr of positive integers and the array queries where queries[i] = [Li, Ri], for each query i compute the XOR of elements from Li to Ri (that is, arr[Li] xor arr[Li+1] xor ... xor arr[Ri] ). Return an array containing the result for the given queries.
// Example 1:

// Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
// Output: [2,7,14,8] 
// Explanation: 
// The binary representation of the elements in the array are:
// 1 = 0001 
// 3 = 0011 
// 4 = 0100 
// 8 = 1000 
// The XOR values for queries are:
// [0,1] = 1 xor 3 = 2 
// [1,2] = 3 xor 4 = 7 
// [0,3] = 1 xor 3 xor 4 xor 8 = 14 
// [3,3] = 8

//slow but sure, Brute Force
var xorQueries = function(arr, queries) {
    return queries.map(([l,r])=>{
        let final=0
        for (let i =l; i <= r; i++) {
            final^=arr[i]            
        }
        return final
    })
};

// Intuition,XOR applies to Prefix sum for contiguous subarrays 
// [a,b,c,d]
//  b^c^d= (a^b^c^d ) ^ (a)
// so [a^..^b]=[0^...^b]^[0^...^a-1]
var xorQueries = function(arr, queries) {
    let prefixSumXor=[]
    let start=0
    for (let i = 0; i < arr.length; i++) {
        start^=arr[i]
        prefixSumXor.push(start)
    }
    return queries.map(([r,l])=>{
        if(r==l||l==0)return arr[l]
        if(r==0)return prefixSumXor[l]
        return prefixSumXor[l]^prefixSumXor[r-1]
    })
};

console.log(xorQueries(
    [1,3,4,8],  [[0,1],[1,2],[0,3],[3,3]]
))