



// simple bfs
var levelOrder = function(root) {
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
        result.push(tempres)
        q=temp
    }
    return result
};