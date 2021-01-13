// A split of an integer array is good if:

// The array is split into three non-empty contiguous subarrays - named left, mid, right respectively from left to right.
// The sum of the elements in left is less than or equal to the sum of the elements in mid, and the sum of the elements in mid is less than or equal to the sum of the elements in right.
// Given nums, an array of non-negative integers, return the number of good ways to split nums. As the number may be too large, return it modulo 109 + 7.




// Binary Search O(nlogn)
var waysToSplit = function(A) {
    let n=A.length,prefix=[...Array(n+1)].map(d=>0),mod=1e9+7,result=0
    for(let i=0;i<n;i++)
        prefix[i+1]=prefix[i]+A[i]
    let sum=(i,j)=>prefix[j+1]-prefix[i]
    for(let i=0;i<=n-3;i++){
        let firstpart=sum(0,i)
        let lo=i+1,hi=n-2
        while(lo<hi){
            let mid=(lo+hi)>>1
            if(sum(i+1,mid)>=firstpart)
                hi=mid
            else
                lo=mid+1
        }
        let v1=lo,secondpart=sum(i+1,v1)
        if(secondpart<firstpart||(sum(v1+1,n-1)<secondpart)|| hi<lo)
            continue
        // the biggest index v2 such that sum(i+1,v2)<=sum(v2+1,n-1)
        lo=v1,hi=n-2
        let v2=lo
        while(lo<hi){
            let mid=(lo+hi)>>1
            if(sum(i+1,mid)<=sum(mid+1,n-1))
                v2=mid,
                lo=mid+1
            else
                hi=mid-1
        }
        if(sum(i+1,lo)<=sum(lo+1,n-1))
            v2=lo
        thirdpart=sum(v2+1,n-1)
        if(thirdpart<secondpart )
             continue
        result= (result+( v2-v1+1) )% mod
    }
    return result
    
};
//sliding window O(n)
var waysToSplit = function(A) {
    let n=A.length,prefix=[...Array(n+1)].map(d=>0),mod=BigInt(1e9+7),result=0n
    for(let i=0;i<n;i++)
        prefix[i+1]=prefix[i]+A[i]
    let sum=(i,j)=>prefix[j+1]-prefix[i]
    let lo=0,hi=0
    for(let i=0;i<=n-3;i++){
        let firstpart=sum(0,i)
        if(lo<=i)
            lo=i+1
        while(lo<n&&firstpart>sum(i+1,lo))
            lo++
        if(lo>hi)
            hi=lo
        result=(result%mod+BigInt(hi-lo)%mod) % mod
        while(hi+1<n&&sum(i+1,hi)<= sum(hi+1,n-1))
            hi++,
            result=(result+1n)%mod
    }
    return result
};

console.log(
    waysToSplit([0,0,0,0]),
    // waysToSplit([2,3,5,10]),
    // waysToSplit([5,10,1,10,4])
    
)