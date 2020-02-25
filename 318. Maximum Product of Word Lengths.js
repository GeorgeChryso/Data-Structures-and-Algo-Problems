
// Given a string array words, find the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. You may assume that each word will contain only lower case letters. If no such two words exist, return 0.

//'a'=97
//bitmask solution
var maxProduct = function(words) {
    //bitwise memo of a word having a letter represented by a set bit
    // also keeping the length for later use
    words=words.map(d=>{
        let lettersmemo=0
        for (let i = 0; i < d.length; i++) {
            lettersmemo|=(1<<(d.charCodeAt(i)-97))          
        }

        return [lettersmemo,d.length]
    })
    let result=0

    //try each i with j 
    for (let i = 0; i < words.length; i++) {
        for (let j = i+1; j < words.length; j++) {
            //if they have no common letters, consider their lengths' multiplication
            if((words[i][0]&words[j][0])===0)result=Math.max(words[i][1]*words[j][1],result)
        }
    }
    return result
};