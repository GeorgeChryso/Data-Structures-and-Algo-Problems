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
    var checkMyBox = (i, j, k) => {
        if (i < 3) {
            if (j < 3) {
                return [
                    board[0][0], board[0][1], board[0][2],
                    board[1][0], board[1][1], board[1][2],
                    board[2][0], board[2][1], board[2][2]
                ][k]
            }
            else if (j < 6) {
                return [
                    board[0][3], board[0][4], board[0][5],
                    board[1][3], board[1][4], board[1][5],
                    board[2][3], board[2][4], board[2][5]
                ][k]
            }
            else {
                return [
                    board[0][6], board[0][7], board[0][8],
                    board[1][6], board[1][7], board[1][8],
                    board[2][6], board[2][7], board[2][8]
                ][k]
            }
        }
        else if (i < 6) {
            if (j < 3) {
                return [
                    board[3][0], board[3][1], board[3][2],
                    board[4][0], board[4][1], board[4][2],
                    board[5][0], board[5][1], board[5][2]
                ][k]
            }
            else if (j < 6) {
                return [
                    board[3][3], board[3][4], board[3][5],
                    board[4][3], board[4][4], board[4][5],
                    board[5][3], board[5][4], board[5][5]
                ][k]
            }
            else {
                return [
                    board[3][6], board[3][7], board[3][8],
                    board[4][6], board[4][7], board[4][8],
                    board[5][6], board[5][7], board[5][8]
                ][k]
            }
        }
        else {
            if (j < 3) {
                return [
                    board[6][0], board[6][1], board[6][2],
                    board[7][0], board[7][1], board[7][2],
                    board[8][0], board[8][1], board[8][2]
                ][k]
            }
            else if (j < 6) {
                return [
                    board[6][3], board[6][4], board[6][5],
                    board[7][3], board[7][4], board[7][5],
                    board[8][3], board[8][4], board[8][5]
                ][k]
            }
            else {
                return [
                    board[6][6], board[6][7], board[6][8],
                    board[7][6], board[7][7], board[7][8],
                    board[8][6], board[8][7], board[8][8]
                ][k]
            }

        }
    }
    var checkMe = (i, j) => {
        if (isString(board[i][j])) {
            for (var k = 0; k < 9; k++) {

                if (!isString(board[k][j])) {
                    board[k][j].delete(Number(board[i][j]));
                  if (board[k][j].size == 1) { checkMe(k,j) }
                }

                if (!isString(board[i][k])) {
                    board[i][k].delete(Number(board[i][j]))
                    if (board[i][k].size == 1) { checkMe(i, k) }

                }
                if (!isString(checkMyBox(i, j, k))) {
                    
                }
                // MISSING THE 3X3 BOX 
            }
        } else {
            if (board[i][j].size == 1) {

                board[i][j] = String([...board[i][j]][0])

                checkMe(i, j)

            }

        }
    }


    for (let i in board) {
        board[i].forEach( (d, j) => {
            if (d == '.') {
                board[i][j] = new Set(q)
                
            }
                
        }
        )
    };
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j <9; j++) {
                    checkMe(i,j)
                



                    //
            }
        }


            
    
       

        
    
            
    return board

}




console.log(solveSudoku(
    [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]
))

let arr=[1,2]

arr[0] = q
    q.delete(-1)
console.log('q'.size)