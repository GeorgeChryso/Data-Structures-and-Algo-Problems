


var modifyString = function(s) {
    s=s.split('')

    if(s[0]=='?'){
        if(s[1]=='a')s[0]='b'
        else s[0]='a'
    }
    if(s[s.length-1]=='?'){
        if(s[s.length-2]=='a')s[s.length-1]='b'
        else s[s.length-1]='a'
    }
    for (let i = 1; i < s.length-1; i++) {
        if(s[i]==='?'){
            if(s[i+1]=='?'){
                if(s[i-1]=='z')s[i]='a'
                else{
                    s[i]=String.fromCharCode(s[i-1].charCodeAt(0)+1)
                }
            }
            else{
                if(s[i-1]!='a'&&s[i+1]!='a')s[i]='a'
                //s[i+1]=='a'
                else if(s[i-1]!='a'){
                    if(s[i-1]=='z')s[i]='b'
                    else s[i]='z'
                }
                //s[i-1]=='a
                else{
                    if(s[i+1]=='z')s[i]='b'
                    else s[i]='z'
                }
            }
        }        
    }
    return s.join('')
};



//alternative
var N=10000// set total number  of elements 
var dp=[...Array(N+1)].map(d=>[...Array(N+1)])
//basecases
for (let i = 1; i <=N; i++) {
    dp[i][0]=1 //combinations n take 0 is 1 
    dp[i][i]=1 //combinations n take n is  1 
}
var combinations=(n,k)=>{
    if(dp[n][k]!==undefined)
        return dp[n][k]
    for (let i = 1; i <=N; i++) {
        for (let k = 1; k <i; k++) {
            dp[i][k]=dp[i-1][k-1]+dp[i-1][k]            
        }        
    }
    return dp[n][k]
}
var numTriplets = function(nums1, nums2) {
    nums1.sort((a,b)=>a-b)
    nums2.sort((a,b)=>a-b)
    let freq2={},freq1={}
    for (let i = 0; i < nums2.length; i++) 
        freq2[nums2[i]]=( freq2[nums2[i]]||0)+1
    for (let i = 0; i < nums1.length; i++) 
        freq1[nums1[i]]=( freq1[nums1[i]]||0)+1

    let result=0,o1= Object.keys(freq1)
    for (let i = 0; i <o1.length; i++) {
        let a=o1[i]**2
        for (var j = 0; j < nums2.length&&nums2[j]<o1[i]; j++) {
            if(a%nums2[j]==0&&freq2[a/nums2[j]]!==undefined){
                result+=freq2[a/nums2[j]]
            }
        }

        if(j!==nums2.length){
            if(nums2[j]==o1[i]){
                let count=0
                while(nums2[j]==o1[i]){
                    count++
                    j++
                }
                result+=combinations(count,2)*freq1[o1[i]]
            }
        }
    }
    for (let i = 0; i < nums2.length; i++) {
        let a=nums2[i]**2
        for (var j = 0; j < nums1.length&&nums1[j]<nums2[i]; j++) {
            if(a%nums1[j]==0&&freq1[a/nums1[j]]!==undefined){
                result+=freq1[a/nums1[j]]
            }
        }
        if(j!==nums1.length){
            if(nums1[j]==nums2[i]){
                let count=0
                while(nums1[j]==nums2[i]){
                    count++
                    j++
                }
                result+=combinations(count,2)
            }
        }
    }
    return result
};


var minCost = function(s, cost) {
    let result=0
    for (let i = 0; i < s.length-1; i++) {
        if(s[i]==s[i+1]){
            let curr=i+1,count=cost[i],total=cost[i]
            console.log(i,cost[i])
            while(curr<s.length&&s[i]==s[curr]){
                total+=cost[curr]
                count=Math.max(cost[curr],count)
                curr++
            }
            result+=(total-count)
            i=curr-1
            console.log(total,count,total-count,curr)
        }
    }
    return result
};

var maxNumEdgesToRemove = function(n, edges) {
   edges.sort((a,b)=>b[0]-a[0])
   let memo={},result=0
    for (const [type,f,to] of edges) {
        if(memo[''+f+to]==3){
            result++
        }
        else if(memo[''+f+to]==2){
            memo[''+f+to]=3
        }
        else
            memo[''+f+to]=type
   }
   for (let i = 1; i <=n; i++) {
        if(memo[i]!==3)
            return 0       
   }
   return result
};

console.log(minCost(
    "bbbaaa",
[4,9,3,8,8,9]
))