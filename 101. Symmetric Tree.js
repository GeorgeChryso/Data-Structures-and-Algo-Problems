// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:


var isSymmetric = function(root) {
    
    var q=[root]
    while(q.length){
        let stack=[]
        let values=[]
        q.forEach(d=>{

            stack.push(q.left,q.right)
            values.push(q.val)
            }
        )
        for (let i = 0; i < values.length; i++) {
            if(values[i]!==values[values.length-1-i])return false
        }
        q=stack;
        console.log(q)
    }

    return true
};