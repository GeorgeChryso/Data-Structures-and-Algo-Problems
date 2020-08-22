// Given a list of non-overlapping axis-aligned rectangles rects, write a function pick which randomly and uniformily picks an integer point in the space covered by the rectangles.

// Note:

// An integer point is a point that has integer coordinates. 
// A point on the perimeter of a rectangle is included in the space covered by the rectangles. 
// ith rectangle = rects[i] = [x1,y1,x2,y2], where [x1, y1] are the integer coordinates of the bottom-left corner, and [x2, y2] are the integer coordinates of the top-right corner.
// length and width of each rectangle does not exceed 2000.
// 1 <= rects.length <= 100
// pick return a point as an array of integer coordinates [p_x, p_y]
// pick is called at most 10000 times.
// Example 1:

// Input: 
// ["Solution","pick","pick","pick"]
// [[[[1,1,5,5]]],[],[],[]]
// Output: 
// [null,[4,1],[4,1],[3,3]]





//ok so this solution does produce a point from a random rectangle but...
// The points are NOT UNIFORMLY CHOSEN, meaning that a bigger rectangle has
// the same chances of being picked with a small rectangle. And that is incorrect
var Solution = function(rects) {
    this.rects=rects
};

Solution.prototype.pick = function() {
    let i=(Math.random()*this.rects.length)>>0

    let [x1,y1,x2,y2]=this.rects[i]
    let dx=x2-x1,dy=y2-y1

    let px=(Math.random()*(dx+1))>>0
    let py=(Math.random()*(dy+1))>>0
    return [x1+px,y1+py]
};


// What needs to happen instead is that you uniformly pick a rectangle with bigger
// rectangles having more chances of being picked. You can weigh the rectangles according to their number
// of points inside them 
// ... implement it