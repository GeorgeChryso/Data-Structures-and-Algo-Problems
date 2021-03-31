// Implement the StreamChecker class as follows:

// StreamChecker(words): Constructor, init the data structure with the given words.
// query(letter): returns true if and only if for some k >= 1, the last k characters queried (in order from oldest to newest, including this letter just queried) spell one of the words in the given list.



//create a trie
var Trie = function() {
    
    this.TrieNode=function(val){
        this.value=val
        this.children={}
        this.hasFollowing=false
        this.completeword=false
    }

    this.root=new this.TrieNode('')
};
Trie.prototype.insert = function(word) {
    let start=this.root
    let index=0
    while(index!=word.length){
        if( start.children[word[index]]===undefined){
            start.children[word[index]]=new this.TrieNode(start.value+word[index])
            start.children[word[index]].hasFollowing=true
        }
        start= start.children[word[index]]
        index++
    }
    start.completeword=true

};


var StreamChecker = function(words) {
    this.Trie=new Trie()
    //put every word in the trie
    // with following flags for every potential prefix
    for (const word of words) {
        this.Trie.insert(word)
    }
    this.candidatePointers=[]
};

/** 
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function(letter) {
    let pointer=this.Trie.root
    this.candidatePointers.push(pointer)
    let nextP=[]
    let flag=false
    for (let i = 0; i < this.candidatePointers.length; i++) {
        if(this.candidatePointers[i].children[letter]!==undefined&&this.candidatePointers[i].children[letter].hasFollowing==true){
            nextP.push(this.candidatePointers[i].children[letter])
            flag=flag||this.candidatePointers[i].children[letter].completeword
        }     
    }
    this.candidatePointers=nextP
    return flag
};

// for every letter, increment pointers on your trie until one of them has a following flag==false or a completeword flag==true. 


