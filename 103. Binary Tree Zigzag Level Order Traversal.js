

var zigzagLevelOrder = function(root) {
    if(root===null)return []

    let result=[]
    let q=[root]
    let flag=true
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
        if(flag)result.push(tempres)
        else result.push(tempres.reverse())
        q=temp
        flag=!flag
    }
    return result
};