// You're given an array a of length N. The characteristic value of the array is C=∑ai⋅i. Now, you can perform the following operation at most one: pick some element in the array, remove it, and insert it to another (or same) position. Please calculate the maximum C you can achieve after performing at most one operations.

// 2≤N≤2×105,|ai|≤106


// naive O(n^2)
let PPsum=A=>{
    let n=A.length,result=-Infinity,prefixSum=[0],totalChar=A.reduce((a,c,i)=>a+c*(i+1),0)
    for (let i = 0; i < n; i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])
    for (let i = 0; i <=n ; i++) //for every changing position
        for (let j = 0; j < n; j++) // for every  item to be moved  to the changing position
            result=Math.max(
                    result,
                    //calculate the new characteristic
                    totalChar+A[j]*(i-j-1)+prefixSum[j+1]-prefixSum[i] 
                  )
    return result
}

//can be viewed as dp
let PPsumDP=A=>{
    let n=A.length,prefixSum=[0],totalChar=A.reduce((a,c,i)=>a+c*(i+1),0)
    for (let i = 0; i < n; i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])

    let dp=[...Array(n+1)].map(d=>-Infinity)
    /* 
        dp[i]= Maximum Characteristic I can achieve if i move an item from the left/ right
             to position i

            =Max(
                Max(A[j]*i-A[j]*(j+1) +prefixSum[j+1])-prefixSum[i+1], j<i//move it from the left
                Max(A[j]*i-A[j]*(j+1) +prefixSum[j+1])-prefixSum[i+1], j>i// move it from the right
            )
                
        So essentially if I break it into two dps I can apply 2xCHT and boost the performance to 
        O(n)
        
    */
    for (let i = 0; i <=n ; i++) //for every changing position
        for (let j = 0; j < i; j++) // for every  item to be moved  to the changing position
            dp[i]=Math.max(
                    dp[i],
                    //calculate the new characteristic
                    totalChar+A[j]*(i-j-1)+prefixSum[j+1]-prefixSum[i] 
                  )
    for (let i = n; i >=0 ; i--) //for every changing position
        for (let j = n-1; j >=i; j--) // for every  item to be moved  to the changing position
            dp[i]=Math.max(
                    dp[i],
                    //calculate the new characteristic
                    totalChar+A[j]*(i-j-1)+prefixSum[j+1]-prefixSum[i] 
                  )
    return Math.max(...dp)
}

// O(N)
let PPsumCHT=A=>{
    let y=([M,C],x)=> M*x+C
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let n=A.length,prefixSum=[0],totalChar=A.reduce((a,c,i)=>a+c*(i+1),0)
    for (let i = 0; i < n; i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])

    let dp=[...Array(n+1)].map(d=>-Infinity)
    /* 
        dp[i]= Maximum Characteristic I can achieve if i move an item from the left/ right
             to position i

        dp[i]= Max(A[j]* i      -A[j]*(j+1) +prefixSum[j+1])-prefixSum[i]+totalChar, j<i
            y=      M  * x      +     C               + ..constants

            x Increasing, Slope irrelevant
        dp[i]=Max(A[j] * i     -A[j]*(j+1) +prefixSum[j+1])-prefixSum[i]+totalChar, j>i
            y=      M  * x      +     C               + ..constants

        x Decreasing, Slope irrelevant

        So essentially if I break it into two dps I can apply 2xCHT and boost the performance to 
        O(n)
    */
    let Q=[ ] 
    for (let i = 0; i <=n ; i++){
        while(Q.length>=2&&y(Q[0],i)<=y(Q[1],i))
            Q.shift()
        if(Q.length)
            dp[i]=y(Q[0],i)-prefixSum[i]+totalChar
        let newLine=[A[i],-A[i]*(i+1)+prefixSum[i+1]]
        while(Q.length>=2&&
            Intersection(Q[Q.length-2],newLine).x<=Intersection(Q[Q.length-2],Q[Q.length-1]).x
            )
            Q.pop()
        Q.push(newLine)
    }

    Q=[ ] 
    for (let i = n-1; i >=0 ; i--){
        while(Q.length>=2&&y(Q[0],i)<=y(Q[1],i))
            Q.shift()
        if(Q.length)
            dp[i]=Math.max(y(Q[0],i)-prefixSum[i]+totalChar,dp[i])
        let newLine=[A[i],-A[i]*(i+1)+prefixSum[i+1]]
        while(Q.length>=2&&
            Intersection(Q[Q.length-2],newLine).x<=Intersection(Q[Q.length-2],Q[Q.length-1]).x
        )
            Q.pop()
        Q.push(newLine)
    } 
    return Math.max(...dp)
}

let tests=[
    [4,1,2,3],//30
    [1,1],//3
    [0,0,0,0],//0
    [4,3,2,5],//39
    [1,1,2,7,1],//49
    [1,1,2], //9
    [-1 ,-2 ,-3 ,-4 ,-5],// -45
    [0,0,0,-1,0,0,0], //-1 
    [1000000, -1000000], // 1000000
    [-1,-1],// -3
    [2,1,3,4], //30
    [1,2,5,4,5], //62
    [2,3,4,1],//30
    [5 ,7 ,11 ,83 ,14 ,999],//6517
    [87 ,213 ,141 ,1], //1378
]   
let output=[30,3,0,39,49,9,-45,-1,1000000,-3,30,62,30,6517,1378]
let isT=A=>A.every((d,i)=>d==output[i])
console.log(output+'')
 console.log(tests.map(d=>PPsum(d))+'',isT(tests.map(d=>PPsum(d))))
console.log(tests.map(d=>PPsumDP(d))+'',isT(tests.map(d=>PPsumDP(d))))
console.log(tests.map(d=>PPsumCHT(d))+'',isT(tests.map(d=>PPsumCHT(d))))

