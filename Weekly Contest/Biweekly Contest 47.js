
var countRangeSum = function(A, lower, upper) {
    let prefix=[0],result=0,min=Math.min(...A)
    if(min<=0)
        A=A.map(d=>d-min+1),
        lower-=min-1,
        upper-=min-1
    A.forEach(d=>prefix.push( prefix[prefix.length-1]+d ))
    //[lower,upper]=[BigInt(lower),BiInt(upper)]
    let sumIncl=(i,j)=>prefix[j+1]-prefix[i]
    for(let i=0;i<A.length;i++){
        let lo=i,hi=A.length-1,loEnd=-1,hiEnd=Infinity,total=0
        if(A[i]>=lower)
            loEnd=i,
            total--
        else
            while(lo<=hi){
                let mid=Math.floor(lo+(hi-lo)/2)
                let sum=sumIncl(i,mid)
                if(sum<lower)
                    loEnd=Math.max(loEnd,mid),
                    lo=mid+1
                else
                    hi=mid-1
            }
        lo=i,hi=A.length-1
        if(sumIncl(lo,hi)<=upper)
            hiEnd=A.length-1,
            total--
        else
            while(lo<=hi){
                let mid=Math.floor(lo+(hi-lo)/2)
                let sum=sumIncl(i,mid)
                if(sum>upper)
                    hiEnd=Math.min(hiEnd,mid-1),
                    lo=mid+1
                else
                    hi=mid-1
            }
         console.log(loEnd,hiEnd)
        total=hiEnd-loEnd+1
        if(hiEnd>=loEnd)
            result+=total
    }
    return result
};




console.log(countRangeSum(
    [-2,5,-1],-2,2
   // [0],0,0
    ))