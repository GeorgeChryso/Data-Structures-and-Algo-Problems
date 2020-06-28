








// Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

// Return True if the path crosses itself at any point, that is, if at any time you are on a location you've previously visited. Return False otherwise.

var isPathCrossing = function(path) {
    let visited={}
    let x=0,y=0
    visited[0]=new Set()
    visited[0].add(0)
    for (let i = 0; i < path.length; i++) {
        if(path[i]=='N'){
            y++
        }
        else if(path[i]=='S'){
            y--
        }
        else if(path[i]=='E'){
            x++
        }
        else if(path[i]=='W'){
            x--
        }
        if(visited[x]!==undefined&&visited[x].has(y))return true
        if(visited[x]==undefined)visited[x]=new Set()
        visited[x].add(y)
    }
    return false
}

let nsm=(A,k)=>{

    let z=BigInt(1<<A.length)
    let result=0
    for (let i = 0n; i < z; i++) {
        
        let sum=0
        for (let j = 0; j < A.length; j++) {
            if(i&(1<<j))sum+=A[j]
            if(sum>k)break
        }
        if(sum==k)result++
    }
    return result
}

let nssm=(A,k)=>{

    let z=BigInt(1<<A.length)
    let result=0
    for (let i = 0n; i < z; i++) {
        
        let sum=0
        for (let j = 0; j < A.length; j++) {
            if(i&(1<<j))sum+=A[j]
            if(sum>k)break
        }
        if(sum==k)result++
    }
    return result
}

var canArrange = function(arr, k) {
    for (let i = 0; i < arr.length; i++) {
        let flag=false
        for (let j = 0; j < arr.length; j++) {
                if(i==j)continue
                if((arr[i]+arr[j])%k==0)flag|=true            
        }        
        if(flag==false)return false
        
    }
    return true
};

var numSubseq = function(nums, target) {
    nums.sort((a,b)=>a-b)
};


var findMaxValueOfEquation = function(points, k) {
  
    
    points.sort((a,b)=>{
        if(a[0]==b[0])return b[1]-a[1]
        return a[0]-b[0]
    })

    let newp=[]
    let memo=-1.2
    for (let i = 0; i < points.length; i++) {
        if(memo===-1.2){
            newp.push(points[i])
            memo=points[i][0]
            continue
        }        

        if(memo===points[i][0]){
            continue
        }

        newp.push(points[i])
        memo=points[i][0]
    }
    console.log(newp)
    let result=-Infinity
    for (let i = 0; i < newp.length; i++) {
        let [xa,ya]=newp[i]        
        for (let j = i+1; j < newp.length; j++) {
            let [xb,yb]=newp[j]
            let abs=Math.abs(xb-xa)
            if(abs>k)break
            result=Math.max(result,abs+yb+ya)
        }
    }
    return result
};

console.log(findMaxValueOfEquation(
    [[1,3],[2,0],[5,10],[6,-10]],
1
))