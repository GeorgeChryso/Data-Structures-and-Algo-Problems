// You are given a 2D integer array, queries. For each queries[i], where queries[i] = [ni, ki], find the number of different ways you can place positive integers into an array of size ni such that the product of the integers is ki. As the number of ways may be too large, the answer to the ith query is the number of ways modulo 109 + 7.

// Return an integer array answer where answer.length == queries.length, and answer[i] is the answer to the ith query.

 

/**
 * @param {number[][]} queries
 * @return {number[]}
 */
//tle recursion O(n^3)
var waysToFillArray = function(Q) {
    let mxi=0,mxj=0,mod=1e9+7
    for(let [k,n] of Q)
        mxi=Math.max(mxi,k),
        mxj=Math.max(mxj,n)
    let dp=[...Array(mxi+1)].map(d=>[...Array(mxj+1)].map(d=>0))
    
    dp[1].fill(1)
     
    for(let i=2;i<=mxi;i++)
        for(let j=1;j<=mxj;j++)
            for(let factor=1;factor<=j;factor++)
                if(j%factor==0)
                    dp[i][j]+=dp[i-1][j/factor],
                    dp[i][j]%=mod
    dp.forEach(d=>console.log(d+''))
    return Q.map(([i,j])=>dp[i][j])
};

console.log(waysToFillArray(
    [[2,6],[5,1],[1,10]]
))

//tle recursion O(n^3)
var waysToFillArray = function(Q) {
    let mod=1e9+7,memo=new Map()   
    let recursion=(i,j)=>{
        if(i==1)
            return 1
        let state=[i,j]+'',sum=0
        if(memo.get(state))
            return memo.get(state)
        for(let factor=1;factor<=j;factor++)
            if(j%factor==0)
                sum=(sum+recursion(i-1,j/factor))%mod
        memo.set(state,sum)
        return sum
    }
    return Q.map(([i,j])=>recursion(i,j))
};

console.log(waysToFillArray(
    [[4,6]]
))

//Optimization: 
// So the previous method would TLE because 
// when we had to create let's say a state of the form x,1
// it would go to ->x-1,1 ->x-2,1 ....etc
// whereas we can compute the ways to create the required number of elements for each query seperately
// so if we placed k items already, and we want to create an array of length n that, but our current target product is 1
// the total nubmer of such arrays is always Combinations(n,k)
var memo=new Map()
var combinations=(n,k,mod=(1e9+7))=>{
    let key=[n,k].toString()
    if(!memo.has(key)){
        let res
        if(k==0||n==k)
            res= 1
        else
            res=(combinations(n-1,k-1)+combinations(n-1,k))%mod
        memo.set(key,res)
    }
    return memo.get(key)
}
var waysToFillArray = function(Q) {
    let mod=1e9+7,memo=new Map()  
    //ways to create an array of i items if the product we want is j  
    let waysToCreate=(availablePositions,total,targetProduct)=>{
        let state=[availablePositions,targetProduct]+''
        if(memo.get(state))
            return memo.get(state)
        else if(targetProduct===1)
            memo.set(state, combinations(total,total-availablePositions)) //prune some states
        else if(availablePositions===1) //there is only 1 way to create 1 item, and that is to place Itself
            memo.set(state,1)
        else{
            let sum= waysToCreate(availablePositions-1,total,1) //assume we placed targetProduct
            //assume we placed factor, now we want to create targetProduct/factor with 1 less item
            for(let factor=2;factor<targetProduct;factor++)
                if(targetProduct%factor==0)
                    sum= ( sum%mod + waysToCreate(availablePositions-1,total,targetProduct/factor)%mod)%mod
            memo.set(state,sum)
        }
        return memo.get(state)
    }
    return Q.map(([i,j])=>{
        memo=new Map()
        return waysToCreate(i,i,j)
    })
};



var memo=new Map()
var combinations=(n,k,mod=(1e9+7))=>{
    let key=[n,k].toString()
    if(!memo.has(key)){
        let res
        if(k==0||n==k)
            res= 1
        else
            res=(combinations(n-1,k-1)+combinations(n-1,k))%mod
        memo.set(key,res)
    }
    return memo.get(key)
}
var waysToFillArray = function(Q) {
    let mod=1e9+7,memo=new Map()  
    //ways to create an array of i items if the product we want is j  
    let waysToCreate=(availablePositions,total,targetProduct)=>{
        let state=[availablePositions,targetProduct]+''
        if(memo.get(state))
            return memo.get(state)
        else if(availablePositions===1) //there is only 1 way to create 1 item, and that is to place Itself
            memo.set(state,1)
        else{
            let sum=combinations(total,total-availablePositions-1)
            //assume we placed factor, now we want to create targetProduct/factor with 1 less item
            for(let factor=2;factor<targetProduct;factor++)
                if(targetProduct%factor==0)
                    sum= ( sum%mod + waysToCreate(availablePositions-1,total,targetProduct/factor)%mod)%mod
            memo.set(state,sum)
        }
        return memo.get(state)
    }
    return Q.map(([i,j])=>{
        memo=new Map()
        return waysToCreate(i,i,j)
    })
};



// Stars and Bars technique.
let EratosFaster=n=>{
    let lp=[...Array(n+1)].map(d=>false),pr=[]
    for (let i=2; i<=n; ++i) {
        if (lp[i] == 0) 
            lp[i] = i,
            pr.push(i)
        for (let j=0; j<pr.length && pr[j]<=lp[i] && i*pr[j]<=n; ++j)
            lp[i * pr[j]] = pr[j];
    }
   return pr
}
var memo=new Map()
var combinations=(n,k,mod=BigInt(1e9+7))=>{
    let key=[n,k].toString()
    if(!memo.has(key)){
        let res
        if(k==0n||n==k)
            res= 1n
        else
            res=(combinations(n-1n,k-1n)+combinations(n-1n,k))%mod
        memo.set(key,res)
    }
    return memo.get(key)
}
var waysToFillArray = function(Q) {
    let mod=BigInt(1e9+7)
    let primes=EratosFaster(10**4) //all the primes from 1. to 10**4
    return Q.map(([i,j])=>{
        let result=1n
        for(let prime of primes){
            if(prime>j)
                break
            if(j%prime==0){
                let counter=0,current=j
                while(current%prime==0)
                    current/=prime,
                    counter++
                result= (result*combinations(BigInt(i+counter-1),BigInt(counter)))  %mod
            }
        }
        return result
    })
};





console.log(waysToFillArray([[2,6],[5,1],[73,660]]))