// In a row of dominoes, A[i] and B[i] represent the top and bottom halves of the ith domino.  (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

// We may rotate the ith domino, so that A[i] and B[i] swap values.

// Return the minimum number of rotations so that all the values in A are the same, or all the values in B are the same.

// If it cannot be done, return -1.

// 2 can be the winning elements
// A[0], or B[0]
// If so, I want the minimum out of 
// Taking all A[0] to A :xA
// Taking all A[0] to B :xB
// Taking all B[0] to A :yA
// Taking all B[0] to B :yB

// the Algorithm takes O(N) runtime where N is the length of A
// and O(1) space
var minDominoRotations = function(A, B) {
    let n=A.length,xA=0,yA=0,xB=0,yB=0
    for(let i=0;i<n;i++){
        if(A[i]!==A[0]&&B[i]!==A[0])
            xA=Infinity,xB=Infinity
        if(A[i]!==B[0]&&B[i]!==B[0])
            yA=Infinity,yB=Infinity
        xA+=(B[i]==A[0]&&A[i]!==A[0])
        yA+=(B[i]==B[0]&&A[i]!==B[0])
        xB+=(A[i]==A[0]&&B[i]!==A[0])
        yB+=(A[i]==B[0]&&B[i]!==B[0])
        
    }
    let res=Math.min(xA,yA,xB,yB)
    return res==Infinity?-1:res
}; 