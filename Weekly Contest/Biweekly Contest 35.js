


var sumOddLengthSubarrays = function (arr) {
    if (arr.length == 1) return arr[0]
    let result = 0

    for (let len = 1; len <= arr.length; len += 2) {

        for (let i = 0; i <= arr.length - len; i++) {
            for (let j = i; j <= i + len - 1; j++) {
                result += arr[j]
                console.log(arr[j])
            }
        }
    }
    return result
};



var maxSumRangeQuery = function(nums, requests) {
    nums.sort((a,b)=>a-b)
    let result=0,n=nums.length
    let freq=[...Array(n)].map(d=>'')
    for (const [from,to] of requests) {
        freq[from]+='*'
        freq[to]+='*'
    }
    let set=new Set()
    for (let i = 0; i < n; i++) {
        
    }
    console.log(freq)
    freq.sort((a,b)=>a[0]-b[0])
    for (let i = 0; i < n; i++) {
        result+=freq[i]*nums[i]        
    }
    return result%(1e9+7)
};


var minSubarray = function(nums, p) {
    let prefix=[0],curr=0,n=nums.length
    for (let i = 0; i < n; i++) {
        curr+=nums[i]
        prefix.push(curr)        
    }
    let total=prefix[n]
    if(total%p==0)return 0
    for (let len = 1; len < n; len++) {
        for (let i = 0; i <= n-len; i++) {
            let pref=prefix[i+len]-prefix[i]
            if((total-pref)%p==0)
                return len
        }        
    }
    return -1
};


var isPrintable = function(A) {
    let n=A.length,m=A[0].length
    let freq={},maxnum=0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if(freq[A[i][j]]===undefined){
                freq[A[i][j]]=[n-1,m-1,0,0]
            }
            maxnum=Math.max(A[i][j],maxnum)
            freq[A[i][j]][0]=Math.min(freq[A[i][j]][0],i)
            freq[A[i][j]][2]=Math.max(freq[A[i][j]][2],i)
            freq[A[i][j]][1]=Math.min(freq[A[i][j]][0],j)
            freq[A[i][j]][3]=Math.max(freq[A[i][j]][3],j)
        }        
    }
    let ne=[...Array(n)].map(d=>[...Array(m)])
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            for (let k = maxnum; k >=0; k--) {
                if(freq[k]===undefined)
                    continue
                let [x,y,xx,yy]=freq[k]
                if(i>=x&&j>=y&&i<=xx&&j<=yy){
                    ne[i][j]=k
                    break
                    return false

                }
            }
        }        
    }
    console.log(ne)
    return true
};
console.log(isPrintable(
    [[2,2,2,5],[2,2,2,5],[2,2,2,5],[1,1,4,4]]
    ))