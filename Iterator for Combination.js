// Design an Iterator class, which has:

// A constructor that takes a string characters of sorted distinct lowercase English letters and a number combinationLength as arguments.
// A function next() that returns the next combination of length combinationLength in lexicographical order.
// A function hasNext() that returns True if and only if there exists a next combination.

// CombinationIterator iterator = new CombinationIterator("abc", 2); // creates the iterator.

// iterator.next(); // returns "ab"
// iterator.hasNext(); // returns true
// iterator.next(); // returns "ac"
// iterator.hasNext(); // returns true
// iterator.next(); // returns "bc"
// iterator.hasNext(); // returns false
 

// Constraints:

// 1 <= combinationLength <= characters.length <= 15
// There will be at most 10^4 function calls per test.
// It's guaranteed that all calls of the function next are valid.




/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function(characters, combinationLength) {
    this.characters=characters

    this.n=this.characters.length
    this.options=[]

    for (let i = 0; i < 2**characters.length-1; i++) {
        let ones=0
        for (let j = 0; j <15; j++) {
            if(i&(1<<j))ones++
        }
        if(ones===combinationLength)this.options.push(i)
    }

  
    this.options=this.options.map(d=>{
        let res=''
        for (let i = 0; i < this.n; i++) {
            if(d&(1<<i))res+=''+this.characters[i]        
        }
        return res
    })

    this.options.sort()
    this.options.forEach(d=>
        console.log(d.toString(2)))
    this.idx=0
};



/**
 * @return {string}
 */
CombinationIterator.prototype.next = function() {
    return this.options[this.idx++]
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function() {
    return this.idx!=this.options.length
};

/** 
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

let att=new CombinationIterator(
    'abcdefg',2
)

//there is a dfs that generates all the combinations in O(n) by building up the string. BUT F THAT ATM