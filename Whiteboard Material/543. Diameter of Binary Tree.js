// Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.


// dfs solution

// Any path, can be written as two arrows starting from a node. The first arrow L starts on its left child, and the second one R on its right.
// if i know the maximum length arrows for each child, then the best path has length L+R+1

//Time Complexity: O(N). We visit every node once.

//Space Complexity: O(N), the size of our implicit call stack during our depth-first search.
var diameterOfBinaryTree = function(root) {
    let result=1
    


    var dfs=(node)=>{

        if(!node)return 0

        //the length of the longest arrow starting from node.left and node.right
        var L=dfs(node.left)
        var R=dfs(node.right)

        //update result since I found a potential length ( L+R+1 )
        result=Math.max(result,L+R+1)

        //this line is THE MAXIMUM length of the ARROW starting from a node,cos remember i m going backwards with dfs, first the leaves will be reached which obviously have length 0, but if i am to find the maximum length of an arrow which starts from a child of a node, i have to keep adding 1 while going upwards and choosing the maximum length path 
        return Math.max(L,R)+1
    }

    

    dfs(root)
    return result-1
};


