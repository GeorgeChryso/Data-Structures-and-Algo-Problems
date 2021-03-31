// we have the normal range sum Segment tree and we re looking for the index where the prefix is >= query amount

class dataNode{
    constructor(val=0){
        this.sum=val,
        this.maxPrefixSum=this.maxSuffixSum=val
        this.maxSubSegmentSum=Math.max(val,0)
    }
}
function combine(leftData,rightData){
    let resultData=new dataNode()
    resultData.sum=leftData.sum+rightData.sum
    resultData.maxPrefixSum=Math.max(leftData.maxPrefixSum,leftData.sum+rightData.maxPrefixSum)
    resultData.maxSuffixSum=Math.max(rightData.maxSuffixSum,rightData.maxSuffixSum+leftData.sum)
    resultData.maxSubSegmentSum=Math.max(leftData.maxSubSegmentSum,rightData.maxSubSegmentSum,leftData.maxSuffixSum+rightData.maxPrefixSum)
    return resultData
}
class SegTree{
    constructor(l,r,A,operation){
        this.leftmost=l,this.rightmost=r,this.sum,
        this.mid=l+((r-l)>>1)
        //change these for different operations
        this.operation=operation,this.sentinel=0
        //create the subtrees
        this.maxPrefixSum=0
        this.maxSuffixSum=0
        this.maxSubSegmentSum=0

        if(l==r)//leaf
            this.sum=A[l],
            this.maxPrefixSum=A[l],
            this.maxSuffixSum=A[l],
            this.maxSubSegmentSum=Math.max(A[l],0)
        else{
            let mid=l+((r-l)>>1)
            this.leftChild=new SegTree(this.leftmost,mid,A,operation)
            this.rightChild=new SegTree(1+mid,this.rightmost,A,operation)
            this.recalc()
        }
    }
    rangeMaxSubsegSumQuery=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>right)
            return new dataNode(0)
        // entirely covered
        if(left===this.leftmost&&this.rightmost===right){
            let res=new dataNode(0)
            res.sum=this.sum
            res.maxPrefixSum=this.maxPrefixSum
            res.maxSuffixSum=this.maxSuffixSum
            res.maxSubSegmentSum=this.maxSubSegmentSum
            return res
        }
        // partially covered
        // heres the geh part 
        let L=this.leftChild.rangeMaxSubsegSumQuery(left,Math.min(right,this.mid)),
            R=this.rightChild.rangeMaxSubsegSumQuery(Math.max(left,this.mid+1),right)
        return combine(L,R)
    }
    recalc(){
        if(this.leftmost!==this.rightmost)
            this.sum=this.operation(this.leftChild.sum,this.rightChild.sum),
            this.maxPrefixSum=Math.max(this.leftChild.maxPrefixSum,this.leftChild.sum+this.rightChild.maxPrefixSum,this.leftChild.sum+this.rightChild.sum),
            this.maxSuffixSum=Math.max(this.rightChild.maxSuffixSum,this.rightChild.sum+this.leftChild.maxSuffixSum,this.leftChild.sum+this.rightChild.sum),
            this.maxSubSegmentSum=Math.max(this.leftChild.maxSubSegmentSum,this.rightChild.maxSubSegmentSum,
                this.leftChild.maxSuffixSum+this.rightChild.maxPrefixSum)

    }

    // USABLE


    pointUpdate(index,newVal){
        if(this.leftmost==this.rightmost)
            return this.sum=newVal
        if(index<=this.mid)
            this.leftChild.pointUpdate(index,newVal)
        else
            this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }
    rangeSumQuery=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost||left>right)
            return 0
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.sum
        // partially covered
        return this.leftChild.rangeSumQuery(left,right)+this.rightChild.rangeSumQuery(left,right)
    }

    //maximum sum subarray in a range
    //to answer these queries tho, we ll have to create a new class
    // DOES WORK WITH NEGATIVES, CAN CHOOSE AN EMPTY SUBARRAY (for sum=0)
    rangeMaxSubsegQueryUsable=(left,right)=>{
        return this.rangeMaxSubsegSumQuery(left,right).maxSubSegmentSum
    }

    //given a prefix x,seach for the array index, where the prefix[index] >=x
    // DOES NOT WORK WITH NEGATIVES INSIDE THE ARRAY
    seachPrefixIndex=(x)=>{
        console.log(this.sum)
        if(this.sum<x)
            return -1
        if(this.leftmost===this.rightmost)
            return this.leftmost
        if(this.leftChild.sum>=x)
            return this.leftChild.seachPrefixIndex(x)
        else
            return this.rightChild.seachPrefixIndex(x-this.leftChild.sum)
    }
    // DOES NOT WORK WITH NEGATIVES INSIDE THE ARRAY
    //we can extend this to search for an index and a prefix in a specific range
    searchPrefixInRange=(l,r,x)=>{
        let prevSum=this.rangeSumQuery(0,l-1)
        let res=this.seachPrefixIndex(prevSum+x)
        if(this.sum<x||res>r)
            return -1
        return res
    }
}

let addition=(a,b)=>a+b

let A=[100,100,-1200,2,1,73,1,-303,1,12],n=A.length
let st=new SegTree(0,n-1,A,addition)
console.log(st.rangeMaxSubsegQueryUsable(2,3))
console.log(st.seachPrefixIndex(1000))//DOESNT WORK BECAUSE ARRAY A HAS NEGATIVES
