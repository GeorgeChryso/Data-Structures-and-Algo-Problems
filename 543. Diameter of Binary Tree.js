// Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

var diameterOfBinaryTree = function(root) {
    let result=1
    
    var dfs=(node)=>{

        if(!node)return 0
        var L=dfs(node.left)
        var R=dfs(node.right)
        result=Math.max(result,L+R+1)
        return Math.max(L,R)+1
    }

    dfs(root)
    return result-1
};


