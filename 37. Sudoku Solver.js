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
    
    let solve=(A)=>{
        for (let i = 1; i <10; i++) {
            for (let j = 1; j < 10; j++) {
                if(A[i][j]=='.'){
                    for (let num = 1; num <10; num++) 
                        if(isValidChoice(i,j,num)){
                            A[i][j]=num
                            if(solve(A))
                                return true
                            else
                                A[i][j]='.'//backtrack
                        }                        
                }   
                return false   
            }            
        }
        return true
    }
    let isValidChoice=(row,col,c)=>{
        for (let i = 0; i <9; i++) {
            if(A[i][col] != '.' && A[i][col] == c) return false; //check row
            if(A[row][i] != '.' && A[row][i] == c) return false; //check column
            if(A[3 * (row / 3)|0 + (i % 3)][ 3 * (col / 3) + i % 3] != '.' && 
A[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false; //check 3*3 block
        }
        return true
    }
    solve(A)
    return A
}

console.log(
    solveSudoku(
        [   [".", ".", "9", "7", "4", "8", ".", ".", "."],
            ["7", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", "2", ".", "1", ".", "9", ".", ".", "."],
            [".", ".", "7", ".", ".", ".", "2", "4", "."],
            [".", "6", "4", ".", "1", ".", "5", "9", "."],
            [".", "9", "8", ".", ".", ".", "3", ".", "."],
            [".", ".", ".", "8", ".", "3", ".", "2", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "6"],
            [".", ".", ".", "2", "7", "5", "9", ".", "."]
        ]
    )
)


