// Xenia likes puzzles very much. She is especially fond of the puzzles that consist of domino pieces. Look at the picture that shows one of such puzzles.


// A puzzle is a 3 × n table with forbidden cells (black squares) containing dominoes (colored rectangles on the picture). A puzzle is called correct if it meets the following conditions:

// each domino occupies exactly two non-forbidden cells of the table;
// no two dominoes occupy the same table cell;
// exactly one non-forbidden cell of the table is unoccupied by any domino (it is marked by a circle in the picture).
// To solve the puzzle, you need multiple steps to transport an empty cell from the starting position to some specified position. A move is transporting a domino to the empty cell, provided that the puzzle stays correct. The horizontal dominoes can be moved only horizontally, and vertical dominoes can be moved only vertically. You can't rotate dominoes. The picture shows a probable move.

// Xenia has a 3 × n table with forbidden cells and a cell marked with a circle. Also, Xenia has very many identical dominoes. Now Xenia is wondering, how many distinct correct puzzles she can make if she puts dominoes on the existing table. Also, Xenia wants the circle-marked cell to be empty in the resulting puzzle. The puzzle must contain at least one move.

// Help Xenia, count the described number of puzzles. As the described number can be rather large, print the remainder after dividing it by 1000000007 (109 + 7).

// Input
// The first line contains integer n (3 ≤ n ≤ 104) — the puzzle's size. Each of the following three lines contains n characters — the description of the table. The j-th character of the i-th line equals "X" if the corresponding cell is forbidden; it equals ".", if the corresponding cell is non-forbidden and "O", if the corresponding cell is marked with a circle.

// It is guaranteed that exactly one cell in the table is marked with a circle. It is guaranteed that all cells of a given table having at least one common point with the marked cell is non-forbidden.

// Output
// Print a single number — the answer to the problem modulo 1000000007 (109 + 7).




/*
    every column can be represented as 3 characters base 6 
    [ , ] , |_| ,  _   , * , X
                  | |
    0   1    2      3    4   5
    // so for each column there are totally 6**3 possible tilings

    #ways to build a puzzle up to column j  with a base 6 mask curcol is the total number of ways to build the puzzle up to idx j-1 with an appropriate column that can be its previous
    dp[j][currcol]=Σ dp[j-1][anycol] such that  anycol is a valid previous to currcol

    extra cases that need to be handled: 
        first row cant have |_|
        first col cant have ]
        last row cant have |-|
        last col cant have [ 
 
  */


var Xenia=(A)=>{
    let n=2,m=A[0].length,mod=1e9+7
    let dp=[...Array(m)].map(d=>[...Array(6**3)])
    //basecase (aka 1st column)
    for(let j=1;j<m;j++){

        for (let curr = 0; curr < 6**3; curr++) {
            //validity of cur mask for curr column //can be tabulated
            for (let prev = 0; prev < 6**3; prev++) {           
                //validity of prev mask for prev column// can be tabulated
                //validity of continuity for prev and cur // can be tabulated
                
                dp[j][cur]=( dp[j][cur]+dp[j-1][prev])%mod
            }            
        }

    }
    // actually I can handle the case of star column here
    // So up until now I counted every possible puzzle
    // but I need to remove the ones where there is no available move
    // aka the ones where the adjacent elements to my dot are incorrect
    return dp[m-1].reduce((a,c)=>a+c)
}

// let base6=(n)=>{
//     let z=n.toString(6)
//     console.log(z,parseInt(z,6))
// }
// base6(6**3-1)

// let base12=(n)=>{
//     let z=n.toString(12)
//     console.log(z,parseInt(z,12))
// }
// base12(1000)

//https://codeforces.com/contest/342/problem/D
//copied solution, no idea wassup
var Xenia=(A)=>{
    let n=A[0].length,mod=1e9+7,VR=[0,3,6],
        rowcircle,colcircle

    let f=[...Array(n)].map(d=>0) //essentially map into n columns bitwise 

    for (let i = 0; i < n; i++) 
        for (let j = 0; j < 3; j++){ 
            f[i]|=((A[i][j]!=='.')<<j)    //1 for blocks/'O',  0 for free
            if(A[i][j]==='O'){
                rowcircle=i
                colcircle=j
            }
        }



    let dp=[...Array(n)].map(d=>[...Array(8)].map(d=>[0,0]))

    //basecase (aka 1st column)
    dp[0][7][0]=1
    //111 in col 0 is made only with 1 way

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < 8; j++) {
            let cm=(j|f[i])^7 //the inverse of mask j|i-th col 
            for (let k = 0; k < 3; k++) {
                if(cm&VR[k]) //hmmmmzors, so 000,011,110 as tests
                    continue
                let am=cm|VR[k]
                if(am&f[i+1])
                    continue
                let  w = rp == i && ((1 << sp) | VR[k]) == 7 || rp == i - 2 && ((1 << sp) & ~j) || rp == i + 1 && ((1 << sp) & cm);

                dp[i][am][0] = (dp[i][am][0] + (w ? 0 : dp[i - 1][j][0])) % mod;
                dp[i][am][1] = ((dp[i][am][1] + dp[i - 1][j][1]) % mod + (w ? dp[i - 1][j][0] : 0)) % mod;
            }            
        }        
    }
    return dp[n-1][0][1]
}