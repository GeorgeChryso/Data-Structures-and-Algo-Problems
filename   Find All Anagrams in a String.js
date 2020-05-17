// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

// Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

// The order of output does not matter.





var findAnagrams = function(s, p) {
    
    let memo={},memo2={}
    let invalid=0
    let result=[]
    //sliding window
    for (let i = 0; i < p.length; i++) {
        memo[p[i]]=(memo[p[i]]||0) +1 
        memo2[p[i]]=0       
    }
    let isAnagram=x=>Object.keys(memo2).every(d=>memo[d]===memo2[d])
    for (var i = 0; i < s.length; i++) {
        if(i<p.length){
            if(memo2[s[i]]===undefined)invalid++
            else{
                memo2[s[i]]++
            }
        }
        if(i>=p.length){
            if(invalid===0&&isAnagram())result.push(i-p.length)

            if(memo2[s[i-p.length]]!==undefined)memo2[s[i-p.length]] --
            else invalid--
            
            if(memo2[s[i]]===undefined)invalid++
            else{
                memo2[s[i]]++
            }
        }

    }
    if(invalid===0&&isAnagram())result.push(i-p.length)

    return result
};

console.log(
    findAnagrams(
        "cbaebabacd","abc"
    )
)