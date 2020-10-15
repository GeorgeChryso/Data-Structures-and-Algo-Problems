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
let root=(x,n)=>{
    if (x == 0)
        return 0

    let lowerBound = 0,upperBound = Math.max(1, x),approxRoot = (upperBound + lowerBound) / 2

    while (approxRoot - lowerBound >= 0.001){
        if (Math.pow(approxRoot, n) > x)
            upperBound = approxRoot
        else if (Math.pow(approxRoot, n) < x)
            lowerBound = approxRoot
        else
            break

        approxRoot = (upperBound + lowerBound) / 2
    }
      

    return approxRoot
}
