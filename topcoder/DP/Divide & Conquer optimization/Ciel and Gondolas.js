// Fox Ciel is in the Amusement Park. And now she is in a queue in front of the Ferris wheel. There are n people (or foxes more precisely) in the queue: we use first people to refer one at the head of the queue, and n-th people to refer the last one in the queue.

// There will be k gondolas, and the way we allocate gondolas looks like this:

// When the first gondolas come, the q1 people in head of the queue go into the gondolas.
// Then when the second gondolas come, the q2 people in head of the remain queue go into the gondolas.
//     ...

// The remain qk people go into the last (k-th) gondolas.
// Note that q1, q2, ..., qk must be positive. You can get from the statement that  and qi > 0.

// You know, people don't want to stay with strangers in the gondolas, so your task is to find an optimal allocation way (that is find an optimal sequence q) to make people happy. For every pair of people i and j, there exists a value uij denotes a level of unfamiliar. You can assume uij = uji for all i, j (1 ≤ i, j ≤ n) and uii = 0 for all i (1 ≤ i ≤ n). Then an unfamiliar value of a gondolas is the sum of the levels of unfamiliar between any pair of people that is into the gondolas.

// A total unfamiliar value is the sum of unfamiliar values for all gondolas. Help Fox Ciel to find the minimal possible total unfamiliar value for some optimal allocation.

// Input
// The first line contains two integers n and k (1 ≤ n ≤ 4000 and 1 ≤ k ≤ min(n, 800)) — the number of people in the queue and the number of gondolas. Each of the following n lines contains n integers — matrix u, (0 ≤ uij ≤ 9, uij = uji and uii = 0).

// Please, use fast input methods (for example, please use BufferedReader instead of Scanner for Java).

// Output
// Print an integer — the minimal possible total unfamiliar value.

/*
                    T   L   D   R
        *You have to partition N people into  M gondolas and to print the minimum Unfamiliarity that arises
        *The unfamiliarity of a selection is the sum of unfamiliarities of each group (gondola)
        *The unfamiliarity of a gondola is the sum of the unfamiliarities between ANY two people in that gondola
*/

// N is the number of people in the q, m is the numer of gondolas, U is the unfamiliarity matrix
// O(MNN)
var gondolASSs=(n,m,U)=>{
        
    // let us first deal with the scoring function, I want to be able to calculate in O(1)
    // queries of the form unf(i,j) which returns the unfamiliarity of the group
    // containing i,i+1,...,j people
    // unf(i,j)= Σ Σ U[i][j] which requires O(n**2) to calculate
    // but i know that
    // unf(i,j+1)=unf(i,j)+  ΣU[i][j+1]
    // so i could always use dp on intervals with basecase unf(i,i+1)=U[i][i+1]
    // and unf(i,j)=unf(i,j-1)+ ΣU[i][j1]
    // I can use prefix sums for fast  ΣU[i][j] queries
    // i.e. for each human i: i use prefixsums for his unfamiliarity between indexes (i,j)
    // obviously j here has to be less than the index of the element itself,
    // cos unf(i,j)=unf(i,j-1)+ ΣU[i][j1] that element is the j-th index here

    let udp=[...Array(n)].map(d=>[...Array(n)].map(d=>0)),
        prefix=[...Array(n)].map(d=>[...Array(n+1)].map(d=>0)) //n+1 cos 0 is the first element
    //fill the prefix
    for (let i = 0; i < n; i++) 
        for (let j = 1; j <=n; j++) 
            prefix[i][j]=prefix[i][j-1]+U[i][j-1]// sum from [i,j]
    //so now i can query ΣU[i][j] in O(1)
    //prefix[j+1]-prefix[i] gives me the sum of U[i][j]

    //now i calculate udp(i,j) which returns the unfair value of the group i,....,j ,including j
    for (let i = 0; i < n; i++) 
        for (let j = i+1; j < n; j++) 
            udp[i][j]=udp[i][j-1]+ prefix[j][j+1]-prefix[j][i]
    
    if(m<=1) // 1 group means the sum of every unfamiliarity
        return udp[0][n-1]
 
    let dp=[...Array(m)].map(d=>[...Array(n)].map(d=>Infinity))
    //dp[i][j] : the Minmum Unfalimliarity of all of the gondolas if I divide my first j people in i(+1) gondolas
    // so the last group is  from [k,j]
    //so dp[0][6] is  the total unfamiliarity of the first 6 ppl, if i put them in 1 gondola

    //basecase
    for (let j = 0; j < n; j++) 
        dp[0][j]=udp[0][j] //cos thats only 1 group

    for (let i = 1; i <m; i++)
        for (let j = i; j <n; j++)
            for (let k = 0; k < j; k++)
                if(dp[i-1][k]+udp[k+1][j]<dp[i][j])
                    dp[i][j]=dp[i-1][k]+udp[k+1][j]
    // add the last group
    for (let j = 0; j <n-1; j++)
        dp[m-2][j]+=udp[j+1][n-1]

    return Math.min(...dp[m-2])
}



