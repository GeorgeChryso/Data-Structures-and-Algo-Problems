// Given a string S of lowercase letters, a duplicate removal consists of choosing two adjacent and equal letters, and removing them.

// We repeatedly make duplicate removals on S until we no longer can.

// Return the final string after all such duplicate removals have been made.  It is guaranteed the answer is unique.

var removeDuplicates = function(S) {
  

   // while([...S.match((/(.)\1+/))].length!=0){}
 while(/(.)\1/.test(S)){
S= S.replace(/(.)\1/,'')  }
return  S

};

console.log(
    removeDuplicates(
        "abbaca"
    )
)

// /(.)\1+/.test(  "abbaca")d