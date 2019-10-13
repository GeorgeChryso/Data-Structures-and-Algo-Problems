// In a given grid, each cell can have one of three values:

// the value 0 representing an empty cell;
// the value 1 representing a fresh orange;
// the value 2 representing a rotten orange.
// Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.




var orangesRotting = function(A) {
    var result=0
    var inflag=false
    var h= Array(A.length).fill(Array(A[0].length).fill(undefined))


  function min2change(i,j){
    console.log(h,i,j)
    if(i<0||i>=A.length||j<0||j>=A[0].length)return Infinity
      if(h[i][j]!==undefined)return h[i][j]
     else if( A[i][j]==2){
         h[i][j]=0
         return 0
     }
     else if ( A[i][j]==0){
         h[i][j]=Infinity
         return Infinity
     }
     else if ( A[i][j]==1){

        h[i][j]= 1+Math.min(
         min2change(i+1,j),
          min2change(i,j+1),
         min2change(i-1,j),
        min2change(i,j-1)
        )

        if (h[i][j]==Infinity){
            inflag=true
            return Infinity
        }
        result= Math.max(result,h[i][j])
        return h[i][j]
     }

  }

  for (let i = 0; i < h.length; i++) {
    for (let j = 0; j < h[0].length; j++) {
            if( h[i][j]==undefined)min2change(i,j)
    }      
  }
  min2change(0,0)

  console.log(h)
  return inflag?-1:result
};


  var orangesRotting = function(grid) {
    let queue = [];
    let totalOrange = 0;
    let rottenOrange = 0;
    let time = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                totalOrange++;
            }
            if (grid[i][j] === 2) {
                totalOrange++;
                rottenOrange++;
                queue.push([i,j,1]);
            }
        }
    }
    
    while (queue.length > 0) {
        let currOrange = queue.shift();
        // top
        if (currOrange[0] - 1 >= 0 && grid[currOrange[0] - 1][currOrange[1]] === 1) {
            rottenOrange++;
            queue.push([currOrange[0] - 1, currOrange[1], currOrange[2] + 1]);
            time = Math.max(time, currOrange[2]);
            grid[currOrange[0] - 1][currOrange[1]] = 2;
        }
        
        // down
        if (currOrange[0] + 1 < grid.length && grid[currOrange[0] + 1][currOrange[1]] === 1) {
            rottenOrange++;
            queue.push([currOrange[0] + 1, currOrange[1], currOrange[2] + 1]);
            time = Math.max(time, currOrange[2]);
            grid[currOrange[0] + 1][currOrange[1]] = 2;
        }
        
        // left
        if (currOrange[1] - 1 >= 0 && grid[currOrange[0]][currOrange[1] - 1] === 1) {
            rottenOrange++;
            queue.push([currOrange[0], currOrange[1] - 1, currOrange[2] + 1]);
            time = Math.max(time, currOrange[2]);
            grid[currOrange[0]][currOrange[1] - 1] = 2;
        }
        
        // right
        if (currOrange[1] + 1 < grid[0].length && grid[currOrange[0]][currOrange[1] + 1] === 1) {
            rottenOrange++;
            queue.push([currOrange[0], currOrange[1] + 1, currOrange[2] + 1]);
            time = Math.max(time, currOrange[2]);
            grid[currOrange[0]][currOrange[1] + 1] = 2;
        }
    }
    
    if (rottenOrange === totalOrange) {
        return time;
    } else {
        return -1;
    }
};



var orangesRotting = function(grid) {
     
    const q = [];
    let dep = 0;
    
    if(grid[0] === undefined || grid[0][0] === undefined) return dep;
    
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            if(grid[row][col] === 2) {
                q.push([row, col, 0]);
            }
        }
    }
    
    while(q.length) {
        
        const [_row, _col, _dep] = q.shift();
        
        // start rotting around this orange
        if(grid[_row][_col] === 2) {
            
            const directions = [
                [_row, _col + 1],
                [_row, _col - 1],
                [_row - 1, _col],
                [_row + 1, _col],
            ]; 
           
            for(let dir of directions) {
                if(grid[dir[0]] === undefined || grid[dir[0]][dir[1]] === undefined) continue;
                if(grid[dir[0]][dir[1]] === 1) {
                    grid[dir[0]][dir[1]] = 2;
                    q.push([dir[0], dir[1], _dep + 1]);
                }
            }

        }
        
        dep = Math.max(dep, _dep);
    }
       
    //scans the matrix for 1, if found returns -1, as its never gonna change
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            if(grid[row][col] === 1) {
                return -1;
            }
        }
    }
    
    return dep;
    
};
console.log(orangesRotting(
    [
        [2,1,1],
        [0,1,1],
        [1,0,1]
    ]
))