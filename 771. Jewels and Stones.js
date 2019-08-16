

var numJewelsInStones = function (J, S) {
    let c = 0
 for ( let i in J) {
    for (let j in S) {
        if (J.charAt(i)===S.charAt(j)) {
            c++            
        }
    }
    }
    
    return c

};

console.log(numJewelsInStones(

    "aA", "aAAbbbb"
))
