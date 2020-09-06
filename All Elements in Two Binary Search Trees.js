// Given two binary search trees root1 and root2.

// Return a list containing all the integers from both trees sorted in ascending order.


// O(n)
var getAllElements = function(root1, root2) {
    let res=[],res1=[],res2=[]
    //save the sorted lists in 2 arrays
    let rec=(node,i)=>{
        if(!node)return
        rec(node.left,i)
        i==1?res1.push(node.val):res2.push(node.val)
        rec(node.right,i)
    }
    rec(root1,1)
    rec(root2,0)
    //merge the sorted arrays into one
    let i=0,j=0
    while(i<res1.length||j<res2.length){
        if(i==res1.length){
            while(j<res2.length)
                res.push(res2[j++])
            break
        }
        if(j==res2.length){
            while(i<res1.length)
                res.push(res1[i++])
            break
        }
        if(res1[i]<=res2[j])
            res.push(res1[i++])
        else
            res.push(res2[j++])
    }
    return res 
};