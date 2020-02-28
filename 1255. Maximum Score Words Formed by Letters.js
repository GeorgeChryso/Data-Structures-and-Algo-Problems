// Given a list of words, list of  single letters (might be repeating) and score of every character.

// Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).

// It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.

// Constraints:

// 1 <= words.length <= 14
// 1 <= words[i].length <= 15
// 1 <= letters.length <= 100
// letters[i].length == 1
// score.length == 26
// 0 <= score[i] <= 10
// words[i], letters[i] contains only lower case English letters.


// Hint: given a smal lwords.length u can iterate for every possible set of words
// (2^n)
var maxScoreWords = function(words, letters, score) {
    
    // map each word to a 26 element array 
    // that contains the frequency of each letter from a-z
    words=words.map(word=>{
        let dict=[...Array(26)].fill(0)
        for (let i = 0; i < word.length; i++) {
           dict[word[i].charCodeAt(0)-97]++
        }
        return dict
        }
    )

    // the score of each word
    let wordsScore=words.map(d=>d.reduce((acc,curr,i)=>acc+curr*score[i],0))

    let available=[...Array(26)].fill(0)
    // map the letters array to a 26 element array
    // with the number of available elements from a-z
    letters.forEach(d=>available[d.charCodeAt(0)-97]++)
    // the maximum score i can get from using every available word
    let maxScore=letters.reduce((acc,a,i)=>acc+a*score[i],0)

    let max=-1
    // I consider every possible combination of 1s and zeroes of length 
    // words.length, that would be 2**words.length
    // a mask of 14(or words.length) bits,1 for choice and 0 for not choice that would be [0,2**14-1]
    // So I consider every possible combination which is 2**n things
    for (let i = 0; i <=(2**words.length)-1; i++) {
        let mask=i//set selection mask
        let remaining =[...available]
        let tempScore=0
        let index=0 // the index of the word being chosen or not 
        let flag=true //this flag will terminate when an invalid selection is being mada, aka when a word has more letters than the remaining
        
        // ok I do this on order to consider whether I can avoid 
        // examining the valididy of a set choice, If it yields me 
        // a sum less than my current max,  I dont have to examine 
        // every word of the set
        let attempt=i
        let index2=0
        let tempu=0 //the total score of my set's choice
        while(attempt){
            if(attempt&1)tempu+=wordsScore[index2]
            attempt>>>=1
            index2++
        }
        if(tempu<=max||tempu>maxScore)continue


        // count the score of the elements in the mask
        while(mask!=0){
            if(mask&1){
                //check the validity of a choice,
                for (let j = 0; j < words[index].length&&flag; j++) {
                    remaining[j]-=words[index][j]     
                    if(remaining[j]<0)flag=false //the flag is false when an invalid choice is made
                    tempScore+=(score[j]*words[index][j])
                }
                if(flag==false)break
            }
            index++ // the index of the word being chosen or not 
            mask>>>=1
        }
        if(flag){
            max=Math.max(max,tempScore)
            if(max==maxScore)return max
        }
    }

    return max

};


console.log(maxScoreWords(
    ["dog","cat","dad","good"], ["a","a","c","d","d","d","g","o","o"], [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
))