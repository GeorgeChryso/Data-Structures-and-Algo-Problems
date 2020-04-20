// Return the root node of a binary search tree that matches the given preorder traversal.

// (Recall that a binary search tree is a binary tree where for every node, any descendant of node.left has a value < node.val, and any descendant of node.right has a value > node.val.  Also recall that a preorder traversal displays the value of the node first, then traverses node.left, then traverses node.right.)

  function TreeNode(val) {
     this.val = val;
     this.left = this.right = null;
 }
 
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */

var bstFromPreorder = function(preorder) {
    if (!preorder.length) return null;
    let start = new TreeNode(preorder[0]);
    let stack = [start];
    for (const val of preorder) {
        if (val == stack[stack.length - 1].val)continue;
        if (val < stack[stack.length - 1].val) {
            stack[stack.length - 1].left = new TreeNode(val);
            stack.push(stack[stack.length - 1].left);
        }else {
            for (var i = 0; i < stack.length; i++) {
                if (stack[i].val < val&&stack[i].right===null) {
                    stack[i].right = new TreeNode(val);
                    stack=stack.slice(0,i+1).concat(stack[i].right)
                    break;
                }
            }
        }
    }
    return start;
};

console.log(
    bstFromPreorder(
      //  [8,5,1,7,10,12]
        [19, 4, 8,11]
    )
);
