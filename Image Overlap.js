// wo images A and B are given, represented as binary, square matrices of the same size.  (A binary matrix has only 0s and 1s as values.)

// We translate one image however we choose (sliding it left, right, up, or down any number of units), and place it on top of the other image.  After, the overlap of this translation is the number of positions that have a 1 in both images.

// (Note also that a translation does not include any kind of rotation.)

// What is the largest possible overlap?

// Example 1:

// Input: A = [[1,1,0],
//             [0,1,0],
//             [0,1,0]]
//        B = [[0,0,0],
//             [0,1,1],
//             [0,0,1]]
// Output: 3
// Explanation: We slide A to right by 1 unit and down by 1 unit.
// Notes: 

// 1 <= A.length = A[0].length = B.length = B[0].length <= 30
// 0 <= A[i][j], B[i][j] <= 1

// BFS TLE
var largestOverlap = function(A, B) {
    let n=A.length,finalstate=[...Array(n)].map(d=>0).join(','),result=0
    A=A.map(d=>parseInt(d.join(''),2))
    B=B.map(d=>parseInt(d.join(''),2))
    for (let i = 0; i < n; i++)
        for (let j = 0; j <31; j++) 
            if(((1<<j)&A[i]) & ((1<<j)&B[i]))
                result++
    let q=[A], memo=new Set(),n2=2**n
    memo.add(finalstate)
    while(q.length){
        let ele=q.shift(), conc=ele.join(',')
        if(memo.has(conc))
            continue
        memo.add(conc)
        let up=[],down=[],left=[],right=[]
            ,r1=0,r2=0,r3=0,r4=0
        ele.forEach((d,i)=>{
            if(i==n-1){
                up.push(0)
                down.push(ele[n-2])
                left.push((d<<1)&(n2-1))
                right.push(d>>>1)
            }
            else if(i==0){
                up.push(ele[1])
                down.push(0)
                left.push((d<<1)&(n2-1))
                right.push(d>>>1)
            }
            else{
                up.push(ele[i+1])
                down.push(ele[i-1])
                left.push((d<<1)&(n2-1))
                right.push(d>>>1)
            }
        })

        for (let i = 0; i < n; i++) {
            for (let j = 0; j <31; j++) {
                if(((1<<j)&B[i])==0)
                    continue
                r1+=((1<<j)&up[i])
                r2+=((1<<j)&down[i])
                r3+=((1<<j)&left[i])
                r4+=((1<<j)&right[i])     
            }
        }
        result=Math.max(result,r1,r2,r3,r4)

        console.log(result)
        q.push(up,left,right,down)

    }
    return result
};

// SLIDING WINDOW ON A MATRIX (Sliding Matrix)
// tldr, i m expanding B into a NEW BOARD with dummy zeroes
// to simulate every possible result after some slides
// so for example if B was 
//  B                   T
//                  [0,0,0,0]
// [1,1]            [0,1,1,0]
// [1,1]    ==>     [0,1,1,0]
//                  [0,0,0,0]

// then I slide a N*N window and i compare it with A 
// for example,
// the first comparison would be A with [0,0] then with [0,0] ..etc with last [1,0]
//                                      [0,1]           [1,1]                 [0,0]
let largestOverlap = (A, B) => {
    // 🎯  1. create T by padding B with N - 1 zeros
    let N = A.length,
        K = N + 2 * (N - 1);
    let T = [...Array(K)].map(_ => Array(K).fill(0));
    let offset = N - 1;
    for (let i = offset; i <= 2 * offset; ++i)
        for (let j = offset; j <= 2 * offset; ++j)
            T[i][j] = B[i - offset][j - offset];
    // 🔍  2. find max overlap by comparing A with all offsets in T
    let max = 0;
    for (let offset_i = 0; offset_i <= 2 * offset; ++offset_i) 
        for (let offset_j = 0; offset_j <= 2 * offset; ++offset_j) {
            let overlap = 0;
            for (let i = 0; i < N; ++i)
                for (let j = 0; j < N; ++j)
                    overlap += A[i][j] & T[i + offset_i][j + offset_j];
            max = Math.max(max, overlap);
        }
    
    return max;
};

console.log(
    largestOverlap(
       [[1,1,0],
            [0,1,0],
            [0,1,0]],
        [[0,0,0],
            [0,1,1],
            [0,0,1]]
    )
)