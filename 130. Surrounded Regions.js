// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.

var solve = function(A) {
    if (A.length<=0)return A
    var spread=(i,j)=>{
        if(i<0||j<0||i>A.length-1||j>A[0].length-1)return
        console.log(i,j)
        if(A[i][j]!='O')return;
        A[i][j]=3
        if(i<A.length-1&& A[i+1][j]=='O'){
            spread(i+1,j)
        }
        if(i>0&&A[i-1][j]=='O'){
            spread(i-1,j)
        }
        if(j<A[0].length-1&&A[i][j+1]=='O'){
            spread(i,j+1)
        }
        if(j>0&&A[i][j-1]=='O'){
            spread(i,j-1)
        }
        return 
    }
    console.log(A.map(d=>d+''))
    
    for (let j = 0,i=0; j < A[0].length; j++) {
        if ( A[i][j]=='O'){
            spread(i,j)
        }        
    }

    console.log(A.map(d=>d+''))

    for (let j = 0,i=A.length-1; j < A[0].length; j++) {
        if ( A[i][j]=='O'){
            spread(i,j)
        }        
    }

    console.log(A.map(d=>d+''))

    for (let i = 0,j=0; i < A.length; i++) {
        if ( A[i][j]=='O'){
            spread(i,j)
        }        
    }
    console.log(A.map(d=>d+''))

    for (let i = 0; i < A.length; i++) {
        if ( A[i][A[0].length-1]=='O'){
            console.log('call',i)
            spread(i,A[0].length-1)
        }        
    }
    console.log(A.map(d=>d+''))

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
                
            if(A[i][j]=='O')A[i][j]='X'
            else if (A[i][j]==3)A[i][j]='O'
            else  continue
        }
        
    }
    console.log(A.map(d=>d+''))

    return A

};

console.log(solve(
    [
    ["X","O","O","X","X","X","O","X","O","O"],
    ["X","O","X","X","X","X","X","X","X","X"],
    ["X","X","X","X","O","X","X","X","X","X"],
    ["X","O","X","X","X","O","X","X","X","O"],
    ["O","X","X","X","O","X","O","X","O","X"],
    ["X","X","O","X","X","O","O","X","X","X"],
    ["O","X","X","O","O","X","O","X","X","O"],
    ["O","X","X","X","X","X","O","X","X","X"],
    ["X","O","O","X","X","O","X","X","O","O"],
    ["X","X","X","O","O","X","O","X","X","O"]
]
))

