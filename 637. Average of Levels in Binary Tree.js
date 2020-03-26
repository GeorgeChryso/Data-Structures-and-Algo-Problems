// Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.


//BFS
var averageOfLevels = function(root) {
    if(root===null)return []

    let result=[]
    let q=[root]

    while(q.length){
        let sum=0,count=0
        let temp=[]
        for (const node of q) {
            if(node===null){
                count++
                continue
            }
            if(node.left){
                temp.push(node.left)
            }
            if(node.right){
                temp.push(node.right)
            }
            sum+=node.val
            count++
        }
        result.push(sum/count||0)
        q=temp
    }
    return result
};