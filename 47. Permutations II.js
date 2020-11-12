// Given a collection of numbers that might contain duplicates, return all possible unique permutations.

// Example:

// Input: [1,1,2]
// Output:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]



// Worstcase O((n^2)*n!)
var permuteUnique = function(A) {
    let n=A.length,q=[ [[],0,0] ],mod=1e9+7
    //q contains triplets  [a,b,c,b,.etc],mask(for used elements), value of the hash function (used to prune and  handle duplicates)
    for(let k=0;k<n;k++){
        let temp=[],memo=new Set()//memo handles the pruning on the current level
        for(let [x,mask,h] of q)
            for(let i=0;i<n;i++){
                let hh=(h+(20-(10-A[i]))*13**(k+1))%mod
                if((mask&(1<<i))==0 && !memo.has( hh )){
                    memo.add(hh)
                    temp.push(
                        [[...x,A[i]],mask|(1<<i),hh]
                    )
                }
            }
                
        q=temp
    }
    return  q.map(d=>d[0])
};