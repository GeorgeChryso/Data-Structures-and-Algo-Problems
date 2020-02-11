// We have two integer sequences A and B of the same non-zero length.

// We are allowed to swap elements A[i] and B[i].  Note that both elements are in the same index position in their respective sequences.

// At the end of some number of swaps, A and B are both strictly increasing.  (A sequence is strictly increasing if and only if A[0] < A[1] < A[2] < ... < A[A.length - 1].)

// Given A and B, return the minimum number of swaps to make both sequences strictly increasing.  It is guaranteed that the given input always makes it possible.




var minSwap = function(A, B) {

    let dfs=(i,changed,switched)=>{
        if(i==A.length)return switched
        if(changed){
            if(A[i]<=B[i-1]||B[i]<=A[i-1])return Infinity
        }
        else{
            if(A[i]<=A[i-1]||B[i]<=B[i-1])return Infinity
        }

        return Math.min( dfs(i+1,true,switched+1),dfs(i+1,false,switched) )
    }

    return Math.min(dfs(0,0,0),dfs(0,1,1))
};


console.log(
    minSwap(
      
[3,3,8,9,10],
[1,7,4,6,8]
    )
)