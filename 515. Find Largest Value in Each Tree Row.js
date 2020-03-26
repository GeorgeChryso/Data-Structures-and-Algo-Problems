// You need to find the largest value in each row of a binary tree.

//BFS
var largestValues = function(root) {
    if(root===null)return []

    let result=[]
    let q=[root]

    while(q.length){
        let max=-Infinity
        let temp=[]
        for (const node of q) {
            if(node===null){
                continue
            }
            if(node.left){
                temp.push(node.left)
            }
            if(node.right){
                temp.push(node.right)
            }
            max=Math.max(node.val,max)
        }
        result.push(max)
        q=temp
    }
    return result
};