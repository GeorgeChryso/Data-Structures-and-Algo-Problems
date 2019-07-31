// 695. Max Area of Island
// Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

// Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)

// Example 1:

var numIslands = function(grid) {
    var c=0;
    var maxu=0
    var maxe=[]
    var cleanse=(i,j)=>{
     console.log ('cleanse',i,j)

     console.log (grid)
        if (grid[i][j]!=''){
            grid[i][j]='';
            if ( i+1< grid.length && grid[i+1][j]==1 ){
                maxu++
                cleanse(i+1,j)
                console.log (grid)
            }
            if ( i-1>=0 && grid[i-1][j]==1){
                maxu++
                cleanse(i-1,j)
                console.log (grid)
            }
            if (j+1<=grid[i].length && grid[i][j+1]==1){
                maxu++
                cleanse(i,j+1)
                console.log (grid)
            }
            if (j-1>=0 && grid[i][j-1]==1){
                maxu++
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
            maxe.push(maxu+1)
            maxu=0
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
return maxe.length==0?0:Math.max(...maxe);


};

// Runtime: 76 ms, faster than 83.58% of JavaScript online submissions for Max Area of Island.
// Memory Usage: 36.9 MB, less than 51.43% of JavaScript online submissions for Max Area of Island.
// Next challenges: