// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.



// Breadth first search to return the minimum level on which I meet a node
// with both right && left === null
var minDepth = function(A) {
    if(!A)return 0
    if(A.val===null||A.val===undefined)return 0
    if( A.right===A.left && A.right===null)return 1
    
    var level=1
    var queue=[A]

    while(queue.length){

        var curNodes=[] // I create an additional array so i can segregate the children and parents of different levels

        for (const {val,right,left} of queue) {

            // Das what I want
            if(right ===null&&left===null)return level


            // Maybe hes not giving me a left or right who knows
            if(!right && left){
                curNodes.push(left)
                continue
            }
            if(!left && right){
                curNodes.push(right)
                continue
            }

            // base case where both right and left exist
            curNodes.push(right)
            curNodes.push(left)
        }

        level++
        queue=curNodes
    }

    return level

};
console.log(minDepth(
    [3,9,20,null,null,15,7]))

    // TYPE OF INPUT IS THIS
    // but turns it into an array
    // so fuck it
    // TreeNode {
    //     val: 3,
    //     right:
    //      TreeNode {
    //        val: 20,
    //        right: TreeNode { val: 7, right: null, left: null },
    //        left: TreeNode { val: 15, right: null, left: null } },
    //     left: TreeNode { val: 9, right: null, left: null } }