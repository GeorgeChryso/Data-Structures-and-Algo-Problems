


//binary search the result
var mySqrt = function(n) {
    if(n<2)return Math.floor(n)
    let lo=0,hi=n>>1
    while(lo<hi){
        let mid=(lo+hi)>>1
        if(mid*mid<=n){
            if((mid+1)**2>n)return mid
            else lo=mid+1
        }
        else hi=mid-1
    }
    return lo
};


