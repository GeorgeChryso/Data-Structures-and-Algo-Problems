// Given a circle represented as (radius, x_center, y_center) and an axis-aligned rectangle represented as (x1, y1, x2, y2), where (x1, y1) are the coordinates of the bottom-left corner, and (x2, y2) are the coordinates of the top-right corner of the rectangle.

// Return True if the circle and rectangle are overlapped otherwise return False.

// In other words, check if there are any point (xi, yi) such that belongs to the circle and the rectangle at the same time.

// Math, if any of the edges of the rectangle has a lesser than the radius distance from the center of the circle, that means that they re overlapping
var checkOverlap = function(radius, x_center, y_center, x1, y1, x2, y2) {
    

    for (let x = x1; x <=x2; x++) {
        for (let y = y1; y <=y2; y++) {
            if(Math.sqrt( (x_center-x)**2+(y-y_center)**2 )<=radius)return true            
        }        
    }
    return false
};