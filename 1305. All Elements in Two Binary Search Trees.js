
// Given two binary search trees root1 and root2.

// Return a list containing all the integers from both trees sorted in ascending order.



var getAllElements = function(root1, root2) {
    

    let dfs=(node)=>{
        if(node===null)return []
        return dfs(node.left).concat([node.val]).concat(dfs(node.right))
    }

    let t1=dfs(root1), t2=dfs(root2), result=[],i=0,j=0

    if(!t1.length||!t2.length)return t1.concat(t2)
    while(i<t1.length||j<t2.length){
        if(i==t1.length||j==t2.length)
            return result.concat(t2.slice(j)).concat(t1.slice(i))
        if(t1[i]>=t2[j])
            result.push(t2[j++])
        else
            result.push(t1[i++])

    }
    return result
};
