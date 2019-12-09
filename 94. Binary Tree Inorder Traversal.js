// Given a binary tree, return the inorder traversal of its nodes' values.


//recursive solution (dfs)
// Runtime O(n):visit each node only once
// Length O(n): result array
var inorderTraversal = function(root) {
    if(!root)return []
    var result=[]
    var stack=[]


    //this doesnt actually return anything, its just that the way of the inorder traversal fits perfectly with how dfs traverses the tree;
    var dfs=(node)=>{
        if(!node){
            if(stack.length)result.push(stack.pop())
            return
        }
        stack.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }
    
    dfs(root)
    return result
};