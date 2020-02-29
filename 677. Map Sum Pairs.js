// Implement a MapSum class with insert, and sum methods.

// For the method insert, you'll be given a pair of (string, integer). The string represents the key and the integer represents the value. If the key already existed, then the original key-value pair will be overridden to the new one.

// For the method sum, you'll be given a string representing the prefix, and you need to return the sum of all the pairs' value whose key starts with the prefix.


// The solution is using a trie for fast access to prefixes, 

/**
 * Initialize your data structure here.
 */
var MapSum = function() {
    this.TrieNode=function(val,comple=false,given=null){
        this.val=val
        this.complete=comple
        this.children={}
        this.givenval=given
    }
    this.root=new this.TrieNode('',true)    

};

MapSum.prototype.traverse=function(word){
    let start=this.root
    for (const letter of word) {
        if(start.children[letter]===undefined){
            start.children[letter]=new this.TrieNode(letter)
        }
        start=start.children[letter]
    }
    return start
}

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    let start=this.traverse(key)
    start.givenval=val
    start.complete=true
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    let start=this.traverse(prefix)
    //bfs
    let q=[start]
    let sum=0
    while(q.length){
        let temp=[]
        for (const node of q) {
            if(node.complete)sum+=node.givenval
            if(Object.keys(node.children).length!==0){
                for (const child in node.children) {
                    temp.push(node.children[child])
                }
            }
        }
        q=temp
    }
    return sum
};

/** 
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

 let obj=new MapSum()
 obj.insert('apple',3)
