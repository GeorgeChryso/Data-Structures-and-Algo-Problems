// Given an array arr of positive integers, consider all binary trees such that:

// Each node has either 0 or 2 children;
// The values of arr correspond to the values of each leaf in an in-order traversal of the tree.  (Recall that a node is a leaf if and only if it has 0 children.)
// The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree respectively.
// Among all possible binary trees considered, return the smallest possible sum of the values of each non-leaf node.  It is guaranteed this sum fits into a 32-bit integer.

 

// Example 1:

// Input: arr = [6,2,4]
// Output: 32
// Explanation:
// There are two possible trees.  The first has non-leaf node sum 36, and the second has non-leaf node sum 32.

//     24            24
//    /  \          /  \
//   12   4        6    8
//  /  \               / \
// 6    2             2   4
 

// Constraints:

// 2 <= arr.length <= 40
// 1 <= arr[i] <= 15
// It is guaranteed that the answer fits into a 32-bit signed integer (ie. it is less than 2^31).

               
var mctFromLeafValues = function(arr) {
    let sum_of_products = 0;
    let min_i = arr.indexOf(Math.min(...arr));

    while(arr.length > 1){
        if(min_i == 0){
            sum_of_products+=(arr[0] * arr[1]);
        }
        else if(min_i == arr.length-1){
            sum_of_products+=(arr[min_i] * arr[min_i-1]);
        }
        else{
            sum_of_products+=(arr[min_i] * Math.min(arr[min_i - 1], arr[min_i+1]));
        }
        
        arr.splice(min_i,1);
        min_i = arr.indexOf(Math.min(...arr));
    }
    return sum_of_products
};



var mctFromLeafValues=(A)=>{
    var result=[]
    var dp=(i,j)=>{
        if(i>=j)return 0
        if(j==i+1)return A[i]*A[i+1]

        return ( 
        Math.max(...A.slice(i,i+k),A[k])* 
        Math.max(...A.slice(i+k+1,j),A[j])

        +dp(i,i+k)
        
        +dp(i+k+1,j)

        )
    }

     for(k=1;k<A.length-2;k++){
       result.push( dp(0,A.length-1) )
     }

     return Math.min(...result)

}



//stack
var mctFromLeafValues=(A)=>{
    if(A === null || A.length === 0) {
        return 0
    }

    var res=0
    let stack = [Number.MAX_SAFE_INTEGER]

    for(let a of A){
        console.log(stack)
        while(stack[stack.length-1]<a){
            res+=stack.pop()*Math.min(stack[stack.length-1],a)
        }
        
        stack.push(a)
    }
    console.log(stack)

    while(stack.length>2){
        res+=stack.pop()*stack[stack.length-1]
    }

    return res
}



console.log(mctFromLeafValues(
   //  [10,11,12,13]
    [6,2,4]
))


