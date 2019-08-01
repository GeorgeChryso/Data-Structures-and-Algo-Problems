// A sequence X_1, X_2, ..., X_n is fibonacci-like if:

//  n >= 3

// X_i + X_{i+1} = X_{i+2} for all i + 2 <= n


// Given a strictly increasing array A of positive integers forming a sequence, find the length of the longest fibonacci-like subsequence of A.  If one does not exist, return 0.

// (Recall that a subsequence is derived from another sequence A by deleting any number of elements (including none) from A, without changing the order of the remaining elements.  For example, [3, 5, 8] is a subsequence of [3, 4, 5, 6, 7, 8].)

// Example 1:

// Input: [1,2,3,4,5,6,7,8]
// Output: 5
// Explanation:
// The longest subsequence that is fibonacci-like: [1,2,3,5,8]

var lenLongestFibSubseq = function(A) {
    let c=0
    let Fibs=[ ]
    let i,j,z;
    var poss=[]
        for ( i = 0; i < A.length; i++) {
            for ( j =i+1; j < A.length; j++) {
                poss.push(A[i],A[j])
                for ( z =j+1; z < A.length; z++) {
                    let q=
                    if (parseInt(A[i]+A[j])===parseInt(A[z])){
                        poss.push(A[z])
                        i=j
                        j=z
                    }
                
                } 
                Fibs.push(poss)
                poss=[]
                // edw prepei na allaksei to i,j outws wste na sunexizei apo ekei pou stamatise afou vrike thn akolouthia fibbonacci
               console.log(' telos sta',i,j)

            }  
        }    
        return Fibs

};

console.log(
    lenLongestFibSubseq(
        [1,2,3,4,5,6,7,8]
    )
)