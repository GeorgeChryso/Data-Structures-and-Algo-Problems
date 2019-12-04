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


// O(n), O(n), dfs
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


//shorter dfs
var invertTree = function(root) {
    if (root === null) return null;
    
    let left = invertTree(root.left);
    let right = invertTree(root.right);
    
    root.left = right;
    root.right = left;
    return root;
};

//bfs
var invertTree = function(root) {
    if (root === null) return root;
    if (root.left === null && root.right === null) return root;
    
    let queueArray = [];
    queueArray.push(root);
    
    while (queueArray.length !== 0) {
        let temp = queueArray.shift();
        if (temp === null) continue;
        let tempRight = temp.right;
        temp.right = temp.left;
        temp.left = tempRight;
        if (temp.left !== null || temp.right !== null) {
            queueArray.push(temp.left);
            queueArray.push(temp.right);
        }
    }
    return root;
};