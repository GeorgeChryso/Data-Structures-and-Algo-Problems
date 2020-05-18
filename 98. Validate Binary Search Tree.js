// Given a binary tree, determine if it is a valid binary search tree (BST).

// Assume a BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.




//DFS 
var isValidBST = function(root) {
    

    let dfs=(node,min,max)=>{
        if(node===null)return true
        
        if(node.val>=max||node.val<=min)return false
        return dfs(node.left,min,node.val)&&dfs(node.right,node.val,max)
    }

    return dfs(root,-Infinity,Infinity)
};

//shorter
var isValidBST = (node,min=-Infinity,max=Infinity) => 
    node===null?
        true:
        node.val>=max||node.val<=min?
            false:
            isValidBST(node.left,min,node.val)&&isValidBST(node.right,node.val,max)


