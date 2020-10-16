// Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.


// dfs solution

// Any path, can be written as two arrows starting from a node. The first arrow L starts on its left child, and the second one R on its right.
// if i know the maximum length arrows for each child, then the best path has length L+R+1

//Time Complexity: O(N). We visit every node once.

//Space Complexity: O(N), the size of our implicit call stack during our depth-first search.
var diameterOfBinaryTree = function(root) {
    let result=1
    

    //dfs
    var MaxLenthOfArrow=(node)=>{
        if(!node)return 0


         //the length of the longest arrow starting from node.left and node.right
        let LeftLongest=MaxLenthOfArrow(node.left)
        let RightLongest=MaxLenthOfArrow(node.right)
        
        //update result since I found a potential length ( L+R+1 )
        result=Math.max(result,LeftLongest+RightLongest+1)

         //this line is THE MAXIMUM length of the ARROW starting from a node,cos remember i m going backwards with dfs, first the leaves will be reached which obviously have length 0, but if i am to find the maximum length of an arrow which starts from a child of a node, i have to keep adding 1 while going upwards and choosing the maximum length path 
        return Math.max(LeftLongest,RightLongest)+1
    }

    MaxLenthOfArrow(root)
    return result-1
};

// diameter of an N-ary Tree's logic is:

// pick any node x
// find through bfs/dfs the node farthest from x, y
// run bfs again to find the farthest node from y, z
// distance( y,z ) is the diameter of the N-Ary tree
// Takes O(n)
var diameterOfNaryTree = function(root) {
    let x=root //random node
    let y=null //the nodefarthest from x
    let q=[root]
    let visited=new Set([root]) //dont revisit nodes
    //1st bfs, determkine y
    while(q.length){
        let temp=[]
        for(let node of q){
            y=node
            for(let neighbor of node.neighbors)
                if(!visited.has(neighbor))
                    temp.push(neighbor)
        }
        q=temp
    }
    //2nd bfs to determine z, aka the diameter
    let diameter=1
    visited=new Set([y])
    q=[y]
    while(q.length){
        let temp=[]
        for(let node of q){
            for(let neighbor of node.neighbors)
                if(!visited.has(neighbor))
                    temp.push(neighbor)
        }
        q=temp
        diameter++
    }
    return diameter
};


