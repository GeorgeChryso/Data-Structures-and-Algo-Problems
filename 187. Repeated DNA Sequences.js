// All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

// Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

// A,C,G,T
var findRepeatedDnaSequences = function(s) {
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
    let seen=new Set()
    let result={}
    let mask=2**20-1
    let start=1
    let memyy={
        'A':0,'C':1,'G':2,'T':3}
    for (let i = 0; i <10; i++) {
        start=(start<<2)|(memyy[s[i]])      
    }
    start&=mask
    seen.add(start)
    console.log(start.toString(2))

    for (let end = 10; end < s.length; end++) {
        start=((start<<2)&mask)
        start|=(s.charCodeAt(end)-65)
        if(seen.has(start))result[start]=true
        else seen.add(start)
    }
    console.log(result)
    return Object.keys(result).map(d=>tostr(d))
};
console.log(
    findRepeatedDnaSequences(
        "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
    )
)