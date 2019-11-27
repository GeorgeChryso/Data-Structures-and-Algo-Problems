// Given a binary tree, find its maximum depth.

// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Note: A leaf is a node with no children.

// Example:

// Given binary tree [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its depth = 3.


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

 // BFS
var maxDepth = function(A) {
    if(A===null)return 0
    var queue=[A]
    var count=0
    while(queue.length){

        var level=new Number(queue.length)
        //while there are elements on my current level
        while(level>0){
            //process them
            let curr= queue.shift()
            //and create the new level i m about to process
            if( curr.left)queue.push(curr.left)
            if( curr.right)queue.push(curr.right)
            level--
        }
        
        count++
    }

    return count
};

//DFS
//Recursion
var maxDepth=A=>A==null?0:Math.max(maxDepth(A.left)+1,maxDepth(A.right)+1)

