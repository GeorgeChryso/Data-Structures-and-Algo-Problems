// In a given grid, each cell can have one of three values:

// the value 0 representing an empty cell;
// the value 1 representing a fresh orange;
// the value 2 representing a rotten orange.
// Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.







var orangesRotting = function(grid) {
     
    const q = [];
    let dep = 0;
    
    //subcases
    if(grid[0] === undefined || grid[0][0] === undefined) return dep;
    

    //scan for rotten, save [i,j,0] if found to my queue q
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            if(grid[row][col] === 2) {
                q.push([row, col, 0]);
            }
        }
    }
    
    // handle rotten triplets, if any
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


                //found an 1 adjacent to a 2, will change to 2 
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




// EL SPECIALU. props to votrubac
var orangesRotting = function(A) {
    var fresh=0
    var d=0
    

    // This functions returns 1 whenever its given a fresh orange
    // and switches the value of that to represent a rotten orange in the next processing round
    // d here stands for days passed
    function rot(i,j,d){
        if( i<0 || j<0 || i>= A.length || j>= A[i].length || A[i][j]!=1){
            return 0
        }

        A[i][j] = d + 3; //rot the orange for the next processing round
        return 1
    }

    // count all the fresh oranges
    for (let i = 0; i < A.length; i++) {
       for (let j = 0; j < A[i].length; j++) {
            if(A[i][j]===1)fresh++           
       }    
    }


    var curr_fresh=fresh

    while(fresh>0){

        // Traverse the matrix and set as rotten ( A[i][j]==d+3) 
        // all the fresh oranges (1s) that are adjacent to rottens(d+2's)
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                
                 //if the orange on cell i,j is rotten
                 if(A[i][j]===d+2){
                    //rot the adjacent 1s and subtract them from total current fresh
                    curr_fresh-=(rot(i+1,j,d)+rot(i,j+1,d)+ rot(i-1,j,d)+ rot(i,j-1,d))
                 }        
            }

             
        }            

        if(fresh==curr_fresh)return -1 // nothing changed over last rotting round

        d++
        fresh=curr_fresh
    }

    return d
}
// Time: O(h * w *   (h + w)  ), where h and w are the dimension of the grid. We are scanning h + w times (maximum distance between two cells) through all grid cells.
// Memory: O(1).










console.log(orangesRotting(
    [
        [2,1,1],
        [1,1,0],
        [0,1,1]
    ]
))