// Somebody Rotated(shifted) a sorted array, find the SMALLEST element

// for example 
// 2,3,6,7,9,15,19 became 6,7,9,15,19,2,3

// Intuition, use a Binary Search to find the first element that is smaller than its previous element, that has to be the smallest element in the array

let rotatedArray=A=>{
    let L=0
    let R=A.length-1

    while(L<=R){
        mid=L+Math.floor((R-L)/2)
        if(A[mid]<A[mid-1])return A[mid]
        if(A[L]>=A[mid])R=mid-1
        if(A[R]<=A[mid])L=mid+1
    }

    return false

}

console.log(rotatedArray([6,7,9,15,19,20,1]))