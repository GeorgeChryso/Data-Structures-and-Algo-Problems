// Balanced strings are those who have equal quantity of 'L' and 'R' characters.

// Given a balanced string s split it in the maximum amount of balanced strings.

// Return the maximum amount of splitted balanced strings.


var balancedStringSplit = function(S) {
    var counter=0
    var balance=0

    for (let i = 0; i < S.length; i++) {
            if(S[i]=='L'){
                balance++
            }        
            else{
                balance--
            }
            if( !balance)counter++
    }

    return counter
};
// Optimized O(n)