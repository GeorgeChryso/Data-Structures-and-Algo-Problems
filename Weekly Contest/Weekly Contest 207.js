



var reorderSpaces = function(text) {
    let words=[],spaces=0,n=text.length,curr=''
    for (let i = 0; i < n; i++) {
        if(text[i]===' '){
            if(curr!=='')words.push(curr)
            curr=''
            spaces++
        }
        else{
            curr=curr+''+text[i]
        }  
    
    }
    if(curr!=='')
        words.push(curr)
    let len=(spaces-(spaces%(words.length-1)))/(words.length-1)
    if(words.length===1)
        return (words.concat([...Array(spaces)].map(d=>' '))).join('')
    let mid='',end=''
    for(i=0;i<len;i++)
        mid=mid+' '
    for(i=0;i<(spaces%(words.length-1));i++)
        end=end+' '
    return words.join(mid)+end
};



var maxProductPath = function(grid) {
    let result=-1,mod=1e9+7,n=grid.length,m=grid[0].length
    let rec=(i,j,curr)=>{
     
        if(i>=n||j>=m)
            return
        if(grid[i][j]==0)
            return result=Math.max(result,0)
        if(i==n-1&&j==m-1)
            return result=Math.max(  curr*grid[i][j],result)
        rec(i+1,j,        curr*grid[i][j]
            )
        rec(i,j+1,        curr*grid[i][j])
    }

    rec(0,0,1,1)
    return result% mod
};


var maxUniqueSplit = function(s) {
    if(s.length==1) return 1
    let result=1
    let recursion=(i,curr,set)=>{

        set.add(curr)
        if(i>=s.length){
            console.log(set)
            result=Math.max(result,set.size-1)
            return
        }
            
        for (let j = i+1; j <= s.length; j++) {
            let sliced=s.slice(i,j)
            if(set.has(sliced))
                continue
            let nes=new Set(set)
            recursion(j,sliced,nes)            
        }

    }
    recursion(0,'',new Set())
    return result
};


var connectTwoGroups = function(cost) {
    let n=cost.length,m=cost[0].length
    let result=Infinity
    let masksums=[...Array(n)].map(d=>[...Array(1<<m)].map(d=>0))
    for (let i = 0; i < n; i++) {
        for (let mask = 1; mask < (1<<m); mask++) {
            masksums[i][mask]=0
            for (let j = 0; j <m; j++) {
                if(mask&(1<<j))
                    masksums[i][mask]+=cost[i][j]
            }
        }        
    }
   
    let recursion=(i,curr,costsofar)=>{
        if(i>=n){
            if((curr==(1<<m)-1)&&costsofar<result)
                return result=costsofar
            else
                return
        }

        let com=((1<<m )-1)&(~curr)
        for (let mask = com;mask>0; mask=((mask-1)&com)) {
            let c=masksums[i][mask]
            recursion(i+1,curr|mask,costsofar+c)            
        }

    }
    recursion(0,0,0)
    return result
};
console.log(connectTwoGroups(
    [[1,3,5],[4,1,1],[1,5,3]]
    ))