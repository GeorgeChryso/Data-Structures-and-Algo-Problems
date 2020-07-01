// You have a total of n coins that you want to form in a staircase shape, where every k-th row must have exactly k coins.

// Given n, find the total number of full staircase rows that can be formed.

// n is a non-negative integer and fits within the range of a 32-bit signed integer.



//naive
var arrangeCoins = function(n) {
    if(n==0)return 0
    let sum=0
    for (let i = 0; i <=n; i++) {
        sum+=i
        if(sum==n)return i
        if(sum>n)return i-1
    }

};

//binary search
var arrangeCoins = function(n) {
    if(n==0)return 0
    let lo=1
    let hi=(n>>1) +1 //AVOID OVERFLOW

    console.log(hi)
    let form=x=>x*(x+1)/2
    while(lo<hi){
        let mid=(lo+hi)>>1 //prone to overflow 
        if(form(mid)<n){
            if(form(mid+1)>n)return mid
            else lo=mid+1
        }
        if(form(mid)==n)return mid
        if(form(mid)>n)hi=mid-1
    }
    return lo

};

// math by completing the square 
// result(result+1)<=2*n
// AND FLOORING WITH |0
var arrangeCoins = function(n) {
    
    return (( 2*n+1/4)**.5 -1/2) |0

};

console.log(arrangeCoins(5))