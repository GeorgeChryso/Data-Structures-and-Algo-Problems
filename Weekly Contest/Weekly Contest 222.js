
class SegTree{
    constructor(l,r,A,operation){
        this.leftmost=l,this.rightmost=r
        this.rightChild,this.leftChild
        this.nodeVal
        //change these for different operations
        this.operation=operation
        this.sentinel=0

        //create the subtrees
        if(l==r)
            this.nodeVal=A[l]
        else{
            let mid=l+((r-l)>>1)
            this.leftChild=new SegTree(this.leftmost,mid,A,operation)
            this.rightChild=new SegTree(1+mid,this.rightmost,A,operation)
            this.recalc()
        }
    }

    recalc(){
        if(this.leftmost!==this.rightmost)
            this.nodeVal=this.operation(this.leftChild.nodeVal,this.rightChild.nodeVal)
    }
    pointUpdate(index,newVal){
        if(this.leftmost==this.rightmost)
            return this.nodeVal=newVal
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
            return this.nodeVal
        // partially covered
        return this.operation(this.leftChild.rangeOperation(left,right),this.rightChild.rangeOperation(left,right))
    }
}

var minOperations = function(T, A) {
    let seen=new Set(T),res=0,originalIndex={},n=T.length
    A=A.filter(d=>seen.has(d))
    for(let i=0;i<T.length;i++)
        originalIndex[T[i]]=i
    let st=new SegTree(0,n-1,[...Array(n)].map(d=>0),(a,b)=>Math.max(a,b))
    st.sentinel=0

    for(let i=0;i<A.length;i++){
       let idx=originalIndex[A[i]],
           currlcs=st.rangeOperation(idx,idx)
       if(idx==0)
            st.pointUpdate(idx,1)
       else{    
            let maxSoFar=st.rangeOperation(0,idx-1)
            if(currlcs<maxSoFar+1)
                st.pointUpdate(idx,maxSoFar+1)
       }
       res=Math.max(res,st.rangeOperation(idx,idx))
    }
    return  T.length-res
};


console.log(
    minOperations([6,4,8,1,3,2],
        [4,7,6,2,3,8,6,1])
)