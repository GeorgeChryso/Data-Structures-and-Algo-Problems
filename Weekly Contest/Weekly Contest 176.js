

var countNegatives = function(A) {
    let result=0
    for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[0].length; j++) {
        if(A[i][j]<0)result++        
    }        
    }
    return result
};






var maxEvents = function(A) {
   A= A.sort((a,b)=>{
        let [s,e]=a
        let [d,k]=b

        if(s<d){
            if(e<d)return -1
            else return 1
        }
        else {
            if(k<s)return -1
            else return 1
        }

    })
    let max=A.reduce((acc,[a,b])=>Math.max(acc,a,b),0)
    let dp=Array(A.length+1).fill(null).map(d=>Array(max+1).fill(0))

    //basecase 
    dp[0][0]=0
    let result=0
    for (let i = 1; i <= A.length; i++) {
        var [start,end]=A[i-1]
        let tempMax=dp[i-1][0]
        for (let j = 0; j < dp[0].length; j++) {

            tempMax=Math.max(tempMax,dp[i-1][j])

            if(start<=j&& j<=end)dp[i][j]=Math.max(dp[i-1][j],tempMax+1)
            else dp[i][j]=Math.max(dp[i-1][j],dp[i][j])

            result=Math.max(result,dp[i][j])

        }        
    }
    console.log(dp)
    return result
};

var maxEvents = function(B) {
    let A=B.sort((a,b)=>{
        let [s,e]=a
        let [d,k]=b

        if(s<=d){
            if(e<=d)return -1
            else return 1
        }
        else {
            if(k<s)return -1
            else return 1
        }

    })
    console.log(A)
    let max=A.reduce((acc,[a,b])=>Math.max(acc,a,b),0)
    let dp=Array(A.length+1).fill(null).map(d=>Array(max+1).fill(0))

    //basecase 
    dp[0][0]=0
    let result=0
    for (let i = 1; i <= A.length; i++) {
        var [start,end]=A[i-1]
        let tempMax=dp[i-1][0]
        for (let j = 0; j < dp[0].length; j++) {

            tempMax=Math.max(tempMax,dp[i-1][j])

            if(start<=j&& j<=end)dp[i][j]=Math.max(dp[i-1][j],tempMax+1)
            else dp[i][j]=Math.max(dp[i-1][j],dp[i][j])

            result=Math.max(result,dp[i][j])

        }        
    }
        console.log(dp)

    return result
};



console.log(
    maxEvents(
       // [[1,2],[2,3],[3,4]]
     //[[1,2],[2,3],[3,4]]//3
        [[1,2],[2,3],[3,4],[1,2]]
      //  [[1,2],[2,3],[3,4],[1,2]] //4
      // [[1,100000]] //1
       //[[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]]
     //  [[1,4],[4,4],[2,2],[3,4],[1,1]]
        )
)