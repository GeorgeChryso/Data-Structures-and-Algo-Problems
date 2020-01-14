// We have a collection of rocks, each rock has a positive integer weight.

// Each turn, we choose any two rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

// If x == y, both stones are totally destroyed;
// If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
// At the end, there is at most 1 stone left.  Return the smallest possible weight of this stone (the weight is 0 if there are no stones left.)


// naive recursion
var lastStoneWeightII = function(A) {
    let total=A.reduce((acc,curr)=>acc+curr)
    let dp=Array(A.length+1).fill(null).map(d=>Array(A.length+1).fill(total))

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
                if(j!=i){

                }          
        }        
    }
    
};