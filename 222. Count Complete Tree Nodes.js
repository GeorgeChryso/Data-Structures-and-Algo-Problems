// Given a complete binary tree, count the number of nodes.

// Note:

// Definition of a complete binary tree from Wikipedia:
// In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

//dfs O(n)
var countNodes = function(root) {
    
    let dfs=root=>{
        if(root==null)return 0
        return 1+dfs(root.left)+dfs(root.right)
    }
    return dfs(root)
};

//cool dfs O(n)
var countNodes=root=>root===null?0:1+countNodes(root.left)+countNodes(root.right)


//O(lognlogn) //Binary search + dfs 
var countNodes = function(root) {
    let dfs=node=>node==null?0:1+dfs(node.left)
    let h=dfs(root)
    if(h==0||h==1)return h
    if(h==2)return 1+Number(root.left!==null)+Number(root.right!==null)
    let reach=index=>{
        console.log(index)
        let moves=[]
        for (let i = h-1; i>0; i--) {
            if(index%2){
                moves.unshift('L')
            }
            else{
                moves.unshift('R')
            }
            index=Math.ceil(index/2)
        }
        let start=root
        for (const move of moves) {
            if(move=='L')start=start.left
            else start=start.right
        }
        console.log(start!==null)
        return start!==null
    }
    
    let BinarySearch=()=>{
        let lo=1
        let hi=2**(h-1)
    
        while(lo<=hi){
            let mid=Math.floor(lo+(hi-lo)/2)
            let mex=reach(mid)
            let mm=reach(mid-1)
            if(mm&&!mex){
                console.log(mid-1)
                return mid-1
            }

            if(mex)lo=mid+1
            else hi=mid-1
        }
        return lo-1
    }

    let lastRow= BinarySearch()
    let result=0
    for (let i = 0; i <= h-2; i++) {
        result+=2**i        
    }
    return result+lastRow
};  