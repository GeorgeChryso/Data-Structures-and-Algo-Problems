'use strict'

// // Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. 
// // An island is surrounded by water and is formed by connecting adjacent land 
// // horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


// Example 1:

// Input:
// 11110
// 11010
// 11000
// 00000

// Output: 1


var numIslands0 = function(grid) {
    var c=0;

    var cleanse=(i,j)=>{
     console.log ('cleanse',i,j)

     console.log (grid)
        if (grid[i][j]==1){
            grid[i][j]=0;
            if ( i+1< grid.length && grid[i+1][j]==1 ){

                cleanse(i+1,j)
            }
            if ( i-1>=0 && grid[i-1][j]==1){
                cleanse(i-1,j)

            }
            if (j+1<=grid[i].length && grid[i][j+1]==1){
                cleanse(i,j+1)
            }
            if (j-1>=0 && grid[i][j-1]==1){
                cleanse(i,j-1)
            }

         

        }

        
    }

    var check=(i,j)=>{
        if (grid[i][j]==1){
            c++;
            console.log('kalw cleanse',i,j,'c='+c)
            cleanse(i,j)
        }

    }


    for (let i = 0; i < grid.length; i++) {
     
      for (let j = 0; j < grid[i].length; j++) {
        console.log('checki', i,j)
        check(i,j)
        
      
      }
        
    }


return c;


};


//1st attempt
// Runtime: 76 ms, faster than 34.77% of JavaScript online submissions for Number of Islands.
// Memory Usage: 37.9 MB, less than 44.00% of JavaScript online submissions for Number of Islands.
// Info, useless i-th check


var numIslands = function(grid) {
    var c=0;

    var cleanse=(i,j)=>{
     console.log ('cleanse',i,j)

     console.log (grid)
        if (grid[i][j]!=''){
            grid[i][j]='';
            if ( i+1< grid.length && grid[i+1][j]==1 ){

                cleanse(i+1,j)
                console.log (grid)
            }
            if ( i-1>=0 && grid[i-1][j]==1){
                cleanse(i-1,j)
                console.log (grid)
            }
            if (j+1<=grid[i].length && grid[i][j+1]==1){
                cleanse(i,j+1)
                console.log (grid)
            }
            if (j-1>=0 && grid[i][j-1]==1){
                cleanse(i,j-1)
                console.log (grid)
            }

         

        }
        console.log (grid)
        
    }

    var check=(i,j)=>{
        if (grid[i][j]==1){
            c++;
            console.log('kalw cleanse',i,j,'c='+c)
            cleanse(i,j)
        }
        grid[i][j]='';   
    }


    for (let i = 0; i < grid.length; i++) {
     
      for (let j = 0; j < grid[i].length; j++) {
        console.log('checki', i,j,grid[i].length)
        check(i,j)
        
      
      }
        
    }

console.log(grid)
return c;


};


// Success
// Details 
// Runtime: 72 ms, faster than 44.66% of JavaScript online submissions for Number of Islands.
// Memory Usage: 37.6 MB, less than 58.25% of JavaScript online submissions for Number of Islands.
// Next challenges:

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
        if(root1===root2)
            return
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
// so Essentially on my union finds on matrices, i map (i,j)=>m*i+j where m is the columns' length
var numIslands = function(grid) {
    if(grid==0||grid[0]==0)return 0
    let n=grid.length,m=grid[0].length,UF=new UnionFind(n*m+1)
    //group n*m =>is the seaaaaaa
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < m; j++) 
            if(grid[i][j]==='0')
                UF.union(i*m+j,m*n)
            else if(j<m-1&&grid[i][j]==grid[i][j+1])
                UF.union(i*m+j,i*m+j+1)
            else if(i<n-1&&grid[i][j]==grid[i+1][j])
                UF.union(i*m+j,(i+1)*m+j)
    return UF.numComponents-1 //the different groups minus the sea group
};


console.log (numIslands(
    
    [["1","1","1","1","1","1","1"]]
         ))