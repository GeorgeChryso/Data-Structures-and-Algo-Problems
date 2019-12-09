// Given a binary tree, return the inorder traversal of its nodes' values.


// recursive solution (dfs)
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

//Threaded Binary Tree
// Morris Traversal

// A binary tree is made threaded by making all right child pointers that would normally be NULL point to the inorder successor of the node (if it exists).

//Single Threaded: Where a NULL right pointers is made to point to the inorder successor (if successor exists)
//Double Threaded: Where both left and right NULL pointers are made to point to inorder predecessor and inorder successor respectively. The predecessor threads are useful for reverse inorder traversal and postorder traversal.

var inorderTraversal = function(root) {

    
};
