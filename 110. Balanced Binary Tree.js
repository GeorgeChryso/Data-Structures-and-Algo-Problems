// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as:

// a binary tree in which the left and right subtrees of every node differ in height by no more than 1.



var isBalanced = function(root) {
    let flag=true

    //essentially finds the height of the left and righ subtrees and compares them
    let dfs=(node)=>{
        if(node===null)return 1

        let left=dfs(node.left)
        let right=dfs(node.right)

        if(Math.abs(left-right)>=2)flag=false
        //the height of a node is the biggest branch to the left or right
        return Math.max(left,right)+1
    }
    dfs(root)
    return flag
};