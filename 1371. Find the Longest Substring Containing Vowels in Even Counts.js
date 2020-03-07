

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


//Bitmask solution
var findTheLongestSubstring=s=>{
    let seen={}
    let cur=0
    let res=0

    for (let i = 0; i < s.length; i++) {
        cur^=1<<('aeiou'.indexOf(s[i])+1)>>1
        if(seen[cur]===undefined)seen[cur]=i
        res=Math.max(res,i-seen[cur])
    }


    return res

}