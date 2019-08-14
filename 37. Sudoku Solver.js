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

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}


var q = new Set()
for (let i = 1; i < 10; i++) {
    q.add(i)

}


var solveSudoku = function (board) {

    for (let i in board) {
        board[i].forEach( (d, j) => {
            if (d == '.') {
                board[i][j] = q
                
            }
                
        }
        )
    };



            if (isString(board[i][j])) {
                for (k = 0; k < 9; k++){
                    if (!isString(board[k][j])) {
                        board[k][j].delete(Number(board[i][j]))
                    }
                    if (!isString(board[i][k])) {
                        board[i][k].delete(Number(board[i][j]))
                    }
                }
            }else{
                if (board[i][j].size = 1)
                {
                    board[i][j] = String([...board[i][j]][0])
                    
                    for (k = 0; k < 9; k++) {
                        if (!isString(board[k][j])) {
                            board[k][j].delete(Number(board[i][j]))
                        }
                        if (!isString(board[i][k])) {
                            board[i][k].delete(Number(board[i][j]))
                        }
                    }
                }
                    
            }
    
       

        
    
            
    return board

}




// console.log(solveSudoku(
//     [
//         ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//         ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//         [".", "9", "8", ".", ".", ".", ".", "6", "."],
//         ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//         ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//         ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//         [".", "6", ".", ".", ".", ".", "2", "8", "."],
//         [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//         [".", ".", ".", ".", "8", ".", ".", "7", "9"]
//     ]
// ))

let arr=[1,2]

arr[0] = q
    q.delete(-1)
console.log('q'.size)