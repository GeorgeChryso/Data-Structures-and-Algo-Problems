


var containsPattern = function(arr, m, k) {
    let n=arr.length
    let memo={}
    if(m>n||m*k>n)return false
    for (let i = 0; i <=n-m; i++) {
        let curr=arr.slice(i,i+m).join('')
        let count=1
        for (let j = i+m; j <=n-m; j++) {
            let next=arr.slice(j,j+m).join('')
            if(curr===next)count++
            else break           
        }
        if(count>=k)return true
    }


    return false
};

var getMaxLen = function(nums) {
    let minus=0,plus=0,result=0
    let lastminus=-1
    for (let i = 0; i < nums.length; i++) {
        if(nums[i]==0){
            plus=0
            minus=0
            lastminus=-1
        }
        else{
            if(nums[i]>0)plus++
            else minus++

            if(nums[i]<0&&lastminus==-1){
                lastminus=i
            }

            if(minus==0){
                result=Math.max(plus,result)
            }
            else if(minus>1){
                if(minus%2){
                    result=Math.max(result,i-lastminus)
                }
                else{
                    result=Math.max(result,plus+minus)
                }
            }
            else{
                result=Math.max(result,i-lastminus)
            }

        }            

    }
    return result
};



var minDays = function(grid) {
    let result=0,n=grid.length,m=grid[0].length
    let memo=([...Array(n)].map(d=>[...Array(m)].map(d=>false)))
    let recursive=(i,j,count)=>{
        if(i>=n||j>=n||grid[i][j]==0||memo[i][j])return 0
        count+=1+recursive(i+1,j)+recursive(i,j+1)
        memo[i][j]=true
        return count
    }   
    let cnt=0
    for (let i = 0; i <n; i++) {
        for (let j = 0; j < m; j++) {
            if(grid[i][j]==1&&memo[i][j]==false){
                let c=recursive(i,j)
                if(c>0)cnt++
            }            
        }        
    }
    if(cnt>1)return 0
};




console.log(getMaxLen(
    [9,-8,-9,3,-10,2]
))