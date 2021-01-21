// A game is played by a cat and a mouse named Cat and Mouse.

// The environment is represented by a grid of size rows x cols, where each element is a wall, floor, player (Cat, Mouse), or food.

// Players are represented by the characters 'C'(Cat),'M'(Mouse).
// Floors are represented by the character '.' and can be walked on.
// Walls are represented by the character '#' and cannot be walked on.
// Food is represented by the character 'F' and can be walked on.
// There is only one of each character 'C', 'M', and 'F' in grid.
// Mouse and Cat play according to the following rules:

// Mouse moves first, then they take turns to move.
// During each turn, Cat and Mouse can jump in one of the four directions (left, right, up, down). They cannot jump over the wall nor outside of the grid.
// catJump, mouseJump are the maximum lengths Cat and Mouse can jump at a time, respectively. Cat and Mouse can jump less than the maximum length.
// Staying in the same position is allowed.
// Mouse can jump over Cat.
// The game can end in 4 ways:

// If Cat occupies the same position as Mouse, Cat wins.
// If Cat reaches the food first, Cat wins.
// If Mouse reaches the food first, Mouse wins.
// If Mouse cannot get to the food within 1000 turns, Cat wins.
// Given a rows x cols matrix grid and two integers catJump and mouseJump, return true if Mouse can win the game if both Cat and Mouse play optimally, otherwise return false.


//minimax+ pruning
var canMouseWin = function(A, maxC  , maxM) {
    let n=A.length,m=A[0].length,seen={},
        pos=[[0,1],[0,-1],[1,0],[-1,0]],xM,yM,xC,yC,xF,yF
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) 
            if(A[i][j]==='M')[xM,yM]=[i,j]
            else if (A[i][j]==='C')[xC,yC]=[i,j]
            else if(A[i][j]==='F')[xF,yF]=[i,j]            

    let invalid=([x,y])=>(x<0||x>=n||y<0||y>=m)?true:A[x][y]==='#'

    //returns whether the current player ( determined by level -odd/even) can win the game while on the current state
    let recursion=([[xM,yM],[xC,yC]],level)=>{
        let whoPlays=Boolean(level%2),
            state=[[[xM,yM],[xC,yC]],level].toString(),
            maxAllowable=whoPlays?maxC:maxM        
        if(seen[state]===undefined){ //memoization
            //end states
            if((xC===xF&&yC===yF)||(xC===xM&&yC===yM)||level>=70) // level>=70 makes this pass
                return  seen[state]=whoPlays
            if(xM===xF&&yM===yF)
                return  seen[state]=(!whoPlays)
            //try staying still first 
            if(recursion([[xM,yM],[xC,yC]],level+1)===false)
                return seen[state]=true
            //then try moving
            for(let [dx,dy] of pos)
                for (let k = 1; k <= maxAllowable; k++){
                    let newState=whoPlays?[xC+dx*k,yC+dy*k]:[xM+dx*k,yM+dy*k]
                    if(invalid(newState)||seen[state])
                        break
                    if(recursion(whoPlays?[[xM,yM],newState]:[newState,[xC,yC]],level+1)===false)
                        return seen[state]=true
                }
            seen[state]=false
        }
        return seen[state]
    }
    return recursion([[xM,yM],[xC,yC]],0)
};

console.log(canMouseWin(
 ["####.##",
 ".#C#F#.",
 "######.",
 "##M.###"],
3,
6
))


// minimax+ a-b pruning