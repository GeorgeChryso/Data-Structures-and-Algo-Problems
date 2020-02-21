// given an Array of N numbers return how many different numbers there are

//O(n) space and time

var difNum1=(A)=>{
    let dict={}
    A.forEach(d=>
        dict[d]=dict[d]||true)
    return Object.keys(dict).length
}


var difNum=A=>{

    let previous=A[0]
    count=1

    for (let i = 1; i < A.length; i++) {
        if(previous!=(previous&A[i]))count++
        previous=previous&A[i]        
    }
    return count
}
console.log(
    difNum(1,2,3,4,4,4,5)
)

//P2 knapsack
// given an array w[i] of  N weights, 
// is there a subset of those weights that sum up to exactly W?

let knap=(A,W)=>{    
    let dp=Array(A.length+1).fill(null).map(d=>Array(W+1).fill(0))
    //dp[i][j] IF i can reach sum j with the first i items
    // dp[i][j]=dp[i-1][j]||dp[i-1][j-A[i]] 
    // dp[i-1][j],sum j is reachable through the first i-1 items so i just do not choose the ith
    // dp[i-1][j-A[i]] // means that whether the sum was reachable before I choose the i-th item and add it to the total reaching j
    dp[0][0]=1
    
    for (let i = 1; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            dp[i][j]=(dp[i-1][j]||(j-A[i-1]>=0?dp[i-1][j-A[i-1]]:0) )
        }
        console.log(dp[i].join(''))
    }
    return dp.some(d=>d[W])
}

//bit knap Optimization
let knap1=(A,W)=>{
    
   let previous=1<<(W)
   console.log(previous.toString(2))

   for (const weight of A) {
       previous=previous|(previous>>(weight))
       console.log(previous.toString(2))

   }
   return Boolean(previous&1)
}
// console.log(
//     knap(
//         [2,4,7,8],14
//     )
//     ,knap1(
//         [2,4,7,8],14

//     )
// )

//P3 triangles in a graph
// given a graph with N vertices(nodes), count triangles

var Triangles=C=>{

    // Input
    // Node : Set of its connections
     C={
        1:new Set([2,4,5]),
        2:new Set([1,3,4,6]),
        3:new Set([2]),
        4:new Set([1,2,5,6]),
        5:new Set([1,4,6]),
        6:new Set([2,4,5])
    }



    //bitmask representation of the connections of a node
    // 1-> 010110
    // 2-> 101101
    //1&2=>000100 (intersection of 1 and 2 at node 4)
    // So i can find the intersection of each node by a Bitwise and operation
    // but to form a triangle I need an additional edge between the two nodes I m examining


    //first i ll create the bitmasks
    let g=[0] // this array will hold key:node, val:the bit mask of its connections
    let start=1<<Object.keys(C).length // this I will use to create the bitmask
    //filling the array
    Object.keys(C).forEach(d=>
        {
            let result=0
            C[d].forEach(d=>{
                result|=start>>d
            })
            g[d]=result

        }
    )

    //returns the count of ones of a binary representation of a number
    let bitCount=(n)=>n!==0?n.toString(2).match(/1/g).length:0


    let result=0 //this counts the number of triangles
    for (let node of Object.keys(C)) {
        for (let node2 of Object.keys(C)) {
            //if there is an edge between the two nodes
            if(C[node].has(Number(node2))){
                // add all the triangles that are being created by that edge and the number of
                // intersections there are between the two nodes
                result+=bitCount(g[node]&g[node2]) 
            }
        }
    }

    return result/3 // cos every triangle is computed 3 times
}

console.log(Triangles('d'))



