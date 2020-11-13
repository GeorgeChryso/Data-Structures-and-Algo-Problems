// You are building a house and are laying the floorboards in one of the rooms. Each floorboard is a rectangle 1 unit wide and can be of any positive integer length. Floorboards must be laid with their sides parallel to one of the sides of the room and cannot overlap. In addition, the room may contain features such as pillars, which lead to areas of the floor where no floorboards can be laid. The room is rectangular and the features all lie on a unit-square grid within it. You want to know the minimum number of floorboards that you need to completely cover the floor.



// You are given a String[] room containing the layout of the room. Character j in element i of room represents the grid-square at position (i, j) and will be a '.' if this square needs to be covered with a floorboard or a '#' if the square is a feature where no floorboard can be laid. Return an int containing the 

/////////minimum number of floorboards you need to completely cover the floor.

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



// Interesting: Profile acting as both previous and current row. 
var layoutI=( room)=>{
    let mem=[...Array(1<<12)].map(d=>[...Array(12)].map(d=>[...Array(12)].map(d=>-1))),
        N=room.length,M=room[0].length

    //profile of a row: 
    // 1=> has a |
    // 0=> has a -, only if room[i][j]!=='#', otherwise Obstacle.

    
    // rec returns the Minimum number of floorboards I need to cover everything below(/ to the right of i,j and below) when the previous row has profile previous
    let rec=( i,  j,  previous)=>{
        // Previous acts as both the previous and the current row. How?
        // Putting a Vertical tile depends on the previous row. To be more precise it depends on 
        // the cell right above j. In this case, because the mask previous is not yet altered for 
        // the j-th cell, it holds information about the j-th cell of the previous row. 
        // However, if we consider putting a Horizontal tile, that depends on the j-1-th element of this row. Luckily this is already considered on previous. 

        //end of rows
        if( i==N ) 
            return 0;
        //memo
        if (mem[previous][j][i] > -1) 
            return mem[previous][j][i];

        // i+(((j+1)/M)>>0), (j+1)%M goes on the next element of this row, or the first element of the next row if there are no more elements on the current row.

        // If the current square is blocked, just keep recursing
        if (room[i][j] === '#') 
            //"keep recursing" means go on the next element of this row, or the first element of the next row
            return rec( i+(((j+1)/M)>>0), (j+1)%M, previous&~(1<<j) );
    
        // Try adding a | in the current square
        let vertical = rec( i+(((j+1)/M)>>0), (j+1)%M, previous | (1<<j) );
        // If the square above is not also vertical, this is a new board
        if ( (previous & 1<<j) == 0 )
          vertical++;
        
        //  previous&~(1<<j) turns off the j-th bit of previous

        // Try adding a - in the current square
        let horizontal = rec( i+ (((j+1)/M )>>0), (j+1)%M, previous&~(1<<j));

        // If the previous square is not also horizontal, this is a new board
        // Ok, so this may be as if it's referring to the previous row, but in this case
        // it's referring to the current one, the previous element of this row, aka j-1 
        // If j==0, that means we tiled with a - on and there's no continuation fro mthe left side,
        // so we increase by 1. same goes if the previous element is an obstacle or a | vertical seg.
        if ( j==0 || room[i][j-1]=='#' || (previous & 1<<(j-1)))
          horizontal++;
         
        // the minimum  out of 
        // the minimum boards needed to tile below this by picking a vertical seg
        // the minimum boards needed to tile below this by picking a horizontal seg
        return mem[previous][j][i] = Math. min(vertical, horizontal);        
      }
    return rec(0, 0, 0)    
  }
  

// Iterative x2 masks
  var layout=R=>{

    let n=R.length,m=R[0].length,
        dp=[...Array(12)].map(d=>[...Array(1<<12)].map(d=>Infinity))
    let isValid=(mask,row)=>{
        for (let j = 0; j < m; j++)
            if((mask&(1<<j))&& R[row][j]==='#')
                return false
        return true
    }

    //Basecase (dp[0])
    for (let prev = 0; prev < (1<<m); prev++) {
        let res=0
        for (let j = 0; j < m; j++) 
            if(prev&(1<<j)){ 
                if( R[0][j]==='#')
                    res=Infinity
                else// |
                    res++
            }
            else{ 
                if( R[0][j]==='#')//#
                    continue 
                else if(j==0 ||R[0][j-1]=='#' ||(prev&(1<<(j-1)))) //-
                    res++
            }   
        dp[0][prev]=res
    }

    for (let i = 1; i <n; i++) {
        for (let prev = 0; prev < (1<<m); prev++) {
            if(!isValid(prev,i-1))
                continue
            for (let curr = 0; curr < (1<<m); curr++) {
                if(!isValid(curr,i))
                    continue
                let rest=0
                for (let k = 0; k < m; k++) {
                    if(curr&(1<<k)){ // | 
                        if( R[i][k]==='#')//isvalid curr
                            break
                        if((prev&(1<<k)) ==0 || R[i-1][k]==='#')
                            rest++
                    }
                    else{ //k-th bit doesnt have vertical 
                        //if it's an obstacle
                        if(R[i][k]==='#') 
                            continue
                        //if it's the first element, or the the left is a vertical or an obstacle
                        if(k==0|| (curr&(1<<(k-1))) || R[i][k-1]==='#')
                            rest++
                    }                    
                }
                dp[i][curr]=Math.min(dp[i-1][prev]+rest,dp[i][curr])  
            }
        }        
    }
    return Math.min(...dp[n-1])
}



let tests=[

    ["....."
    ,"....."
    ,"....."
    ,"....."
    ,"....."],
    ["......."
    ,".#..##."
    ,".#....."
    ,".#####."
    ,".##..#."
    ,"....###"],
    ["####"
    ,"####"
    ,"####"
    ,"####"],
    ["...#.."
    ,"##...."
    ,"#.#..."
    ,".#...."
    ,"..#..."
    ,"..#..#"],
    [".#...."
    ,"..#..."
    ,".....#"
    ,"..##.."
    ,"......"
    ,".#..#."],
    ["#....#.#..", "......###.", ".#...#....", "..##......", ".#..#..#..", "..#....###", "........#.", ".##...#...", ".#......#.", "..#....#.."],
    ["...##..#..", ".####...#.", "######..##", "##..######", "##########", "##.#.###..", "##..#.#...", ".#.#..###.", "..##.#.###", "###.####.#"],
    ["..........", "#.........", "#......#..", "......#..#", "..........", "#.........", ".......#..", "..........", "..........", ".....##.#."],
    ["......#..#", "....#..#..", "...#...##.", "..#.#.###.", "...#.#..##", "##..#..#.#", "....#.###.", "###.....#.", ".##.###..."],
    [".#.#...#.#", "..#...#...", ".....#...#", "#.#.#.#.#.", ".#...#....", "#...#.#.#.", "...#...#.#", "#...#.#...", ".#.#.#.#.#", "..#...#..."],
    ["#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#", "#.#.#.#.#.", ".#.#.#.#.#"],
    ["#####.####", "#####.####", "#####.####", "#####.####", "..........", "#####.####", "#####.####", "#####.####", "#####.####", "#####.####"]
    ,[
        ".#.#.#.#", "#.#.#.#.", ".#.#...#", "#.#.#.#.", ".#.#.#.#", "#.#.#.#.", ".#.#.#.#", "#.#.#.#.", ".#.#.#.#", "#.#.#.#."
    ]

]

let output=[
    5,7,0,9,9,23,21,15,24,33,50,3,39
]

console.log(
    tests.map(d=>layout(d))
)

console.log(output)