// Given n orders, each order consist in pickup and delivery services. 

// Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 

// Since the answer may be too large, return it modulo 10^9 + 7.




// PERMUTATIONS OF N ITEMS,WITHOUT REPETITION
// the number of all possible permutations of n orders +n deliveries
// =(n+n)!/0!=(2n)!/0!=(2n)!

//now I only want some of those (2n)!, the ones which have 
// Orderi < Deliveryi

//
//For each pair, the order is determined, so we need to divide by 2.
//So the final result is (2n)!/(2^n)

var countOrders=n=>{
    let mod=1e9+7
    let res=1
    for (let i = 1; i <=2*n; i++) {
        //i cant immediately do /2**n, cos it overflows
        // so i do a /2 only when i meet an even number
        let divisor=i%2?2:1
        res=(res*i/divisor)%mod
    }
    return res
}


// Idea
// Denote pickup 1, pickup 2, pickup 3, ... as A, B, C, ...
// Denote delivery 1, delivery 2, delivery 3, ... as a, b, c, ...
// We need to ensure a is behind A, b is behind B, ...

// This solution involves 2 stages.

// Stage 1
// We decide the order of all the pickups. It is trivial to tell there are n! possibilities
// Stage 2
// Given one possibility. Let's say the pickups are ordered like this A B C
// We can now insert the corresponding deliveries one by one.
// We start with the last pickup we made, namely, insert c, and there is only 1 valid slot.
// A B C c
// We continue with the second last pickup we made, namely, insert b, and there are 3 valid slots.
// A B x C x c x (where x denotes the location of valid slots for b)
// Let's only consider one case A B C c b. We continue with the third last pickup we made, namely, insert a, and there are 5 valid slots.
// A x B x C x c x b x, (where x denotes the location of valid slots for a)
// In conclusion. we have in total 1 * 3 * 5 * ... * (2n-1) possibilities
// Thus, the final solution is n! * (1 * 3 * 5 * ... * (2n-1)) % 1000000007
var countOrders=n=>{
    let res=1
    let cap=1e9+7
    for (let i=1; i<n+1; ++i) res = res * i % cap; //n!
    for (let i=1; i<2*n; i+=2) res = res * i % cap;// n!*(2n-1)
    return res;
}


var countOrders=n=>{
    let res=1
    let mod=1e9+7
    for (let i = 1; i <= n; i++) {
        res = res * (i * 2 - 1) * i % mod;

    }
    return res
}



console.log(countOrders(18))