// now as for the D&C DP optimization,:
// The k is monotone on j axis, that allows me to calculate the k faster with recursion
//O(MN log N)
var gondolASS=(n,m,U)=>{
        
    let udp=[...Array(n)].map(d=>[...Array(n)].map(d=>0)),
        prefix=[...Array(n)].map(d=>[...Array(n+1)].map(d=>0)) 
    for (let i = 0; i < n; i++) 
        for (let j = 1; j <=n; j++) 
            prefix[i][j]=prefix[i][j-1]+U[i][j-1]
    for (let i = 0; i < n; i++) 
        for (let j = i+1; j < n; j++) 
            udp[i][j]=udp[i][j-1]+ prefix[j][j+1]-prefix[j][i]
    
    if(m<=1) // 1 group means the sum of every unfamiliarity
        return udp[0][n-1]
 
    let dp=[...Array(m)].map(d=>[...Array(n)].map(d=>Infinity))
    //dp[i][j] : the Minmum Unfalimliarity of all of the gondolas if I divide my first j people in i(+1) gondolas
    //so dp[0][6] is  the total unfamiliarity of the first 6 ppl, if i put them in 1 gondola



    // let K[i][j] be the best solution for dp[i][j]
    // aka dp[i][j]=dp[i-1][K[i][j]]+ udp[K[i][j]+1][j]
    // then exploit the fact that (after proving it)
    //------- K[i][j-1]<=K[i][j]<=K[i][j+1] -------------\\

    let DC=(i,jleft,jright,kleft,kright)=>{  //for any line i and an interval [jl,jr]
        if(jleft>jright)
            return
        let mid=(jleft+jright)>>1,bestk=-1   //first calculate the mid, and its best k (on the prev line)
        for (let k =kleft; k <=Math.min(mid-1,kright); k++)
            if(dp[i][mid]>dp[i-1][k]+udp[k+1][mid])
                bestk=k,
                dp[i][mid]=dp[i-1][k]+udp[k+1][mid]
        // if(jleft===jright)
        //     return
        DC(i,jleft,mid-1,kleft,bestk)    //then split the interval into [jl,mid] which WILL have its best k between kleft and the newly found bestk
        DC(i,mid+1,jright,bestk,kright) // same for right side
    }
    //basecase
    for (let j = 0; j < n; j++) 
        dp[0][j]=udp[0][j] //cos thats only 1 group

    for (let i = 1; i < m; i++)
        DC(i,0,n-1,0,n-1)
    // add the last group
    for (let j = 0; j <n-1; j++)
        dp[m-2][j]+=udp[j+1][n-1]

    return Math.min(...dp[m-2])
}







console.log(
    gondolASS(
        9,3,[
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0, 0]
        ]
    )
)

console.log(
    gondolASS(
        5,2,[
            [0, 0, 1, 1, 1],
            [0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0]
        ]//0
    )

)

console.log(
    gondolASS(
        8,3,[
            [0, 1, 1, 1, 1 ,1, 1, 1],
            [1, 0, 1, 1, 1 ,1, 1, 1],
            [1, 1, 0, 1, 1 ,1, 1, 1],
            [1, 1, 1, 0, 1 ,1, 1, 1],
            [1, 1, 1, 1, 0 ,1, 1, 1],
            [1, 1, 1, 1, 1 ,0, 1, 1],
            [1, 1, 1, 1, 1 ,1, 0, 1],
            [1, 1, 1, 1, 1 ,1, 1, 0]
        ] //7
    )
)

console.log(
    gondolASS(
        3,2,[
            [0,2,0],
            [2,0,3],
            [0,3,0] //2
        ]
    )
)

console.log(
    gondolASS(
        2,1,[
            [0,8],
            [8,0] //8
        ]
    )
)


console.log(
    gondolASS(
        9,2,[
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0, 0]
        ]//6
    )
)

console.log(
    gondolASS(
        6,2,[
            [0, 1, 1, 1, 1 ,1],
            [1, 0, 1, 1, 1 ,1],
            [1, 1, 0, 1, 1 ,1],
            [1, 1, 1, 0, 1 ,1],
            [1, 1, 1, 1, 0 ,1],
            [1, 1, 1, 1, 1 ,0]
        ]
    ) //6
)