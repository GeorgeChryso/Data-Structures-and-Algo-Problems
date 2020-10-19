// Given a string s, return the length of the longest substring between two equal characters, excluding the two characters. If there is no such substring return -1.

// A substring is a contiguous sequence of characters within a string.


//O(n) O(26)=O(1)
var maxLengthBetweenEqualCharacters = function(s) {
    let result=-1,n=s.length,min=[...Array(26)].map(d=>Infinity)
    for (let i = 0; i < s.length; i++) 
        if(i<min[s[i].charCodeAt(0)-97])
            min[s[i].charCodeAt(0)-97]=i
        else
            result=Math.max(i-min[s[i].charCodeAt(0)-97]-1,result)
    return result
};
