// Given a string s consisting only of characters a, b and c.

// Return the number of substrings containing at least one occurrence of all these characters a, b and c.

 

// Example 1:

// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 



//my solution TLE sliding window

var numberOfSubstrings = function(s) {
    let result=0
    for (let start = 0; start <= s.length-3; start++) {
        let changed=false
        for (let end = start+2; end < s.length; end++) {

            let set=new Set()
            let count=0
            for (let i = start; i <=end; i++) {
                if(!set.has(s[i])){
                    count++
                    set.add(s[i])
                }
                if(count===3){
                    changed=true
                    result+=(s.length-end)
                    break
                }                
            }
            if(changed){
                break
            }
            
        }
        
    }
    return result
};

//Solution 1: Sliding Window
var numberOfSubstrings = s=>{
    let count=[0,0,0]//holds the last seen index of c,b,a
    let res=0

    let start=0
    for (let end = 0; end < s.length; end++) {
        count[s.charCodeAt(end)-97]++
        while(count.every(d=>d>0)){
            count[s.charCodeAt(start)-97]--
            start++
        }
        res+=start
    }
    return res
}



var numberOfSubstrings = function(s) {
    let last=[-1,-1,-1] //last seen index of c,b,a
    // then Math.min(...last) is the start of the smallest possible substring that contains all of a,b,c
    let res=0

    for (let end = 0; end < s.length; end++) {
        console.log(end,last,res)
        last[s.charCodeAt(end)-97]=end
        // the last seen index will mean that after that index
        // till my current one, I have a match
        // [Math.min(..last),end] is the smallest matching substring
        // but I have to count all of the strings that contain this.
        // which are equal to 1(the string itself)+all of the previous ones(Math.min(...last)) 
        res+=1+Math.min(...last)
    }   
    return res
};
console.log(numberOfSubstrings(
    `abcabc`
))