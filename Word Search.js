// Given a 2D board and a word, find if the word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.


//dfs O(mn*mn+w)
var exist = function(board, word) {
    word=word.split('')
    let result=false
    let moves=[[0,1],[1,0],[-1,0],[0,-1]]
    let dfs=(i,j,k)=>{
        if(k>=word.length)return true
        if(i<0||j<0||i>=board.length||j>=board[0].length)return false
        let q=board[i][j]
        if(board[i][j]===0)return false
        if(board[i][j]===word[k]){
            board[i][j]=0
            for (const [x,y] of moves) {
               if(dfs(i+x,j+y,k+1))return true
            }
        }
        board[i][j]=q
        return false
    }


    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
           if( dfs(i,j,0))return true
        }        
    }
    
    return result
    
};

console.log(
    exist(
        // [
        //     ['A','B','C','E'],
        //     ['S','F','C','S'],
        //     ['A','D','E','E']
        //   ],'ABCB'
        [["a"]],"a"
    )
)