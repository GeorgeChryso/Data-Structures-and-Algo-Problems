// Given an Array that increases and then decreases , find the largest Value

// Intuition, Binary Search for the Element that is bigger than both the last and the next elements


let findPeak=A=>{

    let L=0
    let R=A.length-1

    while(L<=R){
        mid=L+Math.floor((R-L)/2)
        if(A[mid-1]<=A[mid]&&A[mid]>=A[mid+1])return A[mid]
        if(A[mid]<=A[mid+1])L=mid+1
        if(A[mid]>=A[mid+1])R=mid+1
    }

    return false
    
}


console.log(findPeak(
    [11,11,8,7,7,5,1]
))