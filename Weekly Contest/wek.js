



var slowestKey = function(releaseTimes, keysPressed) {
    let memo={},n=keysPressed.length

    let prev=0
    for (let i = 0; i < n; i++) {
        let curkey=keysPressed[i]
        memo[curkey]=Math.max((memo[curkey] ||0) , releaseTimes[i]-prev)
        prev=releaseTimes[i]     
    }

    let keys=Object.keys(memo)
    let result,max=-1
    for(let k of keys){
        if(memo[k]>=max){
            if(memo[k]==max){
                if(result<k)
                    result=k
            }
            else{
                result=k
            }
            
            max=memo[k]
        }
    }
    return result
};


var checkArithmeticSubarrays = function(nums, l, r) {
    let n=nums.length,m=l.length

    return l.map((left,i)=>{
        let right=r[i]
        let arr=nums.slice(left,right+1)
        arr.sort((a,b)=>a-b)
        let nn=arr.length
        if(nn<=2)
            return true
        let diff=arr[1]-arr[0]
        for (let i = 2; i < nn; i++) {
            if(diff!==arr[i]-arr[i-1])
                return false            
        }
        return true
        })
};

var minimumEffortPath = function(heights) {
    let n=heights.length,m=heights[0].length
    
    let seen=new Set()
    let get=(i,j,val)=>{
        if(i<0||j<0||i>=n||j>=m)
            return Infinity
        
        return Math.abs(heights[i][j]-val)
    }
    let result=Infinity
    let highestdiff=0
    let dfs=(i,j,abs)=>{
        if(i<0||j<0||i>=n||j>=m)
            return Infinity
        if(i==n-1&&j==m-1){
            result=Math.min(abs,result)
            highestdiff=Math.max(highestdiff,abs)
            return abs
        }
         let z= i*m+j

        if(seen.has(z))
            return

        seen.add(z)
        if(get(i-1,j ,heights[i][j])<highestdiff)
        dfs(i-1,j,Math.max(abs,get(i-1,j ,heights[i][j])))
        if(get(i,j+1 ,heights[i][j])<highestdiff)

        dfs(i,j+1,Math.max(abs,get(i,j+1 ,heights[i][j])))
        if(get(i+1,j ,heights[i][j])<highestdiff)

        dfs(i+1,j,Math.max(abs,get(i+1,j ,heights[i][j])))       
        if(get(i,j-1 ,heights[i][j])<highestdiff)
        dfs(i,j-1,Math.max(abs,get(i,j-1 ,heights[i][j])))

        seen.delete(z)
    }   

    return dfs(0,0,0)
};