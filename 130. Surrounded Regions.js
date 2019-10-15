// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.


// Switch all the border to 3s, it is a dfs
var solve = function(A) {
    if (A.length<=1)return A

    //This function plagues the element itself
    // and spreads the plague to adjacent ones
    var spread=(i,j)=>{
        if(i<0||j<0||i>A.length-1||j>A[0].length-1)return
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
    


    //plague the elements of first and last row    
    for (let i = 0; i < A.length; i+=A.length-1) {
        for (let j = 0; j < A[0].length; j++) {
            if(A[i][j]=='O')spread(i,j)
        }        
    }

    //plague the elements of first and last column    
    for (let j = 0; j< A[0].length; j+=A[0].length-1) {
        for (let i = 1; i < A.length-1; i++) {
            if(A[i][j]=='O')spread(i,j)
        }        
    }


     // replace all plagued with 'O' and the rest with 'X'
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
                
            if(A[i][j]=='O')A[i][j]='X'
            else if (A[i][j]==3)A[i][j]='O'
            else  continue
        }
        
    }

    return A

};


// MORE CLEAR BREADTH FIRST SEARCH
// plagued: is an element that remains 'O' after the switch
var solve = function(A) {
    if (A.length<=1)return A
   
    var queue=[]// Here I will store all the plagued elements

    //check the first and last rows for plagued elements
    for (let i = 0; i < A.length; i+=A.length-1) {
        for (let j = 0; j < A[0].length; j++) {
            if(A[i][j]=='O')queue.push([i,j])
        }        
    }

    //check the first and last columns
    for (let j = 0; j< A[0].length; j+=A[0].length-1) {
        for (let i = 1; i < A.length-1; i++) {
            if(A[i][j]=='O')queue.push([i,j])
        }        
    }



    //queue now has the border's plagued elements
    // I will keep adding to the queue the 'O's connected 
    // to the plagued elements and plaguing them aswell
    while(queue.length){

        let [i,j]=queue.shift() // shift an element and process it

        if(i<0||j<0||i>A.length-1||j>A[0].length-1||A[i][j]==3)continue; // nvm if its already processed or outside the borders
    
        A[i][j]=3

        //All the directions of an element
        let dir=[[i+1,j], [i,j+1],[i,j-1],[i-1,j]]


        // process every direction of that element pushing its children into the length
        for (const d of dir) {
            if(d[0]<0||d[1]<0||d[0]>A.length-1||d[1]>A[0].length-1)continue;

            if(A[d[0]][d[1]]=='O'){
                queue.push([d[0],d[1]])
            }
        }


    }



    // replace all plagued with 'O' and the rest with 'X'
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
                
            if(A[i][j]=='O')A[i][j]='X'
            else if (A[i][j]==3)A[i][j]='O'
            else  continue
        }
        
    }
    return A
};

console.log(solve(
    
    [["O","O"],["O","O"]]
    
    ));

