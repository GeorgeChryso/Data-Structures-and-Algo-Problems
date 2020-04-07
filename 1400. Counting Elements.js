// Given an integer array arr, count element x such that x + 1 is also in arr.

// If there're duplicates in arr, count them seperately.


// 1 <= arr.length <= 1000
// 0 <= arr[i] <= 1000

var countElements = function(arr) {
    let memo=new Set()
    let result=0
    arr.forEach(d=>memo.add(d))
    arr.forEach(d=>result+=(memo.has(d+1)))
    return result
};