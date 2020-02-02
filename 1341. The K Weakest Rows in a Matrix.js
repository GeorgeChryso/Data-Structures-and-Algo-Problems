// Given a m * n matrix mat of ones (representing soldiers) and zeros (representing civilians), return the indexes of the k weakest rows in the matrix ordered from the weakest to the strongest.

// A row i is weaker than row j, if the number of soldiers in row i is less than the number of soldiers in row j, or they have the same number of soldiers but i is less than j. Soldiers are always stand in the frontier of a row, that is, always ones may appear first and then zeros.


var kWeakestRows = function(A, k) {
    

    return A.map((d,i)=>[d.reduce((acc,curr)=>acc+curr),i]).sort(([a1,i],[a2,j])=>{
        if(a1>a2)return 1
        if(a1==a2){
            if(i>j)return 1
            else return -1
        }
        return -1
    }).map(([a,b])=>b).slice(0,k)
};



console.log(
    kWeakestRows (
        [[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], 
 3
    )
)