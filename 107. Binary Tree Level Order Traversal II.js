// Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).



var levelOrderBottom = function(root) {
    if(root===null)return []

    let result=[]
    let q=[root]

    while(q.length){
        let tempres=[]
        let temp=[]
        for (const node of q) {
            if(node===null){
                tempres.push(null)
                continue
            }
            if(node.left){
                temp.push(node.left)
            }
            if(node.right){
                temp.push(node.right)
            }
            tempres.push(node.val)
        }
        result.unshift(tempres)
        q=temp
    }
    return result
};