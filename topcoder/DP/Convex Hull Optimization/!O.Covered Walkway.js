


// n sorted points in a line must be covered 
// cost of covering an interval of points: 
// c+(R-L)^2
// Find the minimum cost to cover all points



let tests=[
    [[1,23,45,67,101,124,560,789,990,1019],5000]
],
output=[30726]

/*
    dp[i]=min value to cover up to some idx
*/
let Chicago=(A,c)=>{
    let n=A.length, //A is sorted
        dp=[...Array(n)].map(d=>Infinity)
    dp[0]=c // the min  cost to tile up to the first element is the constant ,cos i m only picking this element
    for (let i = 1; i <n; i++) 
        for (let j = 0; j <i; j++) 
            dp[i]=Math.min(
                    dp[i],
                    dp[j]+c+(A[i]-A[j+1])**2, // use the interval [A[j+1],A[i]] and the best choices behind that
                    c+(A[0]-A[i])**2 //tile it from the beginning element
                  )            
    return dp[n-1]
}


console.log(tests.map(d=>Chicago(d[0],d[1])))

//Can be Optimized through convex hull + binary search somehow

let ChicagoCHT=(A,c)=>{
    let y=(line,x)=>{
        let [M,C]=line
        return M*x+C 
    }
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let n=A.length, //A is sorted
        dp=[...Array(n)].map(d=>Infinity)
    dp[0]=c // the min  cost to tile up to the first element is the constant ,cos i m only picking this element
    let Q=[[-2*A[0],A[0]**2]]
    for (let i = 0; i <n; i++){
        while(Q.length>=2&& y(Q[0],A[i])>=y(Q[1],A[i]))
        Q.shift()
        dp[i]=y(Q[0],A[i])+c+A[i]**2        
        nextLine=[-2*A[i+1],dp[i]+A[i+1]**2]
        while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-2],Q[Q.length-1]).x )
            Q.pop()
        Q.push(nextLine)
    }
    return dp[n-1]
}
console.log(tests.map(d=>ChicagoCHT(d[0],d[1])))
