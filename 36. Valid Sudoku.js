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
    let result = true
    var objy = {
00
01
02
03  10
04  11
05  12             
06 = 20
07 = 21
08 = 22
 j=>j%3
                    
                
        1: '03',
        2: '06',
        3: '30',
        4: '33',
        5: '36',
        6: '60',
        7: '63',
        8: '66'
    }
    let arr = []

    var createBox = (x) => {
        for (let q = 0; q < 3; q++) {
            for (let p = 0; p < 3; p++) {
                let u = board[Number(objy[x][0]) + q][Number(objy[x][1]) + p]
                if ( u!= '.' &&arr.indexOf(u) != -1) {
                    arr = []
                    return false
                   
                }
                arr.push(
                   u
                )
            }

        }
        arr = []
        return true
    }




    return result


    for (let i = 0; i < 9; i++) {
        let arr=[]
        for (let j = 0; i < 9; i++) {
            if (
                board[i].indexOf(String(j + 1)) != board[i].lastIndexOf(String(j + 1))
                || (arr.indexOf(board[j][i]) != -1 && board[j][i] != '.')

            ) { return false }


            arr.push(board[j][i])
      
        }

       


}
    
return true


}


console.log(isValidSudoku(
    
    [   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
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
