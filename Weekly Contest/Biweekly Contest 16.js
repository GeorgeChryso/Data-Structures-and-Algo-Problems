function TreeNode(A) {
    this.val=A
    this.left=null
    this.right=null
}


var ArrayToBinaryTree = A => {
    //string to array for BTrees

    if (!A.length) return null;



    var start = new TreeNode(A[0]);
    var queue = [start];
    var arrayLeftAt = 1;

    //create it with bst
    while (queue.length) {
        var temp=[]
        queue.forEach(d=>{
            if(d!==null){
                
                let leftone=A[arrayLeftAt]
                let rightone=A[arrayLeftAt+1]
                if(leftone!==undefined){
                    if(leftone===null){
                        d.left=null
                    }
                    else{
                        d.left=new TreeNode(leftone)
                        temp.push(d.left)
                    } 
                }

                if(rightone!==undefined){
                    if(rightone===null){
                        d.right=null
                    }
                    else {
                        d.right=new TreeNode(rightone)
                        temp.push(d.right)
                    }
                }
                arrayLeftAt+=2

           
            }
        })
        queue=temp

    }


    return start;
};


var BinaryTreeToArray = root => {
    console.log(`but... \n`,root, ` BECOMES`)
    if(!root)return '[]'
    var result = [];

    var queue = [root];

    while (queue.length) {
        let stack = [];
        queue.forEach(d => {
            if (d === null) {
                result.push(null);
            } else {
                result.push(d.val);
                if (d.left !== undefined) stack.push(d.left);
                if (d.right !== undefined) stack.push(d.right);
            }
        });
        queue = stack;
    }


    function ArrayToString(res) {
        for (let i = 0; i < res.length; i++) {
            if (res[i]!==null) res[i] = res[i].toString();
            else res[i] = 'null';
        }
        res[0] = '[' + res[0];
        res[res.length - 1] = res[res.length - 1] + ']';
        res = res.join(',');
        return res;
    }

    var end=ArrayToString(result)
    console.log(`this... \n`,end)
    return end;
};


var replaceElements = function(A) {
    if(A.length==1)return [-1]
    var result=[]

    for (let i = 0; i < A.length; i++) {
        console.log(A.slice(i+1))
        result.push(Math.max(...A.slice(i+1)))        
    }

    result[A.length-1]=-1
    return result
};

var findBestValue = function(A, target) {
    var result=0
    var difference=Infinity    
    var biggerthan=Array(A.length).fill(0)
    var eqSum=Array(A.length).fill(0)
    var smallerSum=Array(A.length).fill(0)
    for (let i = 0; i < A.length; i++) {
        A.forEach((curr)=>{
            if(curr>A[i]){
                biggerthan[i]++
            }
            if( curr==A[i])eqSum[i]++
            if( curr<A[i]){
                smallerSum[i]+=curr
            }
        })
        let potential=Math.round(Math.abs(target-smallerSum[i])/(biggerthan[i]+eqSum[i] ))

        let potentialCons=Math.round(Math.abs((target-smallerSum[i]-(eqSum[i]*A[i]))/(biggerthan[i]) ))

        let newDif1=Math.abs(target-( potential*(biggerthan[i]+eqSum[i]) +smallerSum[i] ))
        let newDif2=Math.abs(target-( potentialCons*biggerthan[i] +smallerSum[i]+(eqSum[i]*A[i]) ))

        if( difference>newDif1){
            result= potential
        }
        if( difference>newDif2){
            result=potentialCons
        }
       
    }
    return result
};


var deepestLeavesSum = function(root) {
    if(!root)return 0
    if(!root.left&&!root.right)return root.val
    let curSum=0    
    let queue=[root]
    while(queue.length){
        curSum=0
        curSum=queue.reduce((acc,curr)=>acc+curr.val,0)
        let temp=[]
        queue.forEach(d=>{
            if(d.left){
                temp.push(d.left)
            }
            if(d.right){
                temp.push(d.right)
            }
        })
        queue=temp
    }
    return curSum
};

var pathsWithMaxScore = function(A) {
    var sumsMemo={}
    var set=new Set([1,2,3,4,5,6,7,8,9])
    var dp=(i,j,curSum)=>{
        if(i<0 ||j<0) return
        if(i==0&&j==0){
            sumsMemo[Number(curSum)]=(sumsMemo[Number(curSum)]||0) +1
            console.log(sumsMemo)
            return
        }

        if(j>=1&&A[i][j-1]!=='X'){
            dp(i,j-1,curSum+ set.has(Number(A[i][j]))?Number(A[i][j]):0)
        }
        if(i>=1&&A[i-1][j]!=='X'){
            dp(i-1,j,curSum+  set.has(Number(A[i][j]))?Number(A[i][j]):0)
        }
        if(i>=1&&j>=1&&A[i-1][j-1]!=='X'){
            dp(i-1,j-1,curSum+  set.has(Number(A[i][j]))?Number(A[i][j]):0)
        }
    }
    console.log(sumsMemo)

    dp(A.length-1,A[0].length-1,0)
    let result=Math.max(...Object.keys(sumsMemo).map(d=>parseInt(d)))
    let ways=sumsMemo[result]
    let res=[]
    res.push(Number(result),Number(ways))
    //console.log(result,ways)

    return res
};


console.log(

    pathsWithMaxScore(
        ["E23","2X2","12S"]
    
))

// console.log(uvug
//     findBestValue(
//     //    [2,3,5],10
//         //[60864,25176,27249,21296,20204], 56803
//         [48772,52931,14253,32289,75263],40876
//             )
// )

let z='adb'
console.log(z[0])