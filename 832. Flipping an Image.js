// Given a binary matrix A, we want to flip the image horizontally, then invert it, and return the resulting image.

// To flip an image horizontally means that each row of the image is reversed.  For example, flipping [1, 1, 0] horizontally results in [0, 1, 1].

// To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For example, inverting [0, 1, 1] results in [1, 0, 0].


var flipAndInvertImage = function(A) {
    
 for (let i = 0; i < A.length; i++) {
    
    var l=A[i].length%2?Math.floor(A[i].length/2):(-1+A[i].length/2)
  
    for (let j = 0; j <= l ; j++) {
        var temp=A[i][j]
        A[i][j]=A[i][A[i].length-1-j]^1
        A[i][A[i].length-1-j]=temp^1
    }

 }     
 
    
 

 return A
};

console.log(flipAndInvertImage(
    [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
))