// find the n-th root of a given element  X, with a given precision n


// Intution, 
var findPrecision=(x,n,precision)=>{
  
    let L=0, R=x
      
    while(L+precision<R){
        //careful, no math.floor now
        let mid=L+(R-L)/2,curr=Math.pow(mid,n)
        if( curr<x)
            L=mid
        if( curr>x)
            R=mid
        if( curr==x)
            return mid
    }
  
    return L+Math.floor((R-L)/2) 
}

console.log(findPrecision(2,10**(-2)))