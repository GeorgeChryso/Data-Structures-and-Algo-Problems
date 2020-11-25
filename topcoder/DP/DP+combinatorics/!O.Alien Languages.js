
/*

    For the i-th letter of an n-letter alphabet

    if(2*i> n)
        the i-th letter can be the last letter of a word,
         or is followed by any letter, including itself
    if(2*i <= n)
        the i-th letter can not be the last letter of a word and can ONLY be followed 
        by the j-th letter if-f j>=2i
*/



// n is the number of letters in the alphabet
// m is the length of its words
//https://www.hackerrank.com/challenges/alien-languages/editorial
// No courage, for now
function alienLanguages(n, m) {
    let mod=1e8+7
    
    

    return result%mod
}


let tests=[
    [1,3],
    [2,3],
    [3,2]
]

//output 1  3  6

console.log(tests.map(([a,b])=>alienLanguages(a,b)))