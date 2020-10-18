


var trimMean = function(arr) {
    let n=arr.length   
    let remove=0.05*n
    arr.sort((a,b)=>a-b)
    for (let i = 0; i < remove; i++) {
        arr.shift()
        arr.pop()        
    }
    let m=arr.length
    return arr.reduce((a,c)=>a+c)/m
};




var bestCoordinate = function(towers, radius) {
    towers.sort(([x,y,z],[xx,yy,zz])=>xx==x?y-yy:x-xx)
    let n=towers.length,bestq=-1,result=[]
    for (let i = 0; i < n; i++) {
        let currq=0
        let [x1,y1,q1]=towers[i]
       for (let j = 0; j < n; j++) {
            let [x2,y2,q2]=towers[j]     
            if(Math.sqrt( (x2-x1)**2+(y2-y1)**2)>radius)
                    continue
            currq+=Math.floor(q2/(1+Math.sqrt( (x2-x1)**2+(y2-y1)**2)))

       }
       if(currq>bestq){
           bestq=currq
           result=[x1,y1]
       }
    }
    return result
};


var numberOfSets = function(n, k) {
    let mod=1e9+7
    let dp=[...Array(n+2+k)].map(d=>[...Array(n+2+k)].map(d=>0))
    //basecases
    for (let i = 1; i <=n+2+k; i++) {
        dp[i][0]=1 //combinations n take 0 is 1 
        dp[i][i]=1 //combinations n take n is  1 
    }
    for (let i = 1; i <=n+2+k; i++) 
        for (let k = 1; k <=i; k++) 
            dp[i][k]=dp[i-1][k-1]+dp[i-1][k]            

    
    dp.forEach(d=>console.log(d+''))
    return dp[n+k][n-k]%mod
};





var Fancy = function() {
    this.arr=[]
    this.stack=[]
    this.mod=1e9+7
    this.pair=[1,0]
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    this.arr.push(val)
    this.stack.push([...this.pair])
    this.pair=[1,0]
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    let [a,b]=this.pair
    this.pair=[a,(b+inc)%this.mod]
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    let [a,b]=this.pair
    this.pair=[(a*m)%this.mod,(b*m)%this.mod]
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    let n=this.arr.length
    if(idx>=n)
        return -1
    let res=this.arr[idx],id=idx+1
    while(id<n&&this.stack[id]==0)
        id++
    if(id>=n){
        let [a,b]=this.pair
        return (res*a+b)%this.mod
    }
    else{
        let [a,b]=this.stack[id]
        return (res*a+b)%this.mod
    }
};

/** 
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */

console.log(numberOfSets(
    6,5
))