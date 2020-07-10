var canMakeArithmeticProgression = function(arr) {
    arr.sort((a,b)=>a-b)
    
    let diff=arr[1]-arr[0]
    
    for (let i = 2; i < arr.length; i++) {
        if(diff!=arr[i]-arr[i-1])return false      
    }
    return true
};



var getLastMoment = function(n, leftt, right) {
    let arr=[...Array(n+1)].map(d=>new Set())
    let left=leftt.length+right.length
    for (const k of leftt) {
        arr[k].add(0)
    }
    for (const k of right) {
        arr[k].add(1)
    }
    
    let t=0

    while(left){
        let arr2=[...Array(n+1)].map(d=>new Set())
        for (let i = 0; i < arr.length; i++) {

            arr[i].forEach(
                d=>{
                    if(d==0&&i==0){
                        left--
                        
                    }
                    else if(d==1&&i==arr.length-1){
                        left--
                        
                    }
                    else if (d){
                        arr2[i+1].add(1)

                    }
                    else{
                        arr2[i-1].add(0)
                    }
                }
            )
            
        }
        arr=arr2
        t++
    }
    return t-1
};
console.log(getLastMoment(
    4,
[4,3],
[0,1]
))

var numSubmat = function(mat) {
    let result=0
    if(mat[0][0])result=1

    for (let i = 1; i < mat[0].length; i++) {
        if(mat[0][i])mat[0][i]+=mat[0][i-1]        
        result+=mat[0][i]
    }

    for (let i = 1; i < mat.length; i++) {
        if(mat[i][0])mat[i][0]+=mat[i-1][0]        
        result+=mat[i][0]
    }

    for (let i = 1; i < mat.length; i++) {
        for (let j = 1; j < mat[0].length; j++) {
            if(mat[i][j]){
                if(mat[i][j-1]&&mat[i-1][j]&&mat[i-1][j-1])mat[i][j]=Math.max(mat[i-1][j],mat[i][j-1])+1
                else if(mat[i][j-1])mat[i][j]=mat[i][j-1]
                else mat[i][j]=mat[i-1][j]
            }
            result+=mat[i][j]
        }        
    }
    
    console.log(mat)
    return result
};
console.log(numSubmat(
    [[0,1,1,0],
    [0,1,1,1],
    [1,1,1,0]]
))