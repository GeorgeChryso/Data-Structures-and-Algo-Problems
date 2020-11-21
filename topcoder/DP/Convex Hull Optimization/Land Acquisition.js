// Problem 1: Land Acquisition [Paul Christiano, 2007]

// Farmer John is considering buying more land for the farm and has
// his eye on N (1 <= N <= 50,000) additional rectangular plots, each
// with integer dimensions (1 <= width_i <= 1,000,000; 1 <= length_i
// <= 1,000,000).

// If FJ wants to buy a single piece of land, the cost is $1/square
// unit, but savings are available for large purchases. He can buy
// any number of plots of land for a price in dollars that is the width
// of the widest plot times the length of the longest plot. Of course,
// land plots cannot be rotated, i.e., if Farmer John buys a 3x5 plot
// and a 5x3 plot in a group, he will pay 5x5=25.

// FJ wants to grow his farm as much as possible and desires all the
// plots of land. Being both clever and frugal, it dawns on him that
// he can purchase the land in successive groups, cleverly minimizing
// the total cost by grouping various plots that have advantageous
// width or length values.

// Given the number of plots for sale and the dimensions of each,
// determine the minimum amount for which Farmer John can purchase all

// PROBLEM NAME: acquire

// INPUT FORMAT:

// * Line 1: A single integer: N

// * Lines 2..N+1: Line i+1 describes plot i with two space-separated
//         integers: width_i and length_i

// SAMPLE INPUT:

// 4
// 100 1
// 15 15
// 20 5
// 1 100

// INPUT DETAILS:

// There are four plots for sale with dimensions as shown.

// OUTPUT FORMAT:

// * Line 1: The minimum amount necessary to buy all the plots.

// SAMPLE OUTPUT:

// 500

// OUTPUT DETAILS:

// The first group contains a 100x1 plot and costs 100. The next group
// contains a 1x100 plot and costs 100. The last group contains both the 20x5
// plot and the 15x15 plot and costs 300. The total cost is 500, which is
// minimal.



let acquire=Recs=>{
    let n=Recs.length
    Recs.sort((a,b)=>a[0]==b[0]?a[1]-b[1]:a[0]-b[0])
    Recs.push([-Infinity,Infinity]) //sentinel
    //remove redundant rectangles, aka those where wi,hi <= wi+1,hi+1
    // because the can be bought no matter what by the bigger recs
    let R=[]
    for (let i = 0; i < n; i++) {
        let [w1,h1]=Recs[i],[w2,h2]=Recs[i+1]
        if(w1<=w2&&h1<=h2)
            continue
        R.push([w1,h1])
    }
    console.log(R)

    // Rectangles are now in ascending width AND descending height
    /*
        dp[i]= Min value I can achieve if i grab every rectangle up to idx i
             = Min( dp[j] + h(j+1)*wi) , j<i // So it's like picking the last group to be from [j+1...i]
             Because dp[j] holds the biggest height (descending height)

    */
    n=R.length
    let dp=[...Array(n+1)].map(d=>Infinity)
    //basecase nothing
    dp[0]=0

    for (let i = 1; i <= n; i++)
        for (let j = 0; j < i; j++) {
            let [Wi,Hi]=R[i-1],[Wj,Hj]=R[j]
            //essentially means: pick the last group from [j,i]
            dp[i]=Math.min(dp[i],dp[j]+Hj*Wi )            
        }
    console.log(dp)
    return dp[n]
}

let tests=[
    [
        [100,1],[15,15],[20,5],[1,100], [20,4],[10,3]
    ]
]
console.log(
    acquire(tests[0])
)



let acquireCHT=Recs=>{
    let n=Recs.length
    Recs.sort((a,b)=>a[1]==b[1]?a[0]-b[0]:a[1]-b[1]) //sort them by ascending Height instaed,doesnt matter
    Recs.push([-Infinity,Infinity]) //sentinel
    //remove redundant rectangles, aka those where wi,hi <= wi+1,hi+1
    // because the can be bought no matter what by the bigger recs
    let R=[]
    for (let i = 0; i < n; i++) {
        let [w1,h1]=Recs[i],[w2,h2]=Recs[i+1]
        if(w1<=w2&&h1<=h2)
            continue
        R.push([w1,h1])
    }
    // Rectangles are now in ascending height AND descending width
    
    /*
        dp[i]=Min(Wj+1 * Hi + dp[j])
            y=      M  * x  +  C

        descending Slope, ascenidng Queries x
    */
    n=R.length
    let dp=[...Array(n)].map(d=>Infinity)
    //basecase nothing
    dp[0]=0
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let y=(line,x)=>{
        let [M,C]=line
        return M*x+C
    }
    let Q=[ [R[0][0],0] ] 
    //Line Minimization=>Lower Envelope
    for (let i =0; i < n; i++){
        let [Wi,Hi]=R[i]
        while(Q.length>=2&& y(Q[0],Hi)>=y(Q[1],Hi))
            Q.shift()
        let [M,C]=Q[0]
        dp[i]=M*Hi+C 
        if(i<n-1){
            let [Ww,Hh]=R[i+1],nextLine=[Ww ,dp[i]]
            while(Q.length>=2&& Intersection(nextLine,Q[Q.length-2]).x<=Intersection(Q[Q.length-1],Q[Q.length-2]).x)
                Q.pop()
            Q.push(nextLine)
        }  
    }
    console.log(dp)
    return dp[n-1]
}

console.log(
    acquireCHT(tests[0])
)

