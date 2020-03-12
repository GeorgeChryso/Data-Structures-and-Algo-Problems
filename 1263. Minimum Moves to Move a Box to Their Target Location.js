

// Storekeeper is a game in which the player pushes boxes around in a warehouse trying to get them to target locations.

// The game is represented by a grid of size m x n, where each element is a wall, floor, or a box.

// Your task is move the box 'B' to the target position 'T' under the following rules:

// Player is represented by character 'S' and can move up, down, left, right in the grid if it is a floor (empy cell).
// Floor is represented by character '.' that means free cell to walk.
// Wall is represented by character '#' that means obstacle  (impossible to walk there). 
// There is only one box 'B' and one target cell 'T' in the grid.
// The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a push.
// The player cannot walk through the box.
// Return the minimum number of pushes to move the box to the target. If there is no way to reach the target, return -1.




// Solution 1: 
// 0-1 BFS
// 0 represents the cost of distance travelled by the human
// 1 represents the cost  of pushes the human has to perform to the box
var minPushBox = function(G) {
    
    //find T target S start and B box 


};


