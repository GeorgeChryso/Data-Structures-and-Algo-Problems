// Given a string s. An awesome substring is a non-empty substring of s such that we can make any number of swaps in order to make it palindrome.

// Return the length of the maximum length awesome substring of s.

 

// Example 1:

// Input: s = "3242415"
// Output: 5
// Explanation: "24241" is the longest awesome substring, we can form the palindrome "24142" with some swaps.
// Example 2:

// Input: s = "12345678"
// Output: 1
// Example 3:

// Input: s = "213123"
// Output: 6
// Explanation: "213123" is the longest awesome substring, we can form the palindrome "231132" with some swaps.
// Example 4:

// Input: s = "00"
// Output: 2
 

// Constraints:

// 1 <= s.length <= 10^5
// s consists only of digits.



//Sliding Window. Essentially ,for every possible length, keep a frequency table with the number of times an element was seen, and a counter odds, of the odd frequencies
var longestAwesome = function(s) {
    let freq={}
    let odd=0
    for (let i = 0; i < s.length; i++) {
        if(freq[s[i]]===undefined){
            freq[s[i]]=1
            odd++
        }
        else{
            freq[s[i]]++
            if(freq[s[i]]%2){
                odd++
            }
            else odd--
        }       
    }
    if(odd<=1)return s.length
    let result=1
    for (let l = s.length-1; l>=0; l--) {
        let o=odd
        for (let i = l; i <s.length; i++) {
            freq[s[i]]--

            if(freq[s[i]]%2){
                o++
            }   
            else{
                o--
            }             
        }
        if(o<=1){
            result=Math.max(result,l)
            return result
        }

        let start=0

        for (let e = l; e <s.length; e++) {

            freq[s[start]]--
              
            if(freq[s[start]]%2)
                o++
            else 
                o--

            freq[s[e]]++
 
            if(freq[s[e]]%2)
                o++
            else
                o--
            if(o<=1)return l
            start++
        }

        for (let i = 0; i <start; i++) {
            freq[s[i]]++
        }
    }
    return result
};// TLE 153/154


//Smarter Approach: Bitwise +Prefix XoR. BECAUSE MY STRING CONSISTS OF ONLY NUBMERS
// So essentially, there are only 11 possible states Im interested in
// 1000000000,010000000,....,000000001,000000000
// which mean that The only odd frequency seen so far is of the number i
//  0<=i<=9
// Prefix Xor part: 
// Well Every time i come across any new state, I save it as a key with the value being the index I first met that accumulative xor. Then, any time in the future, i come across the same state that means that inbetween value

var longestAwesome = function(s) {
    // freq starts with 0:0 because 9 0s is also a state and if I come across a 
    // 0 down the road, that means that the whole array up to index i is of the required type
    let freq={0:0}, result=-1, curr=0
    for (let i = 0; i < s.length; i++) {
       curr^= 1<<s[i]
       // Check if you have seen curr^0=curr before, because that would make the inbetween elements' xor = 000000000
       if(freq[curr]!==undefined)
            result=Math.max(result,i-freq[curr]+1)
       // Check all the other xors, because that would make the inbetween elements of the required type (10000,01000)
       for (let j = 0; j <10; j++) {
            let ele=1<<j
            if(freq[curr^ele]!==undefined)
                //i-freq[curr^ele] because on freq I saved the smallest index where I last met curr^ele
                result=Math.max(result,i-freq[curr^ele]+1)
       }
       if(freq[curr]===undefined)freq[curr]=i+1// +1 cos 0th place is for my 0 state
    }
 
    return result
};