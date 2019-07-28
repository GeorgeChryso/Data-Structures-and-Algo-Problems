// // Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. 
// // An island is surrounded by water and is formed by connecting adjacent land 
// // horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


// Example 1:

// Input:
// 11110
// 11010
// 11000
// 00000

// Output: 1


var numIslands0 = function(grid) {
    var c=0;

    var cleanse=(i,j)=>{
     console.log ('cleanse',i,j)

     console.log (grid)
        if (grid[i][j]==1){
            grid[i][j]=0;
            if ( i+1< grid.length && grid[i+1][j]==1 ){

                cleanse(i+1,j)
            }
            if ( i-1>=0 && grid[i-1][j]==1){
                cleanse(i-1,j)

            }
            if (j+1<=grid[i].length && grid[i][j+1]==1){
                cleanse(i,j+1)
            }
            if (j-1>=0 && grid[i][j-1]==1){
                cleanse(i,j-1)
            }

         

        }

        
    }

    var check=(i,j)=>{
        if (grid[i][j]==1){
            c++;
            console.log('kalw cleanse',i,j,'c='+c)
            cleanse(i,j)
        }

    }


    for (let i = 0; i < grid.length; i++) {
     
      for (let j = 0; j < grid[i].length; j++) {
        console.log('checki', i,j)
        check(i,j)
        
      
      }
        
    }


return c;


};


//1st attempt
// Runtime: 76 ms, faster than 34.77% of JavaScript online submissions for Number of Islands.
// Memory Usage: 37.9 MB, less than 44.00% of JavaScript online submissions for Number of Islands.
// Info, useless i-th check


var numIslands = function(grid) {
    var c=0;

    var cleanse=(i,j)=>{
     console.log ('cleanse',i,j)

     console.log (grid)
        if (grid[i][j]!=''){
            grid[i][j]='';
            if ( i+1< grid.length && grid[i+1][j]==1 ){

                cleanse(i+1,j)
                console.log (grid)
            }
            if ( i-1>=0 && grid[i-1][j]==1){
                cleanse(i-1,j)
                console.log (grid)
            }
            if (j+1<=grid[i].length && grid[i][j+1]==1){
                cleanse(i,j+1)
                console.log (grid)
            }
            if (j-1>=0 && grid[i][j-1]==1){
                cleanse(i,j-1)
                console.log (grid)
            }

         

        }
        console.log (grid)
        
    }

    var check=(i,j)=>{
        if (grid[i][j]==1){
            c++;
            console.log('kalw cleanse',i,j,'c='+c)
            cleanse(i,j)
        }
        grid[i][j]='';   
    }


    for (let i = 0; i < grid.length; i++) {
     
      for (let j = 0; j < grid[i].length; j++) {
        console.log('checki', i,j,grid[i].length)
        check(i,j)
        
      
      }
        
    }

console.log(grid)
return c;


};


// Success
// Details 
// Runtime: 72 ms, faster than 44.66% of JavaScript online submissions for Number of Islands.
// Memory Usage: 37.6 MB, less than 58.25% of JavaScript online submissions for Number of Islands.
// Next challenges:

console.log (numIslands(
    
    [["1","0","1","1","0","1","1"]]
         ))