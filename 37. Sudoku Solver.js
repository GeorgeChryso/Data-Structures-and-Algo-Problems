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
var x =
    [
["5", "1", "9", "7", "4", "8", "6", "3", "2"],
["7", "8", "3", "6", "5", "2", "4", "1", "9"],
["4", "2", "6", "1", "3", "9", "8", "7", "5"],
["3", "5", "7", "9", "8", "6", "2", "4", "1"],
["2", "6", "4", "3", "1", "7", "5", "9", "8"],
["1", "9", "8", "5", "2", "4", "3", "6", "7"],
["9", "7", "5", "8", "6", "3", "1", "2", "4"],
["8", "3", "2", "4", "9", "1", "7", "5", "6"],
["6", "4", "1", "2", "7", "5", "9", "8", "3"]
]


function mapCorrect(A) {
      A.forEach((d,i)=>
        A[i].forEach((d, j) => {
            if (d == x[i][j]) {
              A[i][j]='@'
            }
            else if (d =='.'||d==' ') {
                A[i][j] = '.'
            }
            else {
                A[i][j] = '!'
            }
        }))
    
 
    return A
}



function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function union(setA, setB) {
    var _union = new Set(setA);
    for (var elem of setB) {
        _union.add(elem);
    }
    return _union;
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
            
             x[i][j] = ' '
             //x[i][j] = [x[i][j].size]
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
    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

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
    function boxDif(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let diff = new Set()// kane adeio set
            let rowunion = new Set()
            let colUnion=new Set()
            for (var k = 0; k < 9 && !isString(board[i][j]); k++)
            // gia ta 9 tou koutiou otan to A einai Set
            {
                let u = checkMyBox(i, j, k)
               
               
                //ROWS


                if (!isString(board[i][k])) {
                    if (
                        k!= i
                    ) { 
                        rowunion = union(rowunion, board[i][k])
                    }
                }
                else if (isString(board[i][k]) ) {
                    rowunion.add(Number (board[i][k]))
                }



                // COLUMNS 


                if (!isString(board[k][j]) ) {
                    if (k!=j)
                    { colUnion = union(colUnion, board[i][k]) }
                }
                else if (isString(board[k][j])){
                    colUnion.add(Number(board[k][j]))
                }



               // BOXES
                if (!isString(board[u[0]][u[1]])
                    && !(u[0] == i && u[1] == j)
                ) {
                    
                    diff = union(diff, board[u[0]][u[1]])



                } else if (isString(board[u[0]][u[1]]))  
                {
                    diff =diff.add(Number(board[u[0]][u[1]]))
                    }
            }
            if (i == 1 && j == 6) {
               // console.log(rowunion)
             }
            diff = difference(q, diff)
            rowunion = difference(rowunion, q)
            colUnion = difference(colUnion,q)
            if (rowunion.size == 1 && [...board[i][j]].includes(String([...rowunion][0]))) {
                console.log('hio', i, j)

                board[i][j] = String([...rowunion][0])
                checkMe(i, j)

            }
            if (colUnion.size == 1 && [...board[i][j]].includes(String([...colUnion][0]))) {
                console.log('hiu', i, j)

                board[i][j] = String([...colUnion][0])
                checkMe(i, j)

            }
            if (diff.size == 1
                ) {
                console.log('hi',i,j)
                board[i][j] = String([...diff][0])
                checkMe(i,j)
            }

       }
    }
    }
    boxDif()
    function findXrows() {
        let c = 0
        let u = [[],[],[],[],[],[],[],[],[],[]]
        for (let i = 0; i < 9; i++) {
           
            for (let k = 1; k < 10; k++) {

                for (let j = 0; j < 9; j++) {
                   // if (k == 3 && i == 3) { console.log(!isString(board[i][j]) && board[i][j].has(k))}
                    if (!isString(board[i][j]) && board[i][j].has(k)&&c<2) {
                        c++
                        u[k].push([i, j])
                       // console.log(k,u[k])
                    }
                }
                if (c != 2) { c = 0; continue; }
                c=0
                console.log(k, 'found in', u[k]) 
                
            }    
        }
   }
