// With respect to a given puzzle string, a word is valid if both the following conditions are satisfied:
// word contains the first letter of puzzle.
// For each letter in word, that letter is in puzzle.
// For example, if the puzzle is "abcdefg", then valid words are "faced", "cabbage", and "baggage"; while invalid words are "beefed" (doesn't include "a") and "based" (includes "s" which isn't in the puzzle).
// Return an array answer, where answer[i] is the number of words in the given word list words that are valid with respect to the puzzle puzzles[i].


// Constraints:

// 1 <= words.length <= 10^5
// 4 <= words[i].length <= 50
// 1 <= puzzles.length <= 10^4
// puzzles[i].length == 7
// words[i][j], puzzles[i][j] are English lowercase letters.
// Each puzzles[i] doesn't contain repeated characters.


//standard bit state compression solution, works but is slow
var findNumOfValidWords = function(words, puzzles) {
    //dictionaries for repeated words
    let dict={}
    let puzzledict={}
    let letters2bit=word=>{
        let final=0
        for (const letter of word) {
            final|=(1<<(letter.charCodeAt(0)-97))
        }
        return final
    }

    words=words.map(d=>{
        if(dict[d]!==undefined)return dict[d]
        dict[d]=letters2bit(d)
        return dict[d]
    })
    puzzles=puzzles.map(d=>{
        if(puzzledict[d]!==undefined)return puzzledict[d]
        puzzledict[d]=[d,letters2bit(d),1<<(d.charCodeAt(0)-97)]
        return puzzledict[d]
    })
    let resultdict={}
    return puzzles.map(([original,puzzle,firstlettermask])=>{
        if(resultdict[original]!==undefined)return resultdict[original]
        resultdict[original]= words.reduce((acc,word)=>acc+Number((puzzle&word)==word && ((firstlettermask&word)!==0)),0)
        return resultdict[original]
     }
    )
};

//intuition i dont need to scan the whole word's length, and can instead do It as I go
var findNumOfValidWords = function(words, puzzles) {
    let letters2bit=word=>{
        let final=0
        for (const letter of word) {
            final|=(1<<(letter.charCodeAt(0)-97))
        }
        return final
    }

   // words=words.map(d=>letters2bit(d))
    puzzles=puzzles.map(d=>[letters2bit(d),1<<(d.charCodeAt(0)-97)])

    return puzzles.map(([puzzle,firstlettermask])=>
                            words.reduce((acc,word)=>acc+(
                                ()=>{
                                    let flag1=true,flag2=false

                                    for (const letter of word) {
                                        let bitrepresentation=1<<(letter.charCodeAt(0)-97)
                                        if((bitrepresentation&puzzle)==0){
                                            flag1=false
                                            break}//thought this would make a difference,but tle
                                        if((bitrepresentation&firstlettermask)!=0)flag2=true
                                    }

                                    if(flag1&&flag2)return 1
                                    return 0
                            })()
                        ,0)
            )
};



var findNumOfValidWords = function(words, puzzles) {
   
    //dictionaries for repeated words
    let dict={}
    let puzzledict={}
    let letters2bit=word=>{
        let final=0
        for (const letter of word) {
            final|=(1<<(letter.charCodeAt(0)-97))
        }
        return final
    }

    words=words.map(d=>{
        if(dict[d]!==undefined)return dict[d]
        dict[d]=letters2bit(d)
        return dict[d]
    })
    //different bit representations of each word
    let diffwords=[...Object.values(dict)]


    let count=0
    for (let i = 0; i < puzzles.length &&count<=128; i++) {
        if(puzzledict[puzzles[i]]!==undefined){
            puzzledict[puzzles[i]]=[puzzles[i],letters2bit(puzzles[i]),1<<(puzzles[i].charCodeAt(0)-97)]
            count++
        }     
    }


    let resultdict={}

 
    return puzzles.map((paz)=>{
        if(resultdict[paz]!==undefined)return resultdict[paz]
        let [original,puzzle,firstlettermask]=puzzledict[paz]
        resultdict[paz]=diffwords.reduce((acc,word)=>acc+Number(((puzzle&word)==word )&& ((firstlettermask&word)!==0)),0)
        return resultdict[paz]
     }
    )
};