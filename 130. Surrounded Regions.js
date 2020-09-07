// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.


//  dfs
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



    // queue now has the border's plagued elements
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




class UnionFind {

    constructor(size){
        //the total count of different elements(not groups) in this union find
        this.count=size
        //tracks the sizes of each of the components(groups/sets)
        //groupsize[a] returns how many elements the component with root a has 
        this.groupSize=[...Array(size)] 
        //number of components(groups) in the union find
        this.numComponents=size
        //points to the parent of i, if parent[i]=i, i is a root node
        this.parent=[...Array(size)]  //which is also the index of the group

        //put every element into its own group
        // rooted at itself
        for (let i = 0; i < size; i++) {
            this.groupSize[i]=i     
            this.parent[i]=i            
        }
    }

    //returns to which component (group) my element belongs to 
    // α(n) --Amortized constant time 
    // Update: Also compresses the paths so that each child points to its 
    // parent
    find(element){
        let root=element
        //find the parent of the group the elemnt belongs to
        // When root===parent[root] is always the parent of that group (root)
        while(root!=this.parent[root])
            root=this.parent[root]

        // Compression, point the element to its parent if its not already pointed
        // Tldr: Not only do I point my element to its actual root, i point any
        // inbetween elements to that root aswell
        while(element!=root){
            let next=this.parent[element]
            this.parent[element]=root
            element=next
        }
        
        return root
    }   

    //Unifies the sets containing A and B
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A) //parent of A
            ,root2=this.find(B) //parent of B

        // I want to put the set with fewer elements 
        // to the one with more elemenets
        if(this.groupSize[root1]<this.groupSize[root2]){
            this.groupSize[root2]+=this.groupSize[root1]
            this.parent[root1]=this.parent[root2]
        }
        else {
            this.groupSize[root1]+=this.groupSize[root2]
            this.parent[root2]=this.parent[root1]
        }

        this.numComponents-- //cos 1 less group, since i merged 2
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}
var solve = function(board) {
    if(board==0||board[0]==0)
        return board
    let n=board.length,m=board[0].length,UF=new UnionFind((n*m)+ 2),dir=[[-1,0],[+1,0],[0,-1],[0,+1]]

    let dfs=(i,j)=>{
        if(UF.parent[m*i+j]===n*m+1)
            return

        UF.union(m*i+j,(n*m)+1)
        for (const [dx,dy] of dir) {
            if(i+dx<0||j+dy<0||j+dy>=m||i+dx>=n||board[i+dx][j+dy]==='X')
                continue
            dfs(i+dx,j+dy)
        }
    }
    for (let i = 0; i < n; i++) 
        for (let j = 0; j <m; j++) 
            if(board[i][j]==='X')
                UF.union(m*i+j,n*m)
            else if(i==0||j==0||(i==n-1)||(j==m-1))
                dfs(i,j)
            
             
   for (let i = 0; i < n; i++) 
        for (let j = 0; j <m; j++)
            if((UF.find(m*i+j)!==n*m+1)&&(UF.find(m*i+j)!==n*m))
                board[i][j]='X'
    return board
};


//simpler dfs, without UNIONFIND
var solve = function(board) {
    if(board==0||board[0]==0)
        return board
    let n=board.length,m=board[0].length,dir=[[-1,0],[+1,0],[0,-1],[0,+1]],
        team=[...Array(n*m+2)].map((d,i)=>i),
        //team n*m=>edge O'S, team n*m+1=X's
        dfs=(i,j)=>{
            if(team[m*i+j]!=n*m&&board[i][j]=='O'){
                team[m*i+j]=n*m
                for (const [dx,dy] of dir) 
                    if(i+dx>=0&&j+dy>=0&&j+dy<m&&i+dx<n)
                        dfs(i+dx,j+dy)
            }
        }
    for (let i = 0; i < n; i++) 
        for (let j = 0; j <m; j++) 
            if(board[i][j]==='X')
                team[m*i+j]=n*m+1
            else if(i==0||j==0||(i==n-1)||(j==m-1))
                dfs(i,j)
             
   for (let i = 0; i < n; i++) 
        for (let j = 0; j <m; j++)
            if(team[m*i+j]!==n*m+1&&team[m*i+j]!==n*m)
                board[i][j]='X'
    return board
};

console.log(solve(
    []
    // [["X","O","X","O","X","O"],
    //  ["O","X","O","X","O","X"],
    //  ["X","O","X","O","X","O"],
    //  ["O","X","O","X","O","X"]]
    
    ));