findXrows()
  return board
 // return deSet(board)
    return mapCorrect(deSet(board))


}
var solveSudoku = function (board)
{
    // check if board is valid after updating number at row-col
    function isValid(board, row, col) {
        let num = board[row][col];
        // check if row / column / block already has current number
        return !(
            boardHasNumberInSection(board, num, {
                rowStart: 0, rowEnd: 9, rowInc: 1,
                colStart: col, colEnd: col + 1, colInc: 1,
            }, { row, col })
            || boardHasNumberInSection(board, num, {
                rowStart: row, rowEnd: row + 1, rowInc: 1,
                colStart: 0, colEnd: 9, colInc: 1
            }, { row, col })
            || boardHasNumberInSection(board, num, {
                rowStart: Math.floor(row / 3) * 3, rowEnd: Math.floor(row / 3) * 3 + 3, rowInc: 1,
                colStart: Math.floor(col / 3) * 3, colEnd: Math.floor(col / 3) * 3 + 3, colInc: 1
            }, { row, col })
        );
    }

    function boardHasNumberInSection(board, num, section, skip) {
        for (let row = section.rowStart; row < section.rowEnd; row += section.rowInc) {
            for (let col = section.colStart; col < section.colEnd; col += section.colInc) {
                if (row === skip.row && col === skip.col) continue;
                if (board[row][col] === num) return true;
            }
        }
        return false;
    }

    let isSolved = [[], [], [], [], [], [], [], [], []]; // boolean board that contains "solved" flags
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let num = Number.parseInt(board[row][col]);
            isSolved[row][col] = !!Number.parseInt(board[row][col]);
            board[row][col] = num || 0;
        }
    }
    let row, col, index = 0, direction = 1;

    while (index >= 0 && index < 81) {
        row = Math.floor(index / 9);
        col = index % 9;

        if (!isSolved[row][col]) {
            // increase the next item because last try didn't succeed
            ++board[row][col];

            // increase the number till it fits into the picture, or becomes 10
            while (board[row][col] <= 9 && !isValid(board, row, col)) {
                ++board[row][col];
            }

            // intentional fail point: number can be 10. in this case reset number to 0 and backtrack
            if (board[row][col] > 9) {
                board[row][col] = 0;
                direction = -1;
            } else {
                direction = 1;
            }
        }
        index += direction;
    }
    if (index < 0) {
        throw new Error(`Catastrophic failure! Couldn't solve the puzzle`);
    }

    // convert back into strings
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col] = '' + board[row][col];
        }
    }
    return board
};
// DFS

var solveSudoku = function (board) {
    dfs(0, 0);
    function dfs(row, col) {
        if (row === 9) return true;
        if (col === 9) return dfs(row + 1, 0);
        if (board[row][col] === '.') {
            for (let num = 1; num <= 9; num++) {
                if (isValid(row, col, `${num}`)) {
                    board[row][col] = `${num}`;
                    if (dfs(row, col + 1)) { return true; }
                    board[row][col] = '.';
                }
            }
        } else {
            return dfs(row, col + 1);
        }
        return false;
    }
    function isValid(row, col, num) {
        for (let rowIdx = 0; rowIdx < 9; rowIdx++) if (board[rowIdx][col] === num) return false;
        for (let colIdx = 0; colIdx < 9; colIdx++) if (board[row][colIdx] === num) return false;

        let squareRowStart = row - (row % 3);
        let squareColStart = col - (col % 3);
        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (let colIdx = 0; colIdx < 3; colIdx++) {
                if (board[squareRowStart + rowIdx][squareColStart + colIdx] === num) return false;
            }
        }
        return true;
    }
return board
};

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
