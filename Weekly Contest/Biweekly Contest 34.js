


var diagonalSum = function(mat) {
    let n=mat.length
    if(n==1)return mat[0][0]
    let sum=0
    for (let i = 0; i < n; i++) {
        sum+=mat[i][i]        
        sum+=mat[n-1-i][i]
    }
    if(n%2){
        sum-=mat[n>>1][n>>1]
    }
    return sum
};


var numWays = function(s) {
    let n=s.length   
    ,count=[...Array(n)].map(d=>0),result=0
    ,totalsum=0
    s=s.split('')
    totalsum=s.reduce((acc,curr)=>acc+Number(curr),0)
    if(totalsum%3!==0)return 0
    let tar=totalsum/3
    let suffix=0
    let suff=[]
    for (let i = n-1; i >=0; i--) {
        suffix+=Number(s[i])
        suff.unshift(suffix)
        if(suffix==tar)
            count[i]=1
    }
    for (let i = n-2; i >=0; i--) {
        count[i]+=count[i+1]
    }
    let prefix=0,pref=[]
    for (let i = 0; i < n-2; i++) {
        prefix+=Number(s[i])
        pref.push(prefix)
        if(prefix==tar){
            result+=count[i+2]
        }
    }

    return result%(1e9+7)
};


var findLengthOfShortestSubarray = function(arr) {
    if(arr.length==1||arr.every((d,i)=>i==0||arr[i]>=arr[i-1]))return 0
    if(arr.every((d,i)=>i==0||arr[i]<arr[i-1]))return arr.length-1
    let A=[arr[0]],B=[arr[arr.length-1]]

    for (let i = 1; i < array.length; i++) {
        if(arr[i]>=A[A.length-1])
            A.push(arr[i])
        else
        break        
    }
    for (let i = arr.length-2; i>=0; i--) {
        if(arr[i]>=B[0])
            B.unshift(arr[i])
        else
        break        
    }
    let result=arr.length-A.length-B.length
    A=[...A,...B]
    console.log(A)
};

var countRoutes = function(loc, start, finish, fuel) {
    let mod=1e9+7,result=0,n=loc.length
    let dp=[...Array(n)].map(d=>[...Array(fuel+1)].map(d=>0))
    //dp[i][k] number of ways to get to city i with available fuel k 

    //basecases

    for (let cost = 0; cost <=fuel; cost++) {
        // for every possible destination
        for (let i = 0; i < n; i++) {
            if(start===i){
                dp[i][cost]=1
                continue
            }
            let acc=0
            //for every inbetween location
            for (let j = 0; j <n; j++) {
                if(i==j)
                    continue;
                else{
                    acc+=dp[j][cost-Math.abs(loc[j]-loc[i])]
                }
            }    
            dp[i][cost]=acc        
        }        
    }
    return dp[finish][fuel]%mod
};
console.log(numWays(
    "100100010100110"
))