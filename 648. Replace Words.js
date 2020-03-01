// In English, we have a concept called root, which can be followed by some other words to form another longer word - let's call this word successor. For example, the root an, followed by other, which can form another word another.

// Now, given a dictionary consisting of many roots and a sentence. You need to replace all the successor in the sentence with the root forming it. If a successor has many roots can form it, replace it with the root with the shortest length.

// You need to output the sentence after the replacement.

//using a trie
class Trie{
    constructor(){
        this.root=new TrieNode('',true)
    }
    
   
    insert=function(word){
        let start=this.root
        for (const letter of word) {
            if(start.children[letter]===undefined){
                start.children[letter]=new TrieNode(start.value+letter)
            }
            start=start.children[letter]
        }
        start.complete=true

    }
    parsez=function(word){
        let start=this.root
        for (const letter of word) {
            if(start.children[letter]==undefined)return undefined
            start=start.children[letter]
        }
        return start
    }

    parse=function(word){
        let start=this.root
        if(start.children[word[0]]===undefined)return word
        let attempt=''
        for (let i = 0; i < word.length; i++) {
            attempt+=word[i]
            let parsed=this.parsez(attempt)
            if(parsed!==undefined&&parsed.complete)return parsed.value
        }
          
        return word
    }
}

class TrieNode{
    constructor(val,compl=false){
        this.value=val
        this.complete=compl
        this.children={}
    }
}

var replaceWords = function(dict, sentence) {
    let tryMe=new Trie
    dict.forEach(d=>tryMe.insert(d))
    return sentence.split(' ').map(d=>tryMe.parse(d)).join(' ')
};


console.log(replaceWords(
    ["cat", "bat", "rat"],"the cattle was rattled by the battery"
))


//using regexp
var replaceWords = function(dict, sentence) {
    let re = new RegExp(`\\b(${dict.join('|')}).*?\\b`, 'g')
    return sentence.replace(re, "$1");
};