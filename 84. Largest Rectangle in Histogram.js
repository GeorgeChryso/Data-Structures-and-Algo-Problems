// Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.






// Intuition: At any given index i, we can say A[i] is the height of the current rectangle we re examining.
// This rectangle starts on some index j, such that j is of course less than i , j<i
// This index j , has to be the first index on the left of i, such that A[j]<A[i], otherwise the length of my current rectangle cannot be A[i].
// Same goes for the end index of my rectangle. It has to be the first index on the right of i, lets say k>i such that A[i]>A[k]


//O(n^2) TLE
//Essentally for Each element, i m searching its leftmost and rightmost FIRST smaller elements.
// Them a max area will of course be H[i](indexofRightmostSmaller-indexofLeftmostSmaller -1)
// However this is TLE
var largestRectangleArea = function(H) {
    if(!H.length)return 0

    var MaxAreaIndexCanGive=Array(H.length)
    for (var i in H) {
        var leftLow= Number(i)
        var rightLow= Number(i)
        while(H[i]<=H[leftLow]&&leftLow>=0)leftLow--
        while(H[i]<=H[rightLow]&&rightLow<=H.length)rightLow++

        MaxAreaIndexCanGive[i]= H[i]*(rightLow==leftLow?1:(rightLow-leftLow-1))
    }

    return Math.max(...MaxAreaIndexCanGive)
};


console.log(largestRectangleArea(
    
    
    [1,1]   
   // [2,1,5,6,2,3]
))