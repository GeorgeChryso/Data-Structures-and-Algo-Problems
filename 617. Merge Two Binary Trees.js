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
    let answ= new TreeNode
    
        
    var dp=(a)=>{
        if(a.left===a.right&& a.left===null)return false
        answ.left=
        answ.right=
        answ.val=
        dp(a.left)
        dp(a.right)
    }
    
    while(dp(t2)){

    }

};