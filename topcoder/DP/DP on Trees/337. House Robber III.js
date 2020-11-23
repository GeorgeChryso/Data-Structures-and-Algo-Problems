// The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the "root." Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that "all houses in this place forms a binary tree". It will automatically contact the police if two directly-linked houses were broken into on the same night.

// Determine the maximum amount of money the thief can rob tonight without alerting the police.


// T L D R find the maximum achievable sum of the tree such that no two selected nodes are adjacent to each other



// O(n)
var rob = function(root) {
    let dfs=(node)=>{
        if(!node)
            return [0,0]
        //includeleft, not include left
        let [il,nil]=dfs(node.left)
        //includeright, not include right
        let [ir,nir]=dfs(node.right)

                //pick node,        dont pick node
        return [nil+nir+node.val,Math.max(il,ir,nil,nir)] 
    }
    let [a,b]=dfs(root)
    return Math.max(a,b)
};