// Given a number, determine whether It is a valid square without using sqrt function or any other library


// Approach 1, using a binary search on the smaller numbers of my number, determine if 
// instead, there is a number whose power of two equals my target

let isPerfectSquare=X=>{
    if(X<0)return false
    if(X==0||X==1)return true

    let lo=0
    let hi= X/2

    while(lo<=hi){
        let mid= Math.floor(lo+(hi-lo)/2)
        let sq=mid**2
        if(sq==X)return true
        if(sq<X)lo=mid+1
        if(sq>X)hi=mid-1
    }
    return false

}



//Complexity O(logn) Time O(1) Space
console.log(isAsquare(9000))