// Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

// // 


var countBits = function(num) {
    let result=Array(num+1).fill(0)

    for (let i = 0; i < result.length; i++) {
        let z=i

        //takes O(1) cos it takes max (32moves)
        while(z!=0){
            result[i]++
            z&=(z-1) // reverse the last set bit
        }        
    }
    return result
};