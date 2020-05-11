








// var buildArray = function(target, n) {
//     let result=[]
//     let j=0
//     for (let i = 1; i <=n; i++) {
//         if(j<target.length){
//             if(target[j]===i){
//                 result.push("Push")
//                 j++
//             }
//             else result.push("Push","Pop")

//         }   
//         else return result   
//     }
//     return result
// };



// var countTriplets = function(arr) {
//     let prefix=[0]
//     let xor=0
//     for (let i = 0; i < arr.length; i++) {
//         xor^=arr[i]
//         prefix.push(xor)
//     }
//     console.log(prefix)
//     let result=0
//     for (let i = 1; i < prefix.length-1; i++) {
//         for (let j = i+1; j < prefix.length; j++) {
//             for (let q = j; q < prefix.length; q++) {
//                 if((prefix[j-1]^prefix[i-1])===(prefix[q]^prefix[j-1])){ 
//                     console.log(i,j,q)
//                     result++  
//                 }

//             }
//         }        
//     }
//     return result
// };

// console.log(countTriplets([2,3,1,6,7]))
// let FloydWarshall=(source,target,edges,n)=>{

//     //create the adjacency matrix 
//     //but to be doing that we need to assign numbers to my nodes names
//     // so let's say if they re Uppercase Letters
//     // A=>0, B=>1 .... LETTER=>Letter.charCodeAt(0)-65
//     let numberify=letter=>letter.charCodeAt(0)-65
//     //create my 3d Matrix
//     let dp=[...Array(n)].map(q=>Array(n).fill(Infinity))
    
//     //previousPaths representation (OPTIONAL)
//     let next=[...Array(n)].map(d=>Array(n).fill([]))

//     //basecase
//     for (const [start,end,cost] of edges) {
//         dp[numberify(start)][numberify(end)]=cost
//     }

//     for (let k = 0; k <n; k++) {
//         for (let i = 0; i < n; i++) {
//             for (let j = 0; j <n; j++) {
               
//               //  dp[i][j]=Math.min(dp[i][j],dp[i][k]+dp[k][j])   
//                 if(dp[i][j]>dp[i][k]+dp[k][j]){
//                     dp[i][j]=dp[i][k]+dp[k][j]

//                     //optional todo for representation
//                     //   next[i][j].push(k)
//                 }
             
//             }            
//         }        
//     }


//     return dp[numberify(source)][numberify(target)]
// }



var minTime = function(n, edges, hasApple) {
    

    let dp=[...Array(n)].map(q=>Array(n).fill(Infinity))
    for (const [start,end] of edges) {
        dp[start][end]=1
        dp[end][start]=1
    }

    for (let k = 0; k <n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <n; j++) {
               
              //  dp[i][j]=Math.min(dp[i][j],dp[i][k]+dp[k][j])   
                if(dp[i][j]>dp[i][k]+dp[k][j]){
                    dp[i][j]=dp[i][k]+dp[k][j]

                    //optional todo for representation
                    //   next[i][j].push(k)
                }
             
            }            
        }        
    }

    hasApple=hasApple.map((d,i)=>d?i:d)
    hasApple=hasApple.filter(d=>d!==false)
    if(hasApple[0]!==0)hasApple.unshift(0)
    hasApple.push(0)
    let result=Infinity
    console.log(dp,hasApple)
    let createPerm=(arr,l,r)=>{
        if(l==r){
           let z=calculate(arr)
           if(!Number.isNaN(z)) result=Math.min(result,z)
        }
        else{
            for (let i = l; i <=r; i++) {
                let temp=0
                temp=arr[l]
                arr[l]=arr[i]
                arr[i]=temp
                createPerm(arr,l+1,r)
                temp=arr[l]
                arr[l]=arr[i]
                arr[i]=temp
            }
        }
    }
    calculate=arr=>{
        let sum=0
        for (let i = 1; i < arr.length; i++) {
            sum+=dp[arr[i-1]][arr[i]]            
        }
        return sum
    }

    createPerm(hasApple,1,hasApple.length-2)
    return result===Infinity?0:result
};


var minTime = function(n, edges, hasApple) {
    

    let dp=[...Array(n)].map(q=>Array(n).fill(Infinity))
    for (const [start,end] of edges) {
        dp[start][end]=1
        dp[end][start]=1
    }

    for (let k = 0; k <n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <n; j++) {
               
              //  dp[i][j]=Math.min(dp[i][j],dp[i][k]+dp[k][j])   
                if(dp[i][j]>dp[i][k]+dp[k][j]){
                    dp[i][j]=dp[i][k]+dp[k][j]

                    //optional todo for representation
                    //   next[i][j].push(k)
                }
             
            }            
        }        
    }

    hasApple=hasApple.map((d,i)=>d?i:d)
    hasApple=hasApple.filter(d=>d!==false)
    if(hasApple.length==0)return 0
    if(hasApple[0]!==0)hasApple.unshift(0)
    hasApple.push(0)
//     let createPerm=(arr,l,r)=>{
//         if(l==r){
//            let z=calculate(arr)
//            if(!Number.isNaN(z)) result=Math.min(result,z)
//         }
//         else{
//             for (let i = l; i <=r; i++) {
//                 let temp=0
//                 temp=arr[l]
//                 arr[l]=arr[i]
//                 arr[i]=temp
//                 createPerm(arr,l+1,r)
//                 temp=arr[l]
//                 arr[l]=arr[i]
//                 arr[i]=temp
//             }
//         }
//     }
    calculate=arr=>{
        console.log(arr)
        let sum=0
        for (let i = 1; i < arr.length; i++) {
            sum+=dp[arr[i-1]][arr[i]]            
        }
        return sum
    }
   let result=calculate(hasApple)

//     createPerm(hasApple,1,hasApple.length-2)
    return result===Infinity?0:result
};

console.log(minTime(
    5,
[[0,1],[0,2],[1,3],[0,4]],
[false,true,true,true,false]
))