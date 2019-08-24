// You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.

// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

// The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

var islandPerimeter = function(A) {
    function worth(i,j){
        if(A[i][j]==0){return 0}
        let c=0
        if (i>=1&& A[i-1][j]==0){c++}
        if (j>=1 &&A[i][j-1]==0){c++}
        if (j<A[0].length-1&&A[i][j+1]==0){c++}
        if(i<A.length-1 && A[i+1][j]==0){c++}
        if(i==0){c++}
        if( j==0){c++}
        i==A.length-1&&c++
        j==A[0].length-1&&c++
        return c
    }  
    let answ=0
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            answ+=worth(i,j)
        }
        
    }

    return answ
};

console.log(islandPerimeter(
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]
))