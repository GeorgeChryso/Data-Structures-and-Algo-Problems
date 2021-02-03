// Write an efficient algorithm that searches for a target value in an m x n integer matrix. The matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.



// Divide and Conquer on its purest form


// Essentially, we split the matrix into 4 regions

/*

        1 | 2
        -----       
        3 | 4
    and we look at the middle element MID

    if(MID > T)
        we discard zone 4 because everything in zone 4 is bigger than mid
    if(MID < T)
        we discard zone 1 because everything in zone 1 is smaller than mid
    if(MID==T)
        return
*/

// O( (MN)^(log(4)3)
var searchMatrix = function(A, T) {
    let n=A.length,m=A[0].length
    let DC=(i1,j1, i2,j2)=>{
        if(i1==n||j1==m || i1 >i2 || j1>j2)
            return false
        if(i1===i2&&j1===j2)
            return A[i1][j1]===T
        //            find the middle element
        let iMid=i1+i2>>1,jMid=j1+j2>>1,MID=A[iMid][jMid]
        if(MID===T)
            return true   
        else if(MID > T) //R1||R2||R3
            return DC(i1,j1,iMid,jMid)||DC(i1,jMid+1,iMid,j2) ||DC(iMid+1,j1,i2,jMid)
        else    //R2||R3||R4
            return DC(i1,jMid+1,iMid,j2) ||DC(iMid+1,j1,i2,jMid) ||DC(iMid+1,jMid+1,i2,j2)
    }
    return DC( 0,0,n-1,m-1 )
};
