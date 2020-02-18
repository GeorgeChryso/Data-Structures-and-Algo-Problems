// Given two integers L and R, find the count of numbers in the range [L, R] (inclusive) having a prime number of set bits in their binary representation.

// (Recall that the number of set bits an integer has is the number of 1s present when written in binary. For example, 21 written in binary is 10101 which has 3 set bits. Also, 1 is not a prime.)



var countPrimeSetBits = function(L, R) {


    // the sieve of Eratosthenes to find all the primes from 2 to R
    // let isPrimeDict={}
    // for (let i = 2; i <=R; i++) {
    //    isPrimeDict[i]=true    
    // }
    // for (let i = 2; i < Math.floor(Math.sqrt(R))+1; i++) {
    //     if(isPrimeDict[i]===true){
    //         for (let j = i**2; j <=R; j+=i) {
    //             isPrimeDict[j]=false            
    //         }
    //     }
    // }
    //dumb way lol
    // ok so the maximum number of bits is 32, so I need to find the primes between 2 and 32
    // so I can also manually create a bucket with the primes between 2 and 32
    // 2, 3, 5, 7, 11, 13, 17 or 19

    let primes=new Set([2,3,5,7,11,13,17,19])
        

    let hasPrimeBits=x=>{
        let counter=0
        while(x!=0){
            counter++
            x&=(x-1) //unset the last set bit
        }
        return primes.has(counter) //faster way
        return isPrimeDict[counter] //slower way
    }
    let result=0

    for (let i = L; i <= R; i++) {
        if(hasPrimeBits(i))result++        
    }

    return result
};

console.log(countPrimeSetBits(5,8))