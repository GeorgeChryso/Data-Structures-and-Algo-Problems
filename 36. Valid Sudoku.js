// Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.



var isValidSudoku = function(board) {
    let result=true
    var objy={   
        0:'00',
        1:'03',
        2:'06',
        3:'30',
        4:'33',
        5:'36',
        6:'60',
        7:'63',
        8:'66'}
    var createBox=(x)=>{
        let arr=[]
        for (let q=0;q<3;q++) {
            for (let p=0;p<3;p++) {
                arr.push(
                    board[Number(objy[x][0])+q][Number(objy[x][1])+p]
                    )
            }

         }
         return arr
    }
    var createCol=(i)=>{
        let z=[]
        for (let j = 0; j < 9; j++) {
           z.push(board[j][i])
            
        }
        return z
    }
    var checkEnt=(x)=>{
        for (let i = 1; i < 10; i++) {
        
        if (x.indexOf(String(i))!=x.lastIndexOf(String(i))
        ) {return false  }
      

        }
       
    return true
    }

    for (let i = 0; i < 9 && result==true; i++) {

      result=result&&checkEnt(createCol(i))&&checkEnt(board[i])
        &&checkEnt(createBox(i))
            
        
    }

    return result
    

}
var isValidSudoku = function(board) {
    let result=true
    var objy={   
        0:'00',
        1:'03',
        2:'06',
        3:'30',
        4:'33',
        5:'36',
        6:'60',
        7:'63',
        8:'66'}

    var createBox=(x)=>{
        let arr=[]
        for (let q=0;q<3;q++) {
            for (let p=0;p<3;p++) {
                if(arr.indexOf(board[Number(objy[x][0])+q][Number(objy[x][1])+p])!=-1){
                    return false
                }
                arr.push(
                    board[Number(objy[x][0])+q][Number(objy[x][1])+p]
                    )
            }

         }
         return true
    }
    var createCol=(i)=>{
        let z=[]
        for (let j = 0; j < 9; j++) {
            if (z.indexOf(board[j][i])!=-1){
                return false
            }
           z.push(board[j][i])
            
        }
        return true
    }
    var checkEnt=(x)=>{
        for (let i = 1; i < 10; i++) {
        
        if (x.indexOf(String(i))!=x.lastIndexOf(String(i))
        ) {return false  }
      

        }
       
    return true
    }

    for (let i = 0; i < 9 && result==true; i++) {

      result=result&&checkEnt(createCol(i))&&checkEnt(board[i])
        &&checkEnt(createBox(i))
            
        
    }

    return result
    

}



console.log(isValidSudoku(
    [
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".","9",".",".",".",".",".",".","1"],
        ["8",".",".",".",".",".",".",".","."],
        [".","9","9","3","5","7",".",".","."],
        [".",".",".",".",".",".",".","4","."],
        [".",".",".","8",".",".",".",".","."],
        [".","1",".",".",".",".","4",".","9"],
        [".",".",".","5",".","4",".",".","."]
    ]
))
