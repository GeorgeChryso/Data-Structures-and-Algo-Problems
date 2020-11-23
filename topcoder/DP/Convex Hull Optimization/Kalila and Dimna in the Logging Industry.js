



// A trees
// B costs, B[i] means the cost of charging the chainsaw when i-th tree is COMPLETELY CUT
// It's guaranteed that a1 = 1, bn = 0, a1 < a2 < ... < an and b1 > b2 > ... > bn.



//O(n^2)
var kalilaNaive=(A,B)=>{
    let n=A.length,
        dp=[...Array(n)].map(d=>Infinity)
    dp[0]=0 //cost 0 

    //dp[i] Minimum cost to cut the i-th tree completely
    
    //so the problem reducs to cutting the last tree completely, because after that cutting the rest of the trees
    // will be 0
    for (let i = 1; i < n; i++)
        for (let j = 0; j <i; j++) 
            dp[i]=Math.min(
                    dp[i],
                    dp[j]+A[i]*B[j]
                )
    return dp[n-1]
}


// O(n)
var kalilaCHT=(A,B)=>{
    let y=([M,C],x)=> BigInt(M*x+C)
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let n=A.length //cost 0 

    //dp[i] Minimum cost to cut the i-th tree completely
    /* 
        dp[i]=  Max( B[j]*A[i] + dp[j]) 
        y             M    x       C

        slope descending, 
        Queries Ascending= > classic CHT
    */
    let Q=[],curr=0n
    for (let i = 0; i <n; i++){
        while(Q.length>=2&& y(Q[0],A[i])>=y(Q[1],A[i]))
            Q.shift()
        if(Q.length)
            curr= y(Q[0],A[i])
        let nextLine=[B[i],curr]
        while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-2],Q[Q.length-1]).x )
            Q.pop()
        Q.push(nextLine)
    }
    return curr
}

let tests=[
    [
        [1,2,3,4,5],
        [5,4,3,2,0]
    ],
    [
        [1, 2, 3 ,10 ,20 ,30],
        [6 ,5 ,4 ,3 ,2 ,0]
    ]
]

console.log(tests.map(([A,B])=>kalilaNaive(A,B)))
console.log(tests.map(([A,B])=>kalilaCHT(A,B)))