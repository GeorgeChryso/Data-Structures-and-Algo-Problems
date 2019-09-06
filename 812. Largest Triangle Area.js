// You have a list of points in the plane. Return the area of the largest triangle that can be formed by any 3 of the points.

// Example:
// Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
// Output: 2
// Explanation: 
// The five points are show in the figure below. The red triangle is the largest.


var largestTriangleArea = function(points) {
    // useful methods for calculating area with the formula of Geron
    const getSide = (pointA, pointB) => Math.sqrt(
        Math.abs(pointA[0] - pointB[0]) ** 2 + Math.abs(pointA[1] - pointB[1]) ** 2
    );
    const getPerimeter = (a, b, c) => 0.5 * (a + b + c);
    const getArea = (a, b, c) => {
        const P = getPerimeter(a,b,c);
        return Math.sqrt(P * (P - a) * (P - b) * (P - c));
    }
    
    const triangleSides = [];
    
    // receive array with sides of triangle
    for (let i = 0; i < points.length; i++) {
        for (let j = 1; j < points.length; j++) {
            if (j < i) continue;
            
            for (let k = 2; k < points.length; k++) {
                if (k < j) continue;
                triangleSides.push([
                    getSide(points[i], points[j]),
                    getSide(points[j], points[k]),
                    getSide(points[k], points[i])
                ]);
            }
        }
    }
    
    // receive max triangle area
    return triangleSides.reduce((max, sides) => {
        const newArea = getArea(...sides);
        return newArea > max ? newArea : max;
    }, 0);
};