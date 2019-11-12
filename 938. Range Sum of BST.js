// Given the root node of a binary search tree, return the sum of values of all nodes with value between L and R (inclusive).

// The binary search tree is guaranteed to have unique values.



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function(root, L, R) {
    
    result=0

    var dp=(node)=>{
        if(node.left===node.right && node.right===null)return
        if(node!==null && node.val<=R && node.val>=L )result+=node.val

        if(node.val>L)dp(node.left)
        if(node.val<R)dp(node.right)
    }


    dp(root)
    return result
    
};