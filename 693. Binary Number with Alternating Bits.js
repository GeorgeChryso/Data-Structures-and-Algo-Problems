// Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.





var hasAlternatingBits = function(n) {
    
    let bit=n&1 //the first bit

    //search if every bit is NOT its next
    while(n!==0){

        if(bit==((n>>>1)&1))return false //if its equal to its next return false
        n=n>>>1 //move to the next
        bit=n&1 //change the bit to be the current one

    }


    return true
};