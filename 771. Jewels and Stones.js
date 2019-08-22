'use strict'




var numJewelsInStones = function (J, S) {

    J = new Set(J)
    let count = 0
    for (let i = 0; i < S.length; i++) {
        if (J.has(S[i])) {
            count++
        }
    }
    return count
};


console.log(numJewelsInStones(

    "z",
"ZZ"
))
