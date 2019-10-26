// Given a binary matrix A, we want to flip the image horizontally, then invert it, and return the resulting image.

// To flip an image horizontally means that each row of the image is reversed.  For example, flipping [1, 1, 0] horizontally results in [0, 1, 1].

// To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For example, inverting [0, 1, 1] results in [1, 0, 0].


var flipAndInvertImage = function(A) {
    
 A.forEach((d,i)=>{
     var q=[]
     d.forEach((k,j)=>{
        q.unshift(Number(!k))
     })
     A[i]=q
 })

 return A
};