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


let countOrders=n=>{
    let result=1
    for (let i = 1; i <= 2*n; i++) {
        result=(result*i) 
        result%=(10**9 + 7)      
    }
    result= result/(2**n) 
    return result%(10**9 + 7)
}