



var countGoodTriplets = function(arr, a, b, c) {
    let result=0
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            for (let k = j+1; k < arr.length; k++) {
                if(Math.abs(arr[i]-arr[j])<=a&&Math.abs(arr[j]-arr[k])<=b&&Math.abs(arr[i]-arr[k])<=c)result++                
            }            
        }        
    }
    return result
};







var getWinner = function(arr, k) {
    if(arr.length==2){
        return Math.max(arr[0],arr[1])
    }
    if(k>=arr.length)return Math.max(...arr)

    let count=0
    let memo=arr[0]
    while(count!==k){
        let old=memo
        let min=Math.min(arr[0],arr[1])
        let max=Math.max(arr[0],arr[1])
        memo=max
        if(old==max)count++
        else count=1
        arr.shift()
        arr[0]=max
        arr.push(min)
    }
    return memo

};

var minSwaps = function(grid) {
    
};

var maxSum = function(A, B) {
    let mod=1e9+7
    let s1=new Set(A),s2=new Set(B)
    let result=0
    let accum1=0,accum2=0
    let i=0,j=0
    while(true){
        if(i===A.length&&j===B.length)break
        accum1=0,accum2=0
        while(i<A.length&& !s2.has(A[i])){
            accum1=(accum1+A[i])
            i++
        }
        while(j<B.length&&!s1.has(B[j])){
            accum2=(accum2+B[j])
            j++
        }
     
        if(i<A.length&&j<B.length&&A[i]===B[j]){
            result=(result+A[i]+Math.max(accum1,accum2))
            i++
            j++
        }
        else{
            result=(result+Math.max(accum1,accum2))
        }
    }
    return result%mod
};

console.log(
    maxSum(
        [2,4,5,8,10],[4,6,8,9]
    )
)