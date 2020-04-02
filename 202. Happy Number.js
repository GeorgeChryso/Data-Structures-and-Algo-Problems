

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