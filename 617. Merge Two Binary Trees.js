// Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.

// You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let answ = new TreeNode();

    var series = [];

    var dp = (n1, n2) => {
        if (n1 === null) {
        }
        if (n2 === null) {
        }

        let res = new TreeNode();
        if (n1.val !== null && n2.val !== null) {
            res.val = n1.val + n2.val;
        } else if (n1.val !== null) {
            res.val = n1.val;
        } else if (n2.val !== null) {
            res.val = n2.val;
        } else {
            res == null;
        }

        series.push(res);
    };

    while (dp(t1, t2)) {}
};
