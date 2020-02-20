// Given a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only 1 right child.



var increasingBST = function(root) {
    
    let dfs=(node)=>{
        if(this.left)return dfs(this.left)
        if(this.right)return dfs(this.right)
        return this.val
    }
    function TreeNode(val) {
           this.val = val;
        this.left = this.right = null;
    }
    
    let root=new Treenode()
};