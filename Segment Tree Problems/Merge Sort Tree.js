
// can be improved to O(logn) queries using Fractional Cascading, but that requires a Multiset Data Structure- RB tree. 
//find the smallest number in a range, that's greater than or equal to a specified number
// on each vertex we store the entire array it represents, but sorted. 
class SegTree{
    constructor(l,r,A){
        this.leftmost=l,this.rightmost=r,this.arr=[]
        this.mid=l+((r-l)>>1)
        //create the subtrees
        if(l==r)//leaf
            this.arr=[A[l]]
        else{
            let mid=l+((r-l)>>1)
            this.leftChild=new SegTree(this.leftmost,mid,A)
            this.rightChild=new SegTree(1+mid,this.rightmost,A)
            this.recalc()
        }
    }

    recalc(){
        //merge two sorted lists => O(n)
        if(this.leftmost!==this.rightmost){
            this.arr=[]
            let left=0,right=0
            while(left<this.leftChild.arr.length || right<this.rightChild.arr.length){
                if(left<this.leftChild.arr.length&& right<this.rightChild.arr.length)
                    if(this.rightChild.arr[right]<=this.leftChild.arr[left])
                        this.arr.push(this.rightChild.arr[right++])
                    else
                        this.arr.push(this.leftChild.arr[left++])
                else if(left<this.leftChild.arr.length)
                    this.arr.push(this.leftChild.arr[left++])
                else
                    this.arr.push(this.rightChild.arr[right++])
            }
        }
    }
    pointUpdate(index,newVal){
        if(this.leftmost==this.rightmost)
            return this.arr=[newVal]
        if(index<=this.mid)
            this.leftChild.pointUpdate(index,newVal)
        else
            this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }
    //find the smallest element in range that's biggur than target (i can also return its index)
    rangeQuery=(left,right,target)=>{ //inclusive
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost||left>right)
            return Infinity //modify to -1 for the index
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.binarySearchFind(target) 
        // partially covered
        return Math.min(this.leftChild.rangeQuery(left,right,target),this.rightChild.rangeQuery(left,right,target))
    }

    //searches on the array of the vertex for the smallest element that's bigger than or equal to target, returns teh element or Infinity
    binarySearchFind=T=>{
        let lo=0,hi=this.arr.length-1
        while(lo<hi){
            let mid=(lo+hi)>>1
            if(this.arr[mid]>=T)
                hi=mid
            else
                lo=mid+1
        }
        if(this.arr[hi]<T)
            return Infinity
        return this.arr[hi] //return just hi if u want the index 
    }
}

let A=[6,1,2,7,11,16,62,2,13],n=A.length,
    S=new   SegTree(0,n-1,A)

console.log(S.arr)
console.log(S.rangeQuery(4,6,66))