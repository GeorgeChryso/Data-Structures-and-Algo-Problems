// Given a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only 1 right child.


//dfs 
var increasingBST = function(root) {
    
  
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }

    let rootz=new TreeNode(0)

    let result=rootz
    let dfs=(node)=>{

        if(node.left) dfs(node.left)
        if(node.right) dfs(node.right)
        rootz.right=new TreeNode(node.val)
        rootz=rootz.right
    }

    dfs(root)
    return result.right
};