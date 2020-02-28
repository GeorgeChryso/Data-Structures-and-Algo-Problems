// Given a Sorted Array, find the first bigger value than my target


// Intuition: I can use binary search to search for the first element 
// that is bigger than my Value
// But, If my condition is only regarding an element being bigger, binary search
// will of course NOT  return the correct value 
// What I instead need to do is search for the first bigger element with its previous element being less than or equal to my target, therefore ensuring that my element is the first bigger one to my target

let findFirstBigger=(A,Target)=>{
    let L=0
    let R=A.length-1

    while(L<=R){
        let mid=L+Math.floor((R-L)/2)
        if(A[mid]>Target&&A[mid-1]<=Target)return A[mid]
        if(A[mid]>Target)R=mid-1
        if(A[mid]<=Target)L=mid+1
    }
    return false
}

console.log(findFirstBigger([0,3,5,6,8,10,12],12))