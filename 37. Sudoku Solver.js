'use strict'

// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1 - 9 must occur exactly once in each row.
// Each of the digits 1 - 9 must occur exactly once in each column.
// Each of the the digits 1 - 9 must occur exactly once in each of the 9 3x3 sub - boxes of the grid.
// Empty cells are indicated by the character '.'.


// Note:

// The given board contain only digits 1 - 9 and the character '.'.
// You may assume that the given Sudoku puzzle will have a single unique solution.
// The given board size is always 9x9.


//backtracking

let solveSudoku=A=>{
    
    let solve=()=>{
        for (let i = 0; i <9; i++) {
            for (let j = 0; j < 9; j++) {
                if(A[i][j]=='.'){// for each blank
                    for (let num = 1; num <10; num++) //try any possible candidate 
                        if(isValidChoice(i,j,num)){ //if there's  no collision
                            A[i][j]=String(num) //fill in the candidate
                            if(solve())  //and solve the same problem with the position filled
                                return true //if a solution is found, this returns true
                            else
                                A[i][j]='.'//Otherwise, remove the candidate that you just placed and try
                                // the next one
                        }      
                    if(A[i][j]=='.') // this means that no  candidate was correct
                        return false                  
                } 
            }
        }
        return true
    }
    let isValidChoice=(row,col,c)=>{
        for (let i = 0; i <9; i++) {
            if(A[i][col] != '.' && A[i][col] == c) 
                return false; //check row
            if(A[row][i] != '.' && A[row][i] == c) 
                return false; //check column
        }
        //box of i,j
        let starti=((row/3) >>0)*3,startj=((col/3)>>0)*3 //need the floors to get the box
        for (let i = starti; i<=starti+2; i++) 
           for (let j = startj; j <= startj+2; j++) {
               if(A[i][j]!='.'&&A[i][j]==c)
                    return false  
           }
        return true
    }
    return solve()?A:-1
}



console.log(
    solveSudoku(
        [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
    )
)


