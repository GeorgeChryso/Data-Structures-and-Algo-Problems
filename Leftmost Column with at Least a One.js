// (This problem is an interactive problem.)

// A binary matrix means that all elements are 0 or 1. For each individual row of the matrix, this row is sorted in non-decreasing order.

// Given a row-sorted binary matrix binaryMatrix, return leftmost column index(0-indexed) with at least a 1 in it. If such index doesn't exist, return -1.

// You can't access the Binary Matrix directly.  You may only access the matrix using a BinaryMatrix interface:

// BinaryMatrix.get(x, y) returns the element of the matrix at index (x, y) (0-indexed).
// BinaryMatrix.dimensions() returns a list of 2 elements [n, m], which means the matrix is n * m.
// Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.

// For custom testing purposes you're given the binary matrix mat as input in the following four examples. You will not have access the binary matrix directly.









class B{
    constructor(matrix){
        this.mat=matrix
    }
    dimensions=()=>[this.mat.length,this.mat[0].length]
    get=(x,y)=>this.mat[x][y]

}

let matrices=[
    [[0,0],[1,1]],  //0
    [[0,0],[0,1]], //-1
    [[0,0,0,1],[0,0,1,1],[0,1,1,1]]
]




var leftMostColumnWithOne = function(BinaryMatrix) {
    console.log('\n')
    let [n,m]=BinaryMatrix.dimensions()
    if(n==1){
        if(m==1)return BinaryMatrix.get(0,0)==1?0:-1
    }
    let result=-1

    let hi=m-1
    for (let i = 0; i < n; i++) {
        if(BinaryMatrix.get(i,0)==1)return 0
        let lo=0
        console.log(lo,hi)
        while(lo<=hi){
            let mid=Math.floor(lo+(hi-lo)/2)
            let ele=BinaryMatrix.get(i,mid)
            if(ele==1){
                hi=mid-1
                if (BinaryMatrix.get(i,mid-1)==0){
                    result=mid
                    break
                }
            }
            else{
                lo=mid+1
            }
        }
        hi=result!=-1?result:m-1
    }

    return result
};


for (const matrix of matrices) {
    let BM=new B(matrix)
    console.log(leftMostColumnWithOne(BM))
}