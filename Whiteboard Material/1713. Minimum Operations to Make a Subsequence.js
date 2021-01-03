// You are given an array target that consists of distinct integers and another integer array arr that can have duplicates.

// In one operation, you can insert any integer at any position in arr. For example, if arr = [1,4,1,2], you can add 3 in the middle and make it [1,4,3,1,2]. Note that you can insert the integer at the very beginning or end of the array.

// Return the minimum number of operations needed to make target a subsequence of arr.

// A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, [2,7,4] is a subsequence of [4,2,3,7,2,1,4] (the underlined elements), while [2,4,2] is not.



class SegTree{
    constructor(l,r,A,operation){
        this.leftmost=l,this.rightmost=r
        this.rightChild,this.leftChild
        this.sum
        //change these for different operations
        this.operation=operation
        this.sentinel=0
        //create the subtrees
        if(l==r)//leaf
            this.sum=A[l]
        else{
            let mid=l+((r-l)>>1)
            this.leftChild=new SegTree(this.leftmost,mid,A,operation)
            this.rightChild=new SegTree(1+mid,this.rightmost,A,operation)
            this.recalc()
        }
    }

    recalc(){
        if(this.leftmost!==this.rightmost)
            this.sum=this.operation(this.leftChild.sum,this.rightChild.sum)
    }
    pointUpdate(index,newVal){
        if(this.leftmost==this.rightmost)
            return this.sum=newVal
        if(index<=this.leftChild.rightmost)
            this.leftChild.pointUpdate(index,newVal)
        else
            this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }
    rangeUpdate(L,R,val){

    }
    rangeOperation=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost)
            return this.sentinel
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.sum
        // partially covered
        return this.operation(this.leftChild.rangeOperation(left,right),this.rightChild.rangeOperation(left,right))
    }
}

var minOperations = function(T, A) {
    let seen=new Set(T),res=0,originalIndex={},n=T.length
    //filter out all the unnecessary values
    A=A.filter(d=>seen.has(d))
    for(let i=0;i<T.length;i++)
        originalIndex[T[i]]=i //maintain the original indices of the values in T

    // Create a Range Maximum Query Segment tree
    let st=new SegTree(0,n-1,[...Array(n)].map(d=>0),(a,b)=>Math.max(a,b))
    st.sentinel=0

    for(let i=0;i<A.length;i++){ //for each value
       let idx=originalIndex[A[i]],
           currlcs=st.rangeOperation(idx,idx) //determine the lcs at that idx in my array
       if(idx==0) //if it's the first element, that means that its lcs is 1 
            st.pointUpdate(idx,1)
       else{ 
            //determine the maximum lcs ending at some previous index   
            let maxSoFar=st.rangeOperation(0,idx-1) 
            if(currlcs<maxSoFar+1) // and update the current index 
                st.pointUpdate(idx,maxSoFar+1)
       }
       res=Math.max(res,st.rangeOperation(idx,idx))
    }
    return  T.length-res
};
