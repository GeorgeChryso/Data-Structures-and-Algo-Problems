
//let us first create a segment tree that counts the numbers of zeroes in a range, and finds the k-th zero on a range.

class STnode{
    constructor(l,r){
        this.l=l,this.r=r,this.val=0,this.totalZeroes=0
        this.leftChild,this.rightChild
        this.extend()
    }
    update(){
        this.totalZeroes=this.leftChild.totalZeroes+this.rightChild.totalZeroes
    }
    extend(){
            if(this.l===this.r)
                return this.totalZeroes=Number(A[this.l]===0)
            // only create a left and right child when l+1<r 
            let mid=this.l+this.r>>1
            this.leftChild=new STnode(this.l,mid)
            this.rightChild=new STnode(mid+1,this.r)
            this.update()
    }
    pointUpdate(i,val){ //change value of an index
        if(this.l===this.r)
           return this.totalZeroes=Number(val===0)
        if(this.leftChild)
            if(i<=this.leftChild.r)
                this.leftChild.pointUpdate(i,val)
            else
                this.rightChild.pointUpdate(i,val)
        this.update()
    }
    rangeQuery(lo,hi){ //number of zeroes in a range
        if(lo<=this.l && this.r<=hi)//inside bounds
            return this.totalZeroes
        if(lo>this.r||hi<this.l)
            return 0
        return this.leftChild.rangeQuery(lo,hi)+this.rightChild.rangeQuery(lo,hi)
    }   
    // find the kth zero of the WHOLE ARRAY, not a subsegment of it 
    // returns the index where the k-th 0 is located in the original array
    findKthZero(k){ // K>=1
        if(k>this.totalZeroes)
            return -1
        if(this.l===this.r)
            return this.l
        if(this.leftChild.totalZeroes>=k)
            return this.leftChild.findKthZero(k)
        else
            return this.rightChild.findKthZero(k-this.leftChild.totalZeroes)
    }
    //find the k-th zero in a range of the array instead 
    // returns -1 if there isnt an answer, or the index of the k-th zero in a range
    findKthZeroInARange(lo,hi,k){
        let prevTotal=this.rangeQuery(0,lo-1)
        let result=this.findKthZero(k+prevTotal)
        if(result>hi)
            return -1
        return result
    }
    
}
let A=[0,0,1,0,0,0,1],n=A.length
let S=new STnode(0,n-1)
for(let i=0;i<n;i++)
    S.pointUpdate(i,A[i])
// console.log(S.rangeQuery(0,n-1))

console.log(S.findKthZeroInARange(4,5,9))
