// Given an array nums, we call (i, j) an important reverse pair if i < j and nums[i] > 2*nums[j].

// You need to return the number of important reverse pairs in the given array.

//O(n^2) TLE
var reversePairs = function(nums) {
    let result=0
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            result+=Number(nums[i]>2*nums[j])      
        }
    }
    return result
};



var reversePairs = function(A) {
    let result=0,n=A.length
    if(n<=1)
        return 0
    let originalIndex={}
    let B=Array.from(new Set(A)).sort((a,b)=>a-b)
    B.forEach((d,i)=>originalIndex[d]=i+1)
    let BIT=new FenwickTree([...Array(B.length+1)].map(d=>0),(a,b)=>a+b,(a,b)=>a+b)
    for(let i=0;i<n;i++){
        if(2*A[i]+1<=B[B.length-1]){
            let target=2*A[i]+1
            let lo=0,hi=B.length-1
            while(lo<hi){
                let mid=lo+hi>>1
                if (B[mid]<target)
                    lo=mid+1
                else 
                    hi=mid
            }
            result+=BIT.rangeOperation( originalIndex[B[lo]],B.length+1)
        }
        BIT.pointUpdate(originalIndex[A[i]],1)
    }

    return result
};
class FenwickTree{
    constructor(arr,operation,updateOperation){
        this.op=operation
        this.upOp=updateOperation
        //the tree will be 1 indexed, so we 
        this.tree=[null,...arr]
        //construction of the tree in O(n)
        for (let i = 1; i < this.tree.length; i++) {
            let j=i+this.rightMostSetBit(i)
            if(j<this.tree.length)
                this.tree[j]=this.op(this.tree[j],this.tree[i])            
        }
    }
    // returns the rightmostsetbit value of the index
    rightMostSetBit=(i)=>i&(-i) 
    // gives the operation of the interval [0,index]
    operation=(index)=>{    
        let sum=0
        while(index)
            sum=this.op(sum,this.tree[index]),
            index-=this.rightMostSetBit(index)
        return sum
    }
    // operates on the ith element by  val
    pointUpdate=(index,val)=>{
        // while(index<this.tree.length)
        //     this.tree[index]=this.upOp(this.tree[index],val),
        //     index+=this.rightMostSetBit(index)
        for (index; index < this.tree.length; index += index & -index)
            this.tree[index] += val;
    }
    //sets the value of the i-th element to be val
    pointSet=(i,val)=>{
        let oldVal=this.operation(i)-this.operation(i-1)
        this.pointUpdate(i,val-oldVal)
    }

    // RANGE UPDATE AND  POINT QUERY
    // if i do this then after that only POINT queries are correct.
    // Increments the value of everything in the range [left,right], 
    // but fails to do operations on intervals. Just operation works. 
    // so operation[i]=operation[i]+val when lefT<=i<=right
    rangeUpdate=(left,right,val)=>{ 
        this.pointUpdate(left,val)
        this.pointUpdate(right+1,-val)
    }
    rangeOperation=(l,r)=>{
        return this.operation(r)-this.operation(l-1)
    }
    //  reverse of operation, only works for positive values 
    // Essentially means: find if there exists an interval [0,idx] such that Prefix[idx]=val
    findIndexWithValue=(val)=>{ 
        let idx=0,
            bitMask=1<<(Math.log2(this.tree.length)) //the leftmost set bit 
        while(bitMask){
            let midpoint=idx+bitMask
            bitMask>>=1 //halve it 
            if(midpoint>=this.tree.length)
                continue
            if(this.tree[midpoint]===val)
                return midpoint
            else if (val>this.tree[midpoint]) //NOTE: if you think there are multiple indices with same val and want to return the Biggest index with that val, switch this to >=
                idx=midpoint,
                val-=this.tree[midpoint]
        }
        if(val!=0)
            return -1
        return idx
    }
}

console.log(
    reversePairs(
        [1,3,2,3,1]
    )
)
console.log(
    reversePairs(
        [1,2,1,2,1]
    )
)
