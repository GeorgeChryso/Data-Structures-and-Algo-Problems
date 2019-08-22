'use strict'

// Given a string S of lowercase letters, a duplicate removal consists of choosing two adjacent and equal letters, and removing them.

// We repeatedly make duplicate removals on S until we no longer can.

// Return the final string after all such duplicate removals have been made.  It is guaranteed the answer is unique.

  
var removeDuplicates =(function(S) {    
    while (S.length > 1) {
        let a = S.length;        
        S = S.replace(/([a-z])\1/g, "");
        if (S.length == a) {
            break;
        }       
    }       
    
    return S;
})( "abbaca")

console.log(removeDuplicates)

// /(.)\1+/.test(  "abbaca")d