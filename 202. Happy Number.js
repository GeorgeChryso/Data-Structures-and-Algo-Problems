

var isHappy = function(n) {
    let memo=new Set()

    while(n!=1){
        if(memo.has(n))return false
        memo.add(n)
        let sum=0
        while(n>=1){
            sum+=(n%10)**2
            n=Math.floor(n/10)
        }
        n=sum
    }
    return true
};

console.log(isHappy(7))


// Floyd's Cycle Detection 
var isHappy = function(n) {

    let next=x=>{
        let sum=0
        while(x>=1){
            sum+=(x%10)**2
            x=Math.floor(x/10)
        }
        return sum
    }

    let slow=n 
    let fast=next(n)
    while(slow!=fast){
        if(slow==1||fast==1)return true
        slow=next(slow)
        fast=next(next(fast))
    }
    if(slow==1||fast==1)return true
    return false
};
