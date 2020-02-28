// find the square root of a given element  X, with a given precision n


// Intution, 

let findPrecision=(X,precision)=>{
    let L=0
    let R=X
    
    while(L+precision<R){
        //careful, no math.floor now
        let mid=L+((R-L)/2)
        console.log(L,mid,R)

        if( mid**2<X)L=mid
        if( mid**2>X)R=mid
        if( mid**2==X)return mid
    }

    return L+Math.floor((R-L)/2)
}

console.log(findPrecision(2,10**(-2)))