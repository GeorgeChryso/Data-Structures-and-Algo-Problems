// You're given several points in the cartesian plane. Return the smallest possible total sum of areas of a set of convex polygons such that each point is covered by at least one polygon. Moreover, the vertices of each polygon must all lie on the given points, and each polygon must have at least three sides. A point is covered by a polygon if the point lies in the polygon's interior or on its boundary.



// The points are described by int[]s x and y, where (x[i],y[i]) is the location of the ith point.
// Notes
// -	The returned value must be accurate to within a relative or absolute value of 1E-9.
// -	A polygon is convex if its edges only intersect at its vertices with each vertex sharing exactly two edges, and it's possible to complete a walk around the polygon by only making left turns.
// -	If two polygons with areas A and B overlap, then an area of A+B is contributed to the result.
 
// Constraints
// -	x and y will each contain between 3 and 15 elements, inclusive.
// -	x and y will contain the same number of elements.
// -	Each element of x and y will be between -1000 and 1000, inclusive.
// -	No three points represented by x and y will lie on a common lin




//Questions: 
// How to map a choice: 1011 to the CORRECT polygon
// How to 



let polygonCover=A=>{
    let mod=1e9

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
    console.log(polygonCover(d)==results[i])
})