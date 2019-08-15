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
function intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
function deSet(x) {
    for (let i in x) {
     for (let j in x[i]) {
         if (!isString(x[i][j])) {
            
             //x[i][j] = '.'
             x[i][j] = [x[i][j].size]
         }
     }
    }
    return x
}
function difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
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
                    [0,0], [0,1], [0,2],
                    [1,0], [1,1], [1,2],
                    [2,0], [2,1], [2,2]
                ][k]
            }
            else if (j < 6) {
                return [
                    [0,3], [0,4], [0,5],
                    [1,3], [1,4], [1,5],
                    [2,3], [2,4], [2,5]
                ][k]
            }
            else {
                return [
                    [0,6], [0,7], [0,8],
                    [1,6], [1,7], [1,8],
                    [2,6], [2,7], [2,8]
                ][k]
            }
        }
        else if (i < 6) {
            if (j < 3) {
                return [
                    [3,0], [3,1], [3,2],
                    [4,0], [4,1], [4,2],
                    [5,0], [5,1], [5,2]
                ][k]
            }
            else if (j < 6) {
                return [
                    [3,3], [3,4], [3,5],
                    [4,3], [4,4], [4,5],
                    [5,3], [5,4], [5,5]
                ][k]
            }
            else {
                return [
                    [3,6], [3,7], [3,8],
                    [4,6], [4,7], [4,8],
                    [5,6], [5,7], [5,8]
                ][k]
            }
        }
        else {
            if (j < 3) {
                return [
                    [6,0], [6,1], [6,2],
                    [7,0], [7,1], [7,2],
                    [8,0], [8,1], [8,2]
                ][k]
            }
            else if (j < 6) {
                return [
                    [6,3], [6,4], [6,5],
                    [7,3], [7,4], [7,5],
                    [8,3], [8,4], [8,5]
                ][k]
            }
            else {
                return [
                    [6,6], [6,7], [6,8],
                    [7,6], [7,7], [7,8],
                    [8,6], [8,7], [8,8]
                ][k]
            }

        }
    }
    var checkMe = (i, j) => {
        if (isString(board[i][j])) {
            for (let k = 0; k < 9; k++) {

                if (!isString(board[k][j])) {
                    board[k][j].delete(Number(board[i][j]));
                  if (board[k][j].size == 1) { checkMe(k,j) }
                }

                if (!isString(board[i][k])) {
                    board[i][k].delete(Number(board[i][j]))
                    if (board[i][k].size == 1) { checkMe(i, k) }

                }
                let u = checkMyBox(i,j,k)
                if (!isString(board[u[0]][u[1]])) {
                    board[u[0]][u[1]].delete(Number(board[i][j]))
                    if (board[u[0]][u[1]].size == 1) { checkMe(u[0], u[1]) }
                }
                // MISSING THE 3X3 BOX 
            }
        }
        else {
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
            }
        }

// box differences
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let diff = new Set()// kane adeio set
            for (var k = 0; k < 9 && !isString(board[i][j]); k++) // gia ta 9 tou koutiou otan to A einai Set
            {
                let u = checkMyBox(i, j, k)
                if (!isString(board[u[0]][u[1]])){              //  An to stoixeio einai Set
                    if (diff.size == 0)                         // vale sto diff tin diafora poy exei to A me to stoixeio koutiou
                    {
                        diff = difference(board[i][j], board[u[0]][u[1]])
                        continue;
                    }
                                                            // as einai diff2 h diafora tou A me to stoixeio koutiou
                    let diff2 = difference(board[i][j], board[u[0]][u[1]])
                            // to size tis diaforas diff kai diff2 einai diaforo tou 0, to kouti axristeutike
                   diff=intersection(diff,diff2)
                }    
            }
            if (diff.size == 1&&k==9) {
                board[i][j] = String([...diff][0])
                checkMe(i,j)
            }
       }
    }
            
     //return deSet(board)
    return board

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
  
// console.log(solveSudoku(
    
//     [
//         [".", ".", "9", "7", "4", "8", ".", ".", "."],
//         ["7", ".", ".", ".", ".", ".", ".", ".", "."],
//         [".", "2", ".", "1", ".", "9", ".", ".", "."],
//         [".", ".", "7", ".", ".", ".", "2", "4", "."],
//         [".", "6", "4", ".", "1", ".", "5", "9", "."],
//         [".", "9", "8", ".", ".", ".", "3", ".", "."],
//         [".", ".", ".", "8", ".", "3", ".", "2", "."],
//         [".", ".", ".", ".", ".", ".", ".", ".", "6"],
//         [".", ".", ".", "2", "7", "5", "9", ".", "."]
//     ]
    
    
// ))

