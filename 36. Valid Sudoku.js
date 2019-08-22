'use strict'

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
    var arr=[]


    var createBox=(x)=>{
        for (let q=0;q<3;q++) {
            for (let p=0;p<3;p++) {
                if(arr.indexOf(board[Number(objy[x][0])+q][Number(objy[x][1])+p])!=-1){
                    arr=[]
                    return false

                }
                arr.push(
                    board[Number(objy[x][0])+q][Number(objy[x][1])+p]
                    )
            }

         }
         arr=[]
         return true
    }
    var createCol=(i)=>{

        for (let j = 0; j < 9; j++) {
            if (arr.indexOf(board[j][i])!=-1){
                arr=[]
                return false
            }
           arr.push(board[j][i])
            
        }
        arr=[]
        return true
    }
    function checkRow(){
        for (let i = 0; i < 10; i++) {
        
        if (board.indexOf(String(i))!=board.lastIndexOf(String(i))
        ) {return false  }
      

        }
       
    return true
    }

    for (let i = 0; i < 9 && result==true; i++) {
        if(!result){break}
      result=result&&createCol(i)&&createBox(i)
            
        
    }

    return result&&checkRow()
    

}

var isValidSudoku = function (board) {



    var gimme = (i, j) => {
        let u = i

        if (i < 3) {

            if (j < 3) {
                i = 0

            }
            else if (j < 6) { i = 1 }
            else { i = 2 }


        }
        else if (i < 6) {
            if (j < 3) { i = 3 }
            else if (j < 6) { i = 4 }
            else { i = 5 }


        } else {
            if (j < 3) { i = 6 }
            else if (j < 6) { i = 7 }
            else { i = 8 }

        }
        j = (u % 3) * 3 + j % 3

        return board[i][j]
    }



    for (let i = 0; i < 9; i++) {
        let arr = {
            '1': -1,
            '2': -1,
            '3': -1,
            '4': -1,
            '5': -1,
            '6': -1,
            '7': -1,
            '8': -1,
            '9': -1
        }

        var box = {
            '1': -1,
            '2': -1,
            '3': -1,
            '4': -1,
            '5': -1,
            '6': -1,
            '7': -1,
            '8': -1,
            '9': -1
        }

        for (let j = 0; j < 9; j++) {
            let uhu = gimme(i, j)
            if (
                board[i].indexOf(String(j + 1)) != board[i].lastIndexOf(String(j + 1))
                || (arr[board[j][i]] != -1 && board[j][i] != '.')
                || (box[uhu] != -1 && uhu != '.')
            ) { return false }


            arr[board[j][i]] = 2
            box[uhu] = 2

        }

    }

    return true


}



var isValidSudoku = function (board) {
  
    
    
  


    for (let i = 0; i < 9; i++) {
        let arr = []
        var box = []

        for (let j = 0; j < 9; j++) {
            let uhu = board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + j % 3]
            if (
                board[i].indexOf(String(j + 1)) != board[i].lastIndexOf(String(j + 1))
                || (arr.indexOf(board[j][i]) != -1 && board[j][i] != '.')
                 || (box.indexOf(uhu) != -1 && uhu != '.')
            ) { console.log(arr,i,j)
                return false
            }
            
          
            box.push(uhu)
            arr.push(board[j][i])
                
        }

}
    
return true


}




console.log(isValidSudoku(
    
    
    [['.', '.', '9', '7', '4', '8', '.', '.', '2'],
        ['7', '.', '.', '6', '.', '2', '.', '.', '9'],
        ['.', '2', '.', '1', '.', '9', '.', '.', '.'],
        ['.', '.', '7', '9', '8', '6', '2', '4', '1'],
        ['2', '6', '4', '3', '1', '7', '5', '9', '8'],
        ['1', '9', '8', '5', '2', '4', '3', '6', '7'],
        ['9', '.', '.', '8', '6', '3', '.', '2', '.'],
        ['.', '.', '2', '4', '9', '1', '.', '.', '6'],
        ['.', '.', '.', '2', '7', '5', '9', '.', '.']]
    
    
))
