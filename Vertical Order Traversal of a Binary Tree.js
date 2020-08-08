// Given a binary tree, return the vertical order traversal of its nodes values.

// For each node at position (X, Y), its left and right children respectively will be at positions (X-1, Y-1) and (X+1, Y-1).

// Running a vertical line from X = -infinity to X = +infinity, whenever the vertical line touches some nodes, we report the values of the nodes in order from top to bottom (decreasing Y coordinates).

// If two nodes have the same position, then the value of the node that is reported first is the value that is smaller.

// Return an list of non-empty reports in order of X coordinate.  Every report will have a list of values of nodes.


// Note:

// The tree will have between 1 and 1000 nodes.
// Each node's value will be between 0 and 1000.
 




var verticalTraversal = function(root) {
    let result={}

    let rec=(node,x,y)=>{
        if(!node)return 
        
        if(result[x]){
            if(result[x][y])result[x][y].push(node.val)
            else result[x][y]=[node.val]
        }
        else{
            result[x]={}
            result[x][y]=[node.val]
        }

        rec(node.left,x-1,y-1)
        rec(node.right,x+1,y-1)
    }

    rec(root,0,0)

    Object.keys(result).forEach(x=>Object.keys(result[x]).forEach(y=>result[x][y].sort((a,b)=>a-b)))
    console.log(result)
    let res=Object.keys(result).sort((a,b)=>a-b)
    console.log(res)
    res=res.map(x=>[x,[...Object.keys(result[x])]])
    console.log(res)

    res.forEach(([x,y],i)=>res[i]=[x,y.sort((a,b)=>b-a)])
    console.log(res)
    res.forEach(([x,ys],i)=>res[i]=ys.map(y=>result[Number(x)][Number(y)]))
    console.log(result[0][-2])

    return res
};