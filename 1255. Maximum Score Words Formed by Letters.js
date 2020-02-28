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
    
 
    words=words.map(word=>{
        let dict=[...Array(26)].fill(0)
        for (let i = 0; i < word.length; i++) {
           dict[word[i].charCodeAt(0)-97]++
            
        }
        return dict
         }
    )
    let available=[...Array(26)].fill(0)
    letters.forEach(d=>available[d.charCodeAt(0)-97]++)

    
    let max=-1
    for (let i = 0; i <=(2**words.length)-1; i++) {
        let mask=i//set 
        let remaining =[...available]
        let tempScore=0
        let index=0
        let flag=true

        while(mask!=0){
            if(mask&1){


                for (let j = 0; j < words[index].length&&flag; j++) {
                    remaining[j]-=words[index][j]     
                    if(remaining[j]<0)flag=false      
                    tempScore+=(score[j]*words[index][j])
                }
                if(flag==false)break
            }
            index++
            mask>>>=1
        }
        if(flag)max=Math.max(max,tempScore)
    }

    return max

    // a mask of 14(or words.length) bits,1 for choice and 0 for not choice that would be [0,2**14-1]
    // 

};


console.log(maxScoreWords(
    ["dog","cat","dad","good"], ["a","a","c","d","d","d","g","o","o"], [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
))