// Given a string s and an integer k. You should construct k non-empty palindrome strings using all the characters in s.

// Return True if you can use all the characters in s to construct k palindrome strings or False otherwise.


//just the count of the available letter matters
var canConstruct = function(s, k) {
    if(s.length==k)return true
    if(k>s.length)return false

    let freq={}

    //letters
    for (const str of s) {
        freq[str]=(freq[str]||0) +1
    }


    for (const k in freq) {
        freq[k]%=2
    }
    return Object.keys(freq).filter(d=>freq[d]==1).length <=k
};