// You are given an array coordinates, coordinates[i] = [x, y], where [x, y] represents the coordinate of a point. Check if these points make a straight line in the XY plane.



/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
// Maths
var checkStraightLine = function(c) {
    let l=(c[0][1]-c[1][1])/(c[0][0]-c[1][0])
    let b=c[0][1]-l*c[0][0]

    return c.every(([x,y])=>l*x+b==y)
};