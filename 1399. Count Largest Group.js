// Given an integer n. Each number from 1 to n is grouped according to the sum of its digits. 

// Return how many groups have the largest size.


var countLargestGroup = function(n) {
    
    let memo={}

    for (let i = 1; i <=n; i++) {
       let num=i
       let sum=0
       while(num>=1){
            sum+=num%10
            num=Math.floor(num/10)
       }    
       memo[sum]=(memo[sum]||0)+1
    }
    let max=Math.max(...Object.values(memo))

    return Object.keys(memo).filter(d=>memo[d]==max).length
};