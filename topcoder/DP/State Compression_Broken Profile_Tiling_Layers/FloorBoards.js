// You are building a house and are laying the floorboards in one of the rooms. Each floorboard is a rectangle 1 unit wide and can be of any positive integer length. Floorboards must be laid with their sides parallel to one of the sides of the room and cannot overlap. In addition, the room may contain features such as pillars, which lead to areas of the floor where no floorboards can be laid. The room is rectangular and the features all lie on a unit-square grid within it. You want to know the minimum number of floorboards that you need to completely cover the floor.



// You are given a String[] room containing the layout of the room. Character j in element i of room represents the grid-square at position (i, j) and will be a '.' if this square needs to be covered with a floorboard or a '#' if the square is a feature where no floorboard can be laid. Return an int containing the minimum number of floorboards you need to completely cover the floor.

// -	room will contain between 1 and 10 elements, inclusive.
// -	Each element of room will contain between 1 and 10 characters, inclusive.
// -	Each element of room will contain the same number of characters.
// -	Each character in room will be a '.' or a '#'.

var layout=R=>{
    let n=R.length,m=R[0].length
    let A=[]//contains m columns in bitwise form
    for (let j = 0; j < m; j++) {
        let mask=0
        for (let i = 0; i < n; i++) 
            if(A[i][j]!=='.')
                mask|=1<<i
        A.push(mask)
    }
    let dp=[...Array(m+1)].map(d=>[...Array(1<<n)].map(d=>Infinity))
    //dp[i][m] min number of floorboards needed to completely cover the first i cols, with the i+1th col being of profile m

    let scoreNext=(prev,obst    ,next,obstnext)=>{
        let count=Number((prev[0]===1||obst[0]==1) ||(prev[0]==0&&next[0]==1))
        for (let i = 1; i < n; i++) 
            if(next[i]==0)//&&valid placing on next[i]
                count+=Number(prev[i]==1 || obst[i]==1)
            else
                count+=Number(next[i-1]==0|| obst[i-1]==1)
        return count
    }

    for (let k = 0; k < m; k++) 
        for (let mask = 0; mask < (1<<n); mask++) {
            if(mask&A[k])
                continue
                dp[k+1][next]=Math.min(dp[k+1][next],dp[k][prev]+scoreNext(origiprev,obstprev,next,obstnext))
            }        
    
    return dp[m][0]
}




var layout=( room)=>{
    let mem=[...Array(1<<12)].map(d=>[...Array(12)].map(d=>[...Array(12)].map(d=>-1)))
    let r=room,N=room.length,M=room[0].length

    //profile of a row: 
    // 1=> has a |
    // 0=> has a -

    //row, col, bm=profile of the previous row
    // inspecting the j-th cell of the i-th column for change 
    let rec=( i,  j,  previous)=>{
        //end of rows
        if( i==N ) 
            return 0;
        //memo
        if (mem[previous][j][i] > -1) 
            return mem[previous][j][i];
    
        // If the current square is blocked, just keep recursing
        if (r[i][j] === '#') 
            //"keep recursing" means go on the next element of this row, or the first element of the next row
            return rec( i+(j+1)/M, (j+1)%M, previous^(1<<j) );
    
        // Try adding a | in the current square
        let vertical = rec( i+(j+1)/M, (j+1)%M, previous | (1<<j) );
        // If the square above is not also vertical, this is a new board
        if ( (previous & 1<<j) == 0 )
          vertical++;
        
        // previous ^ (1<<j) === previous&~(1<<j) ?
        // turns off the j-th bit of previous

        // Try adding a - in the current square
        let horizontal = rec( i+(j+1)/M, (j+1)%M, previous^(1<<j));

        // If the previous square is not also horizontal, this is a new board
        if ( j==0 || r[i][j-1]=='#' || (previous & 1<<(j-1)))
          horizontal++;
          
        return mem[previous][j][i] = Math. min(vertical, horizontal);        
        
      }
    return rec(0, 0, 0)    
  }
  

