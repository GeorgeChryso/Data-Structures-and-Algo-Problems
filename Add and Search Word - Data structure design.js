// Design a data structure that supports the following two operations:

// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

// Example:

// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// Note:
// You may assume that all words are consist of lowercase letters a-z.

//sort of a trie

var WordDictionary = function() {
    this.trie = {
        next: {
            futureword: true,
            actualword: false
        }
    };

    for (let i = 97; i < 123; i++) {
        let letter = String.fromCharCode(i);
        this.trie.next[letter] = {};
        this.trie.next[letter].futureword = false;
        this.trie.next[letter].next = {};
        this.trie.next[letter].actualword = false;
    }
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let pointer = this.trie;
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (pointer.next[letter]) {
            pointer.next[letter].futureword = true;
        } else {
            pointer.next[letter] = {};
            pointer.next[letter].futureword = true;
            pointer.next[letter].actualword = false;
            pointer.next[letter].next = {};
        }
        if (i === word.length - 1) pointer.next[letter].actualword = true;
        pointer = pointer.next[letter];
    }
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    let recursion = (node, i) => {
        if (!node.futureword) return false;
        if (node.actualword && (i == word.length)) return true;

        let letter = word[i];// to be searched ON node
        console.log(node,letter,i)

        if (letter === '.') {
            let flag=false
            for (let j = 97; j < 123; j++) {
                letter = String.fromCharCode(j);
                if(node.next[letter])flag=flag||recursion(node.next[letter],i+1)
            }
            return flag
        } else {
            return node.next[letter]!==undefined&&recursion(node.next[letter], i + 1)
        }
    };

    return recursion(this.trie.next, 0);
};




var Trie = function() {
    
    this.TrieNode=function(val){
        this.value=val
        this.children={}
        this.completeword=false
    }

    this.root=new this.TrieNode('')
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.addWord = function(word) {
    let start=this.root
    let index=0
    while(index!=word.length){
        if( start.children[word[index]]===undefined){
            start.children[word[index]]=new this.TrieNode(start.value+word[index])
        }
        start= start.children[word[index]]
        index++
    }
    start.completeword=true

};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let start=this.root
    let index=0
    while(index!=word.length){
        if(!start.children[word[index]] ){
            return false
        }
        start= start.children[word[index]]
        index++
    }
    return start.completeword
};


let dic = new Trie();
dic.addWord("bad")
dic.addWord("dad")
dic.addWord("mad")
// console.log(dic.search("pad")) //-> false
// console.log(dic.search("bad")) //-> true
console.log(dic.search(".ad"))// -> true
console.log(dic.search("b..")) //-> true


/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.trie = {};
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let root = this.trie;
    for (let i=0;i<word.length;i++) {
        if (root[word[i]]==null) root[word[i]] = {};
        root = root[word[i]];
    }
    root.isEnd = true;  
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    return this.dfs(word, 0, this.trie);
};

WordDictionary.prototype.dfs = function(word, index, node) {
    if (index == word.length) return node.isEnd == true;
    
    if (word[index] == '.') {
        for (let key in node) {
            if (this.dfs(word, index + 1, node[key])) return true;
        }
        
    } else {
        if (node[word[index]]!=null) {
            return this.dfs(word, index + 1, node[word[index]]);
        }
    }
    return false;
}


/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */