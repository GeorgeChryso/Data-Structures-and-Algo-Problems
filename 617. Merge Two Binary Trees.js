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


    
    var queue1=[t1]
    var queue2=[t2]

    var result1=[]
    var result2=[]


    while (queue1.length){
        let current=queue1.shift()
        if( current===null) {
            result.push(null)
            continue
        }
        result.push(current.val)
        queue1.push(current.left)
        queue1.push(current.right)
    }
    while (queue2.length){
        let current=queue2.shift()
        if( current===null) {
            result.push(null)
            continue
        }
        result.push(current.val)
        queue1.push(current.left)
        queue1.push(current.right)
    }
    
    var result3=Array(Math.max(result1.length,result2.length))
    for (let i = 0; i < result3.length; i++) {
        if(result1[i]!==null && result2 !==null){
            result3[i]=result1[i]+result2[i]
        }
        else if( result1[i]!==null && result2[i]===null){
            result3[i]=result1[i]
        }
        else if( result1[i]==null && result2[i]!==null){
            result3[i]=result2[i]
        }
        else{
            result3[i]=null
        }
    }

    var final
    while(result3.length){

        let curr= new TreeNode(result3.shift())
        curr.left=new TreeNode(result3.shift())
        curr.right=new TreeNode(result3.shift())

    }
};
