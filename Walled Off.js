// You are given a two-dimensional integer matrix containing 0s and 1s where 0 represents empty space and 1 represents a wall.

// Return the minimum number cells that need to become walls such that there's no path from the top left cell to the bottom right cell. You cannot put walls on the top left cell and the bottom right cell. You are only allowed to travel adjacently (no diagonal moves allowed), and you can't leave the matrix.
// matrix = [
//     [0, 1, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 0]
// ]

// 2 ≤ n, m ≤ 250 where n and m are the number of rows and columns in matrix

class Solution {
    solve(A) {
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
            // if not already unified 
            // α(n) --Amortized constant time 
            union(A,B){
                let root1=this.find(A) //parent of A
                    ,root2=this.find(B) //parent of B
                if(root1===root2) //already unified
                    return false    
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
                return true
            }
        
            //same parent=>samegroup
            sameGroup=(A,B)=>this.find(A)==this.find(B)
        
            //essentially the groupSize of its parent's group
            sizeOfGroup=(A)=>this.groupSize[this.find(A)]
        
        }
        let n=A.length,m=A[0].length,DSU=new UnionFind(n*m+2),

        //we will encode each cell on the dsu
            encode=(x,y)=>x*m+y

        //the last node is (n-1)*m+m-1=n*m-1
        // but, i create an additional 2 nodes
        // n*m, and n*m +1, which correspond 
        // to the bottom left and top right segments of my map
        let BottomLeft=n*m,TopRight=n*m+1, 
            neighbors=[[1,0],[-1,0],[-1,-1],[1,1],[-1,1],[1,-1],[0,-1],[0,1]]

        // place all the ones on the same group to their adjacent elements
        for (let i = 0; i < n; i++) 
            for (let j = 0; j < m; j++) 
                if(A[i][j]==1){
                    //for the edge elements, connect them to their corresponding node
                    if(i==0||j==m-1) 
                        DSU.union(encode(i,j),TopRight)
                    if(j==0||i==n-1)
                        DSU.union(encode(i,j),BottomLeft)

                    //for everything connect them with their neighbors
                    for (const [dx,dy] of neighbors) 
                        if(i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m&&A[i+dx][j+dy]==1)
                            DSU.union(encode(i,j),encode(i+dx,j+dy))
                }
        
        // the result can be 0,1 or 2, because I  can always just use 2 walls to block 
        // the first/last  diagonal of length 2 
        if(DSU.sameGroup(BottomLeft,TopRight))
                return 0 //check if they are already connected
        
        //check for 1:
        //if adding some 0 to a group connects my BottomLeft and TopRight, im donezo
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if((i==0&&j==0)||(i==n-1&&j==m-1))
                    continue
   
                if(A[i][j]==0){
                    let roots=new Set()
                    // edge elements
                    if(i==0||j==m-1)
                        roots.add(TopRight)
                    if(j==0||i==n-1)
                        roots.add(BottomLeft)
                    for (const [dx,dy] of neighbors) 
                        if(i+dx>=0&&i+dx<n&&j+dy>=0&&j+dy<m&&A[i+dx][j+dy]==1)
                            if(DSU.sameGroup(TopRight,encode(i+dx,j+dy)))
                                roots.add(TopRight)
                            else if(DSU.sameGroup(BottomLeft,encode(i+dx,j+dy)))
                                roots.add(BottomLeft)
                        
                    if(roots.has(TopRight)&&roots.has(BottomLeft))
                        return 1
                }               
            }            
        }
        
        //otherwise
        return 2
        
    }
}