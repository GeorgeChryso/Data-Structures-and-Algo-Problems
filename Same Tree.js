








var isSameTree = function(p, q) {
    let q1=[p],q2=[q]
    while(q1.length){
        if(!q2.length)return false
        let a=q1.shift(),b=q2.shift()
        if(Number(Boolean(a))^Number(Boolean(b)))return false
        if(a){ 
            if(a.val!=b.val)return false
            q1.push(a.left,a.right)
            q2.push(b.left,b.right)
        }

    }
    return q2.length==0
};