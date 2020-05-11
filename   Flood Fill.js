// An image is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).

// Given a coordinate (sr, sc) representing the starting pixel (row and column) of the flood fill, and a pixel value newColor, "flood fill" the image.

// To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.

// At the end, return the modified image.









var floodFill = function(image, sr, sc, newColor) {
    let memo=[...Array(image.length)].map(d=>[...Array(image[0].length)].map(q=>false))
    console.log(memo)
    let startingPixel=image[sr][sc]
    let dir=[[-1,0],[+1,0],[0,-1],[0,1]]
    let recursion=(i,j)=>{
        if(i<0||i>image.length-1||j<0||j>image[0].length-1||memo[i][j]||image[i][j]!==startingPixel)return
        memo[i][j]=true
        image[i][j]=newColor
        for (const [x,y] of dir) {
            recursion(i+x,j+y)
        }
    }
    
    recursion(sr,sc)
    return image
};


console.log(
    floodFill(
        [[1,1,1],[1,1,0],[1,0,1]],
1,
1,
2
    )
)