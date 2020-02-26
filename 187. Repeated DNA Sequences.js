// All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

// Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

// A,C,G,T
// intuition: 
// I can reperesent each of my letters with 4 states, 00, 01,10,11
// so every 10 letter combination will become a sequence of 20 bits
// slide the window of 10 letters, create the appropriate bit combination, store in a set and If I come across a seen element, add it to the result object
var findRepeatedDnaSequences = function(s) {
    //gets a number, reads its first 20 bits and converts it to string
    let tostr=number=>{
            let final=''
            let times=0
            let memo= ['A','C','G','T']
            while(times<10){
                final=memo[number&3]+final
                number>>>=2
                times++
            }
            return final
        }

    //numbers (sequence of bits) seen so far
    let seen=new Set()

    //the result fro repeated numbers
    let result={}

    //this mask is the number that has the last 20 bits set and evertyhing else 0
    // This will be used during the sliding of the 10 letter window 
    // while examining further letters
    let mask=2**20-1

   
    // this maps each character to its bit representation
    let memyy={'A':0,'C':1,'G':2,'T':3}

    //get the first 10 letters into my current (20 bits) 
    //and add the number to the seen
    let current=0
    for (let i = 0; i <10; i++) {
        current=(current<<2)|(memyy[s[i]])      
    }
    seen.add(current)

    //now slide the window to the right for each new letter
    for (let end = 10; end < s.length; end++) {
        //i shift 2 to the left to make space for the next letter, and 
        // i only take the first 20 bits of my newly created sequence by 
        // &ing it with my mask. Finally I OR with the bit representation of my current letter to add it to my result.
        current=((current<<2)&mask)|(memyy[s[end]])
        //if I ve seen the current, add it to the result
        if(seen.has(current))result[current]=true
        // else just addd it to the seen
        else seen.add(current)
    }
    //return the repeated sequences of bits, mapped to their string representation
    return Object.keys(result).map(d=>tostr(d))
};
console.log(
    findRepeatedDnaSequences(
        "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
    )
)