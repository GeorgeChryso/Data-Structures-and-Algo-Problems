// Given two strings s1 and s2, write a function to return true if s2 contains the permutation of s1. In other words, one of the first string's permutations is the substring of the second string.



var checkInclusion = function(p, s) {
       
    let memo={},memo2={}
    //sliding window
    let isAnagram=x=>Object.keys(memo2).every(d=>memo[d]===memo2[d])
    let reset=x=>Object.keys(memo2).forEach(d=>memo2[d]=0)
    for (let i = 0; i < p.length; i++) {
        memo[p[i]]=(memo[p[i]]||0) +1 
        memo2[p[i]]=0       
    }
    let i=0,j=0
    while(j<s.length){
        if(memo2[s[j]]===undefined){
            reset()
            j++
            i=j
            continue
        }
        else{
            memo2[s[j]]++
        }
        if(j-i===p.length-1){
            if(isAnagram())return true
            if(memo2[s[i]]!==undefined)memo2[s[i]]--
            i++
        }
        console.log(memo2)
        j++
    }
    return false

}

console.log(checkInclusion(
    "ab","eidboaoo" 
    //"eidbaooo"
))
