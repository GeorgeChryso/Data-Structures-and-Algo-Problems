
var canJump = function(nums) {
    if(nums.length==0||nums[0]==0)
        return false
    if(nums.length==1)
        return true
    for (let i = 1; i <nums.length; i++) {
        let temp=Math.max(nums[i],nums[i-1]-1) //how many max moves do I have left
        if(temp<=0)
            return i==nums.length-1
        nums[i]=temp
    }
    return true
};


//dp monoq optimization
var canJump = function(A) {
    let n=A.length,dp=[...Array(n)].map(d=>false),
        q=[ A[0] ]
    dp[0]=true
    for(let i=1;i<n;i++){
        while(q.length&& q[0]<i)
            q.shift()
        if(q.length)
            dp[i]=true
        if(dp[i]){
            while(q.length && q[q.length-1]<=i+A[i] )
                q.pop()
            q.push(i+A[i])
        }
    }
    return Boolean(dp[n-1])
}