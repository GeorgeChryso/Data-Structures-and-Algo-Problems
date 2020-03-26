// Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

//BFS
var rightSideView = function(root) {
    if(root===null)return []

    let result=[]
    let q=[root]

    while(q.length){
        let last=0
        let temp=[]
        for (const node of q) {
            if(node===null){
                last=null
                continue
            }
            if(node.left){
                temp.push(node.left)
            }
            if(node.right){
                temp.push(node.right)
            }
            last=node.val
        }
        result.push(last)
        q=temp
    }
    return result
};