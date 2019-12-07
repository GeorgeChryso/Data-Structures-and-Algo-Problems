// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:


var isSymmetric = function(root) {
    if(!root)return false

    var q=[root]
    while(q.length){
        
        let lastelementindex=q.length%2?(q.length-1)/2:(q.length/2-1)
        for (let i = 0; i <=lastelementindex; i++) {
            if((q[i]===null&&q[q.length-1-i]!==null )||
                (q[q.length-1-i]===null&& q[i]!==null)){
                return false
            }

            if(q[i]&&q[q.length-1-i]){
              if(q[i].val!==q[q.length-1-i].val)return false
            }            
        }
        let temp=[]
        q.forEach(d=>{
            if(d&&(d.left||d.right))temp.push(d.left,d.right)
         }
        )
        q=temp
    }

    return true
};