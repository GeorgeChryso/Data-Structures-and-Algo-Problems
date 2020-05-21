/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function(root) {
    let result=0
    let dfs=node=>{
        if(node===null)return 0
        let left=dfs(node.left), right=dfs(node.right)
        let curr= Math.abs( left - right)
        result+=curr
        return node.val+(left) +right
    }
    dfs(root)
    return result
};