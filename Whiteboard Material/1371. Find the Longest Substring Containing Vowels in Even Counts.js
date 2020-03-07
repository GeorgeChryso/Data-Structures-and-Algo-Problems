

//sliding window over any possible length of the window
var findTheLongestSubstring = function(s) {

    for (let length = s.length; length >=0; length--) {
    
        let freq={
            'a':0,
            'e':0,
            'i':0,
            'o':0,
            'u':0
        }

        check=()=>Object.values(freq).every(d=>d%2===0)

        for (let i = 0; i < length; i++) {
            if(freq[s[i]]!==undefined)freq[s[i]]++
        }        

        if(check())return length

        let start=0
        for (let end = length; end < s.length; end++ ,start++) {
            if(freq[s[start]]!==undefined)freq[s[start]]--
            if(freq[s[end]]!==undefined)freq[s[end]]++
            if(check())return end-start
        }

    }
   
    return 0
};


//Bitmask solution- PREFIX XOR
var findTheLongestSubstring=s=>{
    let seen={} // key: bitmask, value: the first index at which it occurs
    let cur=0
    let res=0 
    //basecase
    seen[0]=-1 //because if I come across 0 at any time during my traversal, I will need to consider that length
    for (let i = 0; i < s.length; i++) {
        cur^=1<<('aeiou'.indexOf(s[i])+1)>>1
        if(seen[cur]===undefined)seen[cur]=i
        //the length of the string, between the first index at which my cur occured and the last
        // needs to be considered as a result, because that means that the inbetween string has a XOR of 0
        // which makes it of the required type
        res=Math.max(res,i-seen[cur]) 
    }


    return res
}