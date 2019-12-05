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
    if(!t1||!t2)return t1||t2

    var result=t1
    t1.val=t1.val+t2.val
    
    var merge=(A=null,B=null)=>{
        if(!A||!B){
          A=A||B  
          return
        }
        else{
          A.val+=B.val
        }

        
        if(A.left){
            if(B.left)merge(A.left,B.left)
            else merge(A.left)
        }
        else{
            if(B.left)A.left=B.left
        }

        if(A.right){
            if(B.right)merge(A.right,B.right)
            else merge(A.right)
        }
        else{
            if(B.right)A.right=B.right
        }
    }

    merge(t1,t2)
    return result
};

