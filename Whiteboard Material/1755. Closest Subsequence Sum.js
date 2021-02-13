var minAbsDifference = function(A, K) {
    let set1=new Set(),set2=new Set([-Infinity,Infinity])
    //split in two => A1 holds the first half, A2 holds the second half
    let A2=[],n=A.length,m
    for(let i=0;i<(n>>1);i++)
        A2.push(A.pop())
    n=A.length,m=A2.length
    // calculates ALL possible sums for 1 and 2 and add them to set1,set2 respectively
    let calcSum=(Arr,length,set)=>{
        for(let mask=0;mask<(1<<length);mask++){
            let sum=0
            for(let j=0;j<length;j++)
                if((1<<j)&mask) 
                    sum+=Arr[j]
            set.add(sum)
        }
    }
    calcSum(A,n,set1),calcSum(A2,m,set2)
    set1=Array.from(set1),set2=Array.from(set2).sort((a,b)=>a-b)
    let result=Infinity
    for(let current of set1){
        //Binary search for the element in set2 which, when summed with the 
        //current element of set1, is the biggest there is that is <= GOAL
        let lo=0,hi=set2.length-1
        while(lo<=hi){
            let mid=(lo+hi)>>1,sum=current+set2[mid]
            if(sum<=K)
                result=Math.min( Math.abs(sum-K),result),
                lo=mid+1
            else
                hi=mid-1
        }
        //Binary search for the element in set2 which, when summed with the 
        //current element of set1, is the smallest there is that is >GOAL
        lo=0,hi=set2.length-1
        while(lo<=hi){
            let mid=(lo+hi)>>1,sum=current+set2[mid]
            if(sum<=K)
                lo=mid+1
            else
                result=Math.min( Math.abs(sum-K),result),
                hi=mid-1
        }
    }
    return result
};
var minAbsDifference = function(A, K) {
    let set=new Set([0]),n=A.length,
        minthan=Infinity,maxthan=-Infinity
    
    A.sort((a,b)=>a-b)
    for(let i=0;i<n;i++){
        let set2=new Set()
        set.forEach(d=>set2.add(d+A[i]))
        set2.forEach(d=>set.add(d))
        console.log(set2)
        if(i>2)
        return
    }
    let result=Infinity
    set.forEach(d=>result=Math.min(Math.abs(K-d),result))
    return result
};


console.log(minAbsDifference([-7074297,3076735,-5846354,5008659,-126683,7039557,6708811,3189666,-6102417,6078975,-6448946,-4995910,2964239,-3248847,-4392269,7473223,-1356059,3978911,8009187,-316441,6524770,8280309,-2798383,1310839,6306594,-6548611,-9712711,1639314],
    493409180))