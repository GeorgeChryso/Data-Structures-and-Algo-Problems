



var decrypt = function(code, k) {
    let n=code.length
    if(k==0)
        return [...Array(n)].map(d=>0)

    if(k>0){
        return code.map((d,i)=>{
            let res=0
            for (let q = i+1; q <i+1+k; q++) {
                let z=q%n
                res+=code[z]
            }
            return res
        })

    }

    return code.map((d,i)=>{
        let res=0
        for (let q = n+i-1; q >n+i-1+k; q--) {
            let z=q%n
            res+=code[z]
        }
        return res
    })
};
console.log(decrypt(
    [2,4,9,3], -2
))

var minimumDeletions = function(s) {
    
};


var minimumJumps = function(forbidden, a, b, x) {
    let f=new Set(forbidden)
    let dp=[...Array(x+a+x+x+x+x+x+x)].map(d=>Infinity)
    let jb=[...Array(x+a+x+x+x+x+x+x)].map(d=>false)
    dp[0]=0
    while(true){
        let dp2=[...dp]
        let flag=false
        for (let j = a; j <dp.length; j++)
            if(!f.has(j)&&!f.has(j-a)&&dp2[j]>dp[j-a]+1)
                dp2[j]=dp[j-a]+1,
                flag=true,
                jb[j]=false
        for (let j = dp.length-b; j >=0; j--)
            if(!f.has(j)&&!f.has(j+b)&&dp2[j]>dp[j+b]+1&&jb[j+b]==false)
                dp2[j]=dp[j+b]+1,
                flag=true,
                jb[j]=true
        if(flag===false||dp[x]!==Infinity||dp2[x]!==Infinity)
            return Math.min(dp2[x],dp[x])===Infinity?-1:Math.min(dp2[x],dp[x])
        dp=dp2
    }
};


cu=(chosen,index,r,start,end)=>{
    if(index===r){
        for (let i = 0; i < r; i++) {

        }
        return 
    }
   
        for (let i = start; i <= end; i++) { 
            chosen[index] = i; 
            cu(chosen, arr, index + 1, 
                    r, i, end); 
        } 
        return; 
}


combr(n,r)
combr=(n,r)=>{
    let chosen=[...Array(r+1)]
    cu(chosen,0,r,0,n-1)
}
console.log(
    minimumJumps(
        //[14,4,18,1,15],3,15,9
        [8,3,16,6,12,20],
15,
13,
11
    )
)