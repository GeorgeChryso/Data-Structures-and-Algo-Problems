// Given a number, determine whether It is a valid square without using sqrt function or any other library


// Approach 1, using a binary search on the smaller numbers of my number, determine if 
// instead, there is a number whose power of two equals my target
let isAsquare=X=>{
    if(X<0)return false

    let L=0
    let R=X

    while(L<=R){
        mid=L+Math.floor((R-L)/2)
        if(mid**2==X)return true
        if(mid**2>X)R=mid-1
        if(mid**2<X)L=mid+1
    }

    return false
}
//Complexity O(logn) Time O(1) Space
console.log(isAsquare(9000))