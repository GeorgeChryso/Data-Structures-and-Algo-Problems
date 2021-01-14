



//naive guess one end and binary search the other
// O(nlogn)
var minOperations = function(A,T) {
    let n=A.length,prefix=[...Array(n+1)],total=A.reduce((a,c)=>a+c)
        sum=(i,j)=>prefix[j+1]-prefix[i],res=Infinity
    prefix[0]=0
    for(let i=0;i<n;i++){
        prefix[i+1]=prefix[i]+A[i]
        if(prefix[i+1]===T)
            res=i+1
        if(total-prefix[i+1]===T)
            res=Math.min(res,n-1-i)
    }

    for(let end=n-1;end>0;end--){
        let lastpart=sum(end,n-1),
            firstpart=T-lastpart
        //binary search for the first part
        let lo=0,hi=end-2
        while(lo<=hi){
            let mid=(lo+hi)>>1
            if(prefix[mid+1]<firstpart)
                lo=mid+1
            else if(prefix[mid+1]===firstpart)
                res=Math.min(res,n-(end-mid)+1),
                lo=hi+2
            else
                hi=mid-1
        }
    }
    if(res===Infinity)
        return -1
    return res
};
console.log(minOperations([3,2,20,1,1,3]
    ,10))


//optimal greedy  longest subarray with sum K
var minOperations = function(A,T) {
    let n=A.length,total=A.reduce((a,c)=>a+c),
        firstseen={}
    if(total==T)
        return n
        T=total-T
    let curr=0,res=0
    firstseen[0]=0
    for(let i=0;i<n;i++){
        curr+=A[i]
        if(firstseen[curr-T]!==undefined)
            res=Math.max(res,i-firstseen[curr-T]+1)
        if(firstseen[curr]===undefined)
            firstseen[curr]=i+1
    }
    if(res==0)
        return -1
    return n-res
};

console.log(minOperations([3,2,20,1,1,3],
    10))