// According to the Wikipedia's article: "The Game of 
//Life, also known simply as Life, is a cellular automaton 
//devised by the British mathematician John Horton Conw
//ay in 1970."

//
// Given a board with m by n cells, each cell has an in
//itial state live (1) or dead (0). Each cell interacts with 
//its eight neighbors (horizontal, vertical, diagonal) 
//using the following four rules (taken from the above Wikipedia article):

// Any live cell with fewer than two live neighbors die
//s, as if caused by under-population.
// Any live cell with two or three live neighbors lives
// on to the next generation.
// Any live cell with more than three live neighbors d
//ies, as if by over-population..
// Any dead cell with exactly three live neighbors bec
//omes a live cell, as if by reproduction.
// Write a function to compute the next state (after o
//ne update) of the 
//board given its current state. The next state is cre
//ated by applying the above rules simultaneously to ever
// cell in the current state, where births and deaths
// occur simultaneously.

// Could you solve it in-place? Remember that the board needs to be updated at the same time: 
// You cannot update some cells first and then use their updated values to update other cells.
// In this question, we represent the board using a 2D array. In principle, the board is 
// infinite, which would cause problems when the active area encroaches the border of the array. How would you address these problems?

var gameOfLife0 = function(board) {
var A=[]
board.forEach((d)=>console.log(d))
var shouldChange=(i,j)=>{
    let c=0
    if( j+1<= board[1].length-1 && board[i][j+1]==1 ){c++}
    if(j-1>=0 && board[i][j-1]==1){c++}

    if(j-1>=0 &&i-1>=0 &&board[i-1][j-1]==1 ){c++}
    if(i-1>=0&& j+1<= board[1].length-1 &&board[i-1][j+1]==1){c++}
    if(i-1>=0&&board[i-1][j]==1){c++}

    if(j-1>=0 && i+1<=board.length-1&&board[i+1][j-1]==1){c++}
    if( i+1<=board.length-1 && board[i+1][j]==1){c++}
    if( j+1<= board[1].length && i+1<=board.length-1 &&board[i+1][j+1]==1){c++}

    if(board[i][j]==1){
        if( c==2 || c==3){
            console.log(i,j,c,false)
            return false}
            console.log(i,j,c,false)

    return true
    }
    else {
        if (c==3){
            console.log(i,j,c,true)

            return true}
            console.log(i,j,c,false)

            return false

    }

}


for (let i=0; i< board.length; i++){
        A.push([])
    for( let j=0; j<board[1].length;j++){
      shouldChange(i,j)?A[i].push(board[i][j]^1):A[i].push(board[i][j]);
    }
}

A.forEach((d,i)=>A[i].forEach((z,j)=>
{
    if(!z[j]==board[i][j]){
        board[i][j]=z[j]
    }
}
) )
return A
};

var gameOfLife = function(board) {
    var A=[]
    
    
    var shouldChange=(i,j)=>{
        let c=0
        if( j+1<= board[i].length-1 && board[i][j+1]==1 ){c++}
        if(j-1>=0 && board[i][j-1]==1){c++}
    
        if(j-1>=0 &&i-1>=0 &&board[i-1][j-1]==1 ){c++}
        if(i-1>=0&& j+1<= board[i].length-1 &&board[i-1][j+1]==1){c++}
        if(i-1>=0&&board[i-1][j]==1){c++}
    
        if(j-1>=0 && i+1<=board.length-1&&board[i+1][j-1]==1){c++}
        if( i+1<=board.length-1 && board[i+1][j]==1){c++}
        if( j+1<= board[i].length && i+1<=board.length-1 &&board[i+1][j+1]==1){c++}
    
        if(board[i][j]==1){
            if( c==2 || c==3){
                return false}
    
        return true
        }
        else {
            if (c==3){
    
                return true}
    
                return false
    
        }
    
    }
    
    
    for (let i=0; i< board.length; i++){
            A.push([])
        for( let j=0; j <board[0].length;j++){
          shouldChange(i,j)?A[i].push(board[i][j]^1):A[i].push(board[i][j]);
        }
    }
        A.forEach((d,i)=>A[i].forEach((z,j)=>
    {
        if(!A[i][j]==board[i][j]){
            board[i][j]=A[i][j]
        }
    }
    ) )
    return board
    };// better than 98%    
    

console.log(
    gameOfLife( 
       
        [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]

      
      )
)