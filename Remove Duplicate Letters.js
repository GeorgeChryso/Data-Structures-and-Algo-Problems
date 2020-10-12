// Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

// Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/

//  .Example 1:

//  Input: s = "bcabc"
//  Output: "abc"
//  Example 2:
 
//  Input: s = "cbacdcbc"
//  Output: "acdb"




var smallestSubsequence = function(text) {
    let lastIndexAt=[...Array(26)],currStack=[],n=text.length,memo=0

    for(let i=0;i<n;i++)
        lastIndexAt[text.charCodeAt(i)-97]=i

    for(let i=0;i<n;i++){
        let curr=text.charCodeAt(i)-97

        //key. never do this process for letters already in the stack
        if(memo&(1<<curr)) 
            continue

        //top of the stack can be popped if:
        while(
            //the stack is not empty
            currStack.length
            //the last letter of my stack is lexicographically bigger than my curr (aka should be replaced if possible)
            &&currStack[currStack.length-1].charCodeAt(0)-97>=curr
            //the lastindex of that letter is bigger than i 
            // aka,I can replace my letter down the road
            &&lastIndexAt[currStack[currStack.length-1].charCodeAt(0)-97]>=i){
                memo^=(1<<(currStack[currStack.length-1].charCodeAt(0)-97))
                currStack.pop()
            }
        currStack.push(text[i])
        memo|=(1<<curr)

    }
    return currStack.join("")
};

console.log(
    smallestSubsequence(
        "cbaacabcaaccaacababa"
            )
)