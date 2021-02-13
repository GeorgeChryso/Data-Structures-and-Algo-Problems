// var maxValue = function(A, K) {
//     A.sort((a,b)=>a[0]===b[0]?a[1]-b[1]:a[0]-b[0])
//     A=A.map(([s,e,val],i)=>[s,e,val,i])
//     let n=A.length,
// 		dp=[...Array(K+1)].map(d=>[...Array(n+1)].map(d=>0)),
//         Z=[...A].sort((a,b)=>a[1]-b[1])
//         console.log(Z)

//     for(let k=1;k<=K;k++ ){
//         let indexOfZ=0,optimalPrevious=0
//         for(let i=1;i<=n;i++){
//             let [start,end,val,idx]=A[i-1]
//             while(indexOfZ<n&& Z[indexOfZ][1]<start ){
//                 let originalIdx=Z[indexOfZ][3] //take the original index it used to have
//                 if(dp[k-1][originalIdx+1]>optimalPrevious)
//                     optimalPrevious=dp[k-1][originalIdx+1]
//                 indexOfZ++
//             }
//             dp[k][i]=Math.max(val+optimalPrevious,dp[k][i]) //main dp computation
//         }
//     }
//     dp.forEach(d=>console.log(d+''))

//     return Math.max(...dp[K])
// };
// console.log(maxValue(
//     [[1,3,4],[2,4,1],[1,1,4],[3,5,1],[2,5,5]],
// 3
// ))
// var maxValue = function(A, K) {
//     A=A.sort((a,b)=>a[0]-b[0]).map(([s,e,val],i)=>[s,e,val,i])
//     let n=A.length,Z=[...A].sort((a,b)=>a[1]-b[1]),dp=[...Array(n)].map(d=>0),prev=[...dp]
//     for(let k=0;k<K;k++,prev=[...dp])
//         for(let i=0,indexOfZ=0,optimalPrevious=0;i<n;i++){
//             while(Z[indexOfZ][1]<A[i][0] &&k>=1 )
//                 optimalPrevious=Math.max(optimalPrevious,prev[Z[indexOfZ++][3]])
//             dp[i]=Math.max(A[i][2]+optimalPrevious,i>=1&&k==K-1?dp[i-1]:-Infinity) //main dp computation
//         }
//     return dp[n-1]
// };

// console.log(maxValue(
//     [[1,3,4],[2,4,1],[1,1,4],[3,5,1],[2,5,5]],
// 3
// ))



getzScore = function(input) {
    // Your code goes here
    var A=input,n=A.length
    var allowed=new Set(["X","/","0","1","2","3","4","5","6","7","8","9"])
    for(var i=0;i<n;i++)
        if(!allowed.has(A[i]))
            console.log(A[i])
    if(A.some(d=>!allowed.has(d)))
        return 0 //invalid input
        
    //separated the groups
    var groups=[]
    while(A.length){
        var curr=A.shift()
        if(curr=='X')
            groups.push(['X'])
        else{
            if(A.length){
                var nxt=A.shift()
                groups.push([curr,nxt])
            }
            else
                groups.push([curr])
        }
    }

    //the edge case of the last group being something like [9,'\',"X"]
    //calculate the score
    
    var result=0,m=groups.length,gain=0
    var scores=new Array(m)
    for(var i=m-1;i>=0;i--){
        gain=0
        if(groups[i].length===1){ //we do have an x
            if(groups[i][0]==='X'){
                gain+=10
                if(i<m-1){//there is a next element
                    if(groups[i+1].length===1){//next element is x or single
                        if(groups[i+1][0]==='X'){ //x
                            gain+=10
                            if(i<m-2){ //there is a next to next
                                if(groups[i+2].length===1){
                                    if(groups[i+2][0]==='X')
                                        gain+=10
                                    else
                                        gain+=Number(groups[i+2][0])
                                }
                                else
                                    gain+=Number(groups[i+2][0])
                            }
                        }
                        else//xsingle
                            gain+=Number(groups[i+1][0])
                    }
                    else{
                        if(groups[i+1][1]==='/')
                            gain+=10
                        else
                            gain+=Number(groups[i+1][0])+Number(groups[i+1][1])
                    }
                }
            }
            else
                gain+=Number(groups[i][0])
        }
        else if(groups[i].length==2){
            if(groups[i][1]==='/'){
                gain+=10
                if(i<m-1){
                    if(groups[i+1].length==1){ //followed by an X
                        if(groups[i+1][0]==='X')
                            gain+=10
                        else 
                            gain+=Number(groups[i+1][0])
                    }
                    else 
                        gain+=Number(groups[i+1][0])
                }
            }
            else
                gain+=Number(groups[i][0])+Number(groups[i][1])
        }
        gain=Math.min(gain,30)
        result+=gain
        scores[i]=gain
     
        /* 
            X  X  X  X  X  X  X 
      [X]    [X] [NUMBER /]
        [X] [NUMBER]
            NUMBER / NUMBER =>
            NUMBER / X (no sense)
            X --NUMBER /
            NUMBER NUMBER 
            
        */
    }
    console.log(groups)
    console.log(scores)
    return result
};

var getScore = function(input) {
    // Your code goes here
    var A=input,n=A.length
    var allowed=new Set(["X","/","0","1","2","3","4","5","6","7","8","9"])

    if(A.some(d=>!allowed.has(d)))
        return 0 //invalid input
        
    //separated the groups
    var groups=[]
    
    while(A.length){
        var curr=A.shift()
        if(curr=='X'){
            groups.push(['X'])
        }
        else{
            if(A.length){
                var nxt=A.shift()
                groups.push([curr,nxt])
            }
            else
                groups.push([curr])
        }
    }

    //the edge case of the last group being something like [9,'\',"X"]
    //calculate the score
    console.log(groups)
    
    var result=0,m=groups.length
    var scores=new Array(m)
for(var i=m-1;i>=0;i--){
    gain=0
    if(groups[i].length==1){
        if(groups[i][0]==='X'){
            gain+=10
            if(i<m-1){
                if(groups[i+1].length===1){
                    if(groups[i+1][0]==="X"){
                        gain+=10
                        if(i<m-2){
                            if(groups[i+2].length==1){
                                if(groups[i+2][0]==="X")
                                    gain+=10
                                else
                                    gain+=Number(groups[i+2][0])
                            }
                            else 
                                gain+=Number(groups[i+2][0])
                        }
                    }
                    else
                        gain+=Number(groups[i+1][0])
                }
                else{
                    if(groups[i+1][1]==="/")
                        gain+=10
                    else
                        gain+=Number(groups[i+1][0])+Number(groups[i+1][1])
                }
            }
        }
        else
            gain+=Number(groups[i][0])
        
    }
    else{
        if(groups[i][1]==='/'){
            gain+=10
            if(i<m-1){
                if(groups[i+1].length===1){
                    if(groups[i+1][0]==="X")
                        gain+=10
                    else
                        gain+=Number(groups[i+1][0])
                }
                else
                    gain+=Number(groups[i+1][0])
            }
        }
        else
            gain+=Number(groups[i][0])+Number(groups[i][1])
    }
        
    gain=Math.min(gain,30)
    result+=gain
    scores[i]=gain
}
    console.log(scores)
    return result
};

console.log(
    getzScore(
        [ "X", "X", "2", "/", "9"]
        )
    )

console.log(
getScore(
    [ "X", "X", "2", "/", "9"]
    )
)