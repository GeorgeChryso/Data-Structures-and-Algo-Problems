// Invert a binary tree.

// Example:

// Input:

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// Output:

//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(A) {
    if(!A)return null
    var start=A


    var dp=current=>{
        if(!current.left&&!current.right)return

        if(current.left&&current.right){
            [current.left,current.right]=[current.right,current.left]   
            dp(current.left)
            dp(current.right)
            return
        }

        if(current.left && !current.right){
            [current.left,current.right]=[null,current.left]
            dp(current.right)
            return
        }
        
        if(!current.left && current.right){
            [current.left,current.right]=[current.right,null]
            dp(current.left)
            return
        }

   
    }

    dp(A)

    return start

    
};