// There are some spherical balloons spread in two-dimensional space. For each balloon, provided input is the start and end coordinates of the horizontal diameter. Since it's horizontal, y-coordinates don't matter, and hence the x-coordinates of start and end of the diameter suffice. The start is always smaller than the end.

// An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with xstart and xend bursts by an arrow shot at x if xstart ≤ x ≤ xend. There is no limit to the number of arrows that can be shot. An arrow once shot keeps traveling up infinitely.

// Given an array points where points[i] = [xstart, xend], return the minimum number of arrows that must be shot to burst all balloons.

 

// Example 1:

// Input: points = [[10,16],[2,8],[1,6],[7,12]]
// Output: 2
// Explanation: One way is to shoot one arrow for example at x = 6 (bursting the balloons [2,8] and [1,6]) and another arrow at x = 11 (bursting the other two balloons).
// Example 2:

// Input: points = [[1,2],[3,4],[5,6],[7,8]]
// Output: 4
// Example 3:

// Input: points = [[1,2],[2,3],[3,4],[4,5]]
// Output: 2
// Example 4:

// Input: points = [[1,2]]
// Output: 1
// Example 5:

// Input: points = [[2,3],[2,3]]
// Output: 1



//TLDR you shoot arrows at different x, an arrows bursts a balloon if l<=x<=y

var findMinArrowShots = function(points) {
    let n=points.length,x=-Infinity,y=Infinity,result=0
    if(n<=1)
        return n
    points.sort((a,b)=>a[0]!==b[0]?a[0]-b[0]:b[1]-a[1]) // i sort
    // so i meet the earlier intervals first, but with a bigger y
    // so they intersect with some of the next intervals

    // x and y is the current interval
    while(points.length){
        let [cx,cy]=points.shift()
        // if there's no intersection that means i need a new arrow
        if(cx>y||cy<x){
            x=cx 
            y=cy
            result++
            continue
        }
        //i know that x<=cx cos i sorted
        // so that leaves us with 2 options
        
        //x <=cx <= y <=cy => intersection: [cx,y]
        // or 
        //x <=cx <=cy <= y => intersection: [cx,cy]
        //s o the new intersection is always [cx,Math.min(y,cy)]
        x=cx
        y=Math.min(y,cy)

    }
    return result+1 //+1 for the first group which wasnt counted
};