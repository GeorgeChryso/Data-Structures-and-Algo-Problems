// Two players are playing a game on a  chessboard. The rules of the game are as follows:

// The game starts with a single coin located at some  coordinates. The coordinates of the upper left cell are 1,1 , and of the lower right cell are 15,15.

// In each move, a player must move the coin from cell  to one of the following locations:
    //x-2,y+1
    //x-2,y-1
    //x+1,y-2
    //x-1,y-2
// Note: The coin must remain inside the confines of the board.

// Beginning with player 1, the players alternate turns. The first player who is unable to make a move loses the game.

// The figure below shows all four possible moves using an  board for illustration:



//minimax recursive
function chessboardGame(x, y) {
    let memo=new Map(),
        moves=[ [-2,1],[-2,-1],[1,-2],[-1,-2] ] 
    let canIwin=(x,y)=>{
        if(memo.has([x,y].toString())){
            return memo.get([x,y].toString())
        }
        let state=false
        for (const [dx,dy] of moves) {
            if(x+dx>=1&&y+dy>=1&&x+dx<15&&y+dy<15&& canIwin(x+dx,y+dy)==false)
                state=true
        }
        memo.set([x,y].toString(),state)
        return state
    }
    return canIwin(x,y)?'First':'Second'
}

//dp bottom up
function chessboardGame(x, y) {
    let n=15,m=15,
        moves=[ [-2,1],[-2,-1],[1,-2],[-1,-2] ],
        dp=[...Array(n)].map(d=>[...Array(m)].map(d=>false))
    
    //fill the table accordingly, using diagonals 
    //fill the top triangle |-
    for (let j = 0; j < m; j++) {
        let [cx,cy]=[0,j]
        while(cx<15&&cy>=0){
            for (const [dx,dy] of moves) 
                if(cx+dx>=0&&cx+dx<n&&cy+dy>=0&&cy+dy<m&&dp[cx+dx][cy+dy]==false)
                    dp[cx][cy]=true
            cx++,cy--
        }
    }
    //fill the bottom triangle
    for (let i = 0; i < n; i++) {
        let [cx,cy]=[i,m-1]
        while(cx<15&&cy>=0){
            for (const [dx,dy] of moves) 
                if(cx+dx>=0&&cx+dx<n&&cy+dy>=0&&cy+dy<m&&dp[cx+dx][cy+dy]==false)
                    dp[cx][cy]=true
            cx++,cy--
        }
    }
    return dp[x-1][y-1]?'First':`Second`
}
console.log(chessboardGame(
    
))