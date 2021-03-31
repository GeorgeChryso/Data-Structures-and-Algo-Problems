// we have the normal range sum Segment tree and we re looking for the index where the prefix is >= query amount

class SegTree{
    constructor(l,r,A,operation){
        this.leftmost=l,this.rightmost=r,this.sum,
        this.mid=l+((r-l)>>1)
        //change these for different operations
        this.operation=operation,this.sentinel=0
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
            return this.sum+=newVal
        if(index<=this.mid)
            this.leftChild.pointUpdate(index,newVal)
        else
            this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }

    rangeQuery=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost)
            return this.sentinel
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.sum
        // partially covered
        return this.operation(this.leftChild.rangeQuery(left,right),this.rightChild.rangeQuery(left,right))
    }
    //given a prefix x,seach for the array index where the index is >=prefix
    seachPrefixIndex=(x)=>{
        if(this.sum<x)
            return -1
        if(this.leftmost==this.rightmost)
            return this.leftmost
        if(this.leftChild.sum>=x)
            return this.leftChild.seachPrefixIndex(x)
        else
            return this.rightChild.seachPrefixIndex(x-this.leftChild.sum)
    }
}

let addition=(a,b)=>a+b

let A=[1,12,1,73,1,33,12],n=A.length
let st=new SegTree(0,n-1,A,addition)
console.log(st.rangeQuery(0,n-1))
console.log(st.seachPrefixIndex(34))//returns 3