// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.



// O(lg(M*N))
// map each cell to it's cell's total number
// and binary search from [0,...,MN-1]
// So basically I view the matrix as a sorted array
// And a simple Binary search over that array will determine the answer
var searchMatrix = function(A, target) {
    if(!A)return false
    let n=A.length,m=A[0].length,lo=0,hi=Math.max(n-1,m*n-1) //binary search in range [1,m*n-1]
    while(lo<=hi){
        let mid=(lo+hi)>>1 // can overflow, (lo+ (hi-lo)/2) cant overflow
        let i=((mid)/m)>>0 // finds i
        let j=((mid)-i*(m)) // and j  of the mid-th number
        if(A[i][j]==target)
            return true
        else if(A[i][j]>target)
            hi=mid-1
        else 
            lo=mid+1
    }
    return false
};

// However viewing it as a sorted array, m*n can overflow
// but I can keep the complexity at O(logmn) by doing 2
// binary searches, 1 to determine the row my target can be at
// and 1 to determine whether the candidate is in that row
// Complexity O(logn+ logm)= O(logmn) same complexity, no overflow
var searchMatrix = function(A, target) {
    if(!A||!A.length)return false
    let n=A.length,m=A[0].length

    //find the biggest row such that A[row][0]<target
    let trow=-1,lo=0,hi=n-1
    while(lo<=hi){
        let mid=lo+((hi-lo)>>1)
        if(A[mid][0]==target)
            return true
        else if(A[mid][0]>target)
            hi=mid-1
        else {
            trow=Math.max(trow,mid)
            lo=lo+1
        }
    }
    if(trow==-1)
        return false
    // binary search on trow for target
    lo=0
    hi=m-1
    while(lo<=hi){
        let mid=lo+((hi-lo)>>1)
        if(A[trow][mid]==target)
            return true
        else if(A[trow][mid]>target)
            hi=mid-1
        else 
            lo=lo+1
    }
    return false
};



console.log(
searchMatrix(
    [[1,3,5,7],[10,11,16,20],[23,30,34,50]], 3))