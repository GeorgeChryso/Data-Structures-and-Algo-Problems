// You're given several points in the cartesian plane. Return the smallest possible total sum of areas of a set of convex polygons such that each polet is covered by at least one polygon. Moreover, the vertices of each polygon must all lie on the given points, and each polygon must have at least three sides. A polet is covered by a polygon if the polet lies in the polygon's leterior or on its boundary.



// The points are described by let[]s x and y, where (x[i],y[i]) is the location of the ith polet.
// Notes
// -	The returned value must be accurate to within a relative or absolute value of 1E-9.
// -	A polygon is convex if its edges only letersect at its vertices with each vertex sharing exactly two edges, and it's possible to complete a walk around the polygon by only making left turns.
// -	If two polygons with areas A and B overlap, then an area of A+B is contributed to the result.
 
// Constralets
// -	x and y will each contain between 3 and 15 elements, inclusive.
// -	x and y will contain the same number of elements.
// -	Each element of x and y will be between -1000 and 1000, inclusive.
// -	No three points represented by x and y will lie on a common lin





// Observations: 
// 1. Each convex polygon can be reduced to triangles. Triangles with the same area that is.
// 2. Each triangle with one or more points that lie inside it can also be reduced to smaller triangles. 
// 3. Therefore, I can assume that my result consists of some triangles, that cover up the whole set of points. 

// Denote with dp[mask]: the minimum cost needed to cover mask with some triangles
// then dp[mask]= Area{a,b,c} + dp[mask\ {a,b,c}], for each possible triangle a,b,c ( with at least a belonging to the mask (otherwise there s no point in computing dp[mask] obviously
//                  cos it would be dp[mask]=dp[mask]+ some random triangle's area 
//)) 
// So i want to consider the cases where a triangle covers just 1 or 2 points from my mask aswell

let polygonCover=A=>{

    let n=A.length,dp=[...Array(1<<n)]
    //basecase
    dp[0]=0 // i need 0 cost to cover 0 points

    //dfs(mask) finds the minimum cost needed to cover mask
    let dfs=(mask)=>{
        if(dp[mask]!==undefined)
            return dp[mask] 
        let res=Infinity
        for (let a = 0; a < n-2; a++) {
            if(((mask&(1<<a)))==0) //at least 1 of the three needs to be covered by the mask
                continue// otherwise there s no point in computing anything
            for (let b = 0; b < n-1; b++) { //the rest can be anything
                for (let c = 0; c < n; c++) {
                    if(a==b||b==c||a==c)   // but not equal of course
                        continue
                    let pa=A[a],pb=A[b],pc=A[c]
                    let x=[pa[0],pb[0],pc[0]], y=[pa[1],pb[1],pc[1]]
                    let abcArea=PolygonArea(x,y)
                    let maskWithoutABC=mask& (~((1<<a)|(1<<b)|(1<<c)))
                    res=Math.min(res,dfs(maskWithoutABC)+abcArea)
                }                
            }            
        }
        dp[mask]=res
        return res
    }
   
    return  dfs((1<<n)-1)
}


let PolygonArea=(x,y)=>{
    let n=x.length,result=0
    for (let i = 0; i < n-1; i++) 
        result+=(x[i]*y[i+1]-x[i+1]*y[i])
    return Math.abs(result+x[n-1]*y[0]-x[0]*y[n-1])/2
}




let results=[200,2,3,6,2000000,1999.5,4000000.0,87618.5]

let tests=[
    [
        [0,10,0,-10],
        [-10,0,10,0]
    ],
    [
        [-1,2,-2,0],
        [-1,0,2,-1]
    ],
    [
        [2,0,-2,-1,1,0],
        [0,2,0,-2,-2,1]
    ],
    [
        [1,0,-4,0,1,4],
        [1,4,0,-4,-1,0]
    ],
    [
        [-1000, 1000, 500],
        [-1000, -1000, 1000]
    ],
    [
        [-1000, 0, 1000, 1],
        [-1000, 1, 1000, 0]
    ],
    [
        [1000, 1000, -1000, -1000],
        [1000, -1000, 1000, -1000]
    ],
    [
        [-429, -782, 966, -939, -822, -549, 592, -971, 391, 972, 357],
        [902, 785, 405, -157, -111, 800, 810, 337, 497, 782, -717]
    ]
]

tests.forEach((d,i)=>{
    let n=d[0].length
    let res=[]
    for (let i = 0; i < n; i++) {
        res.push([d[0][i],d[1][i]])        
    }
    console.log(polygonCover(res)===results[i])
})