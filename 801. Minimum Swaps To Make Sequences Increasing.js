// We have two integer sequences A and B of the same non-zero length.

// We are allowed to swap elements A[i] and B[i].  Note that both elements are in the same index position in their respective sequences.

// At the end of some number of swaps, A and B are both strictly increasing.  (A sequence is strictly increasing if and only if A[0] < A[1] < A[2] < ... < A[A.length - 1].)

// Given A and B, return the minimum number of swaps to make both sequences strictly increasing.  It is guaranteed that the given input always makes it possible.




var minSwap = function(A, B) {

    let dfs=(i,prevchanged,totalswitched)=>{
        if(i===A.length)return totalswitched
        if (A[i]===B[i])return dfs(i+1,false,totalswitched)

        if(prevchanged){

            //A=[...,B[i-1],x]
            //B=[...,A[i-1],x]

            if(A[i]<=B[i-1]||B[i]<=A[i-1])return dfs(i+1,true,totalswitched+1)
            
            if(A[i]<=A[i-1]||B[i]<=B[i-1])return dfs(i+1,false,totalswitched)
            return Math.min(dfs(i+1,false,totalswitched),dfs(i+1,true,totalswitched+1))
        }
        else{
            if(A[i]<=A[i-1]||B[i]<=B[i-1])return dfs(i+1,true,totalswitched+1)
            if(A[i]<=B[i-1]||B[i]<=A[i-1])return dfs(i+1,false,totalswitched)
            return Math.min(dfs(i+1,false,totalswitched),dfs(i+1,true,totalswitched+1))
        }
       // return Math.min(dfs(i+1,true,totalswitched+1),dfs(i+1,false,totalswitched))
    }

    return Math.min(dfs(1,0,0),dfs(1,1,1))
};


console.log(
    minSwap(
      
        [0,4,4,5,9],
        [0,1,6,8,10]
    )
)