// 1131. Maximum of Absolute Value Expression

// Given two arrays of integers with equal lengths, return the maximum value of:

// |arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|

// where the maximum is taken over all 0 <= i, j < arr1.length.

// O(n*n)
var maxAbsValExpr = function(arr1, arr2) {
    let result=0
    for (let i = 0; i < arr1.length; i++) {
        for (let j = i+1; j < arr1.length; j++) {
            result=Math.max(result,Math.abs(i-j)+Math.abs(arr1[i]-arr1[j])+Math.abs(arr2[j]-arr2[i]))
        }        
    }
    return result
};

//todo chebyschev distance