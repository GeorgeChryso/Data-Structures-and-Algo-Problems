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


 //dfs
var mergeTrees = function(t1, t2) {
    if(!t1||!t2)return t1||t2

    var result=t1
    
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


//dfs more beautiful
var mergeTrees=(A,B)=>{
    if(A==null||B==null)return A||B
    A.val+=B.val
    A.left=mergeTrees(A.left,B.left)
    A.right=mergeTrees(A.right,B.right)
    return A    
}


//bfs
var mergeTrees = function(t1, t2) {
    if (!t1) return t2;
    if (!t2) return t1;
  
    const tree = t1;
    const stack = [[t1, t2]];

    while (stack.length) {
      [t1, t2] = stack.pop();

      // den xreiazetai na diaxeristw tis alles periptwseis giati tis kaluptw mesa sto if, px an den uparxei to t1.left h uparxei panta kataligoume me ta swsta children
      if (t1 && t2) {
        t1.val = t1.val + t2.val;
        t1.left ? stack.push([t1.left, t2.left]) : (t1.left = t2.left);
        t1.right ? stack.push([t1.right, t2.right]) : (t1.right = t2.right);
      }
    }
  
    return tree;
  };