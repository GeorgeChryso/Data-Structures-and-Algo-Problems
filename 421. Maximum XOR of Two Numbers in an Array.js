// Given a non-empty array of numbers, a0, a1, a2, … , an-1, where 0 ≤ ai < 231.

// Find the maximum result of ai XOR aj, where 0 ≤ i, j < n.

// Could you do this in O(n) runtime?

// Example:

// Input: [3, 10, 5, 25, 2, 8]

// Output: 28

// Explanation: The maximum result is 5 ^ 25 = 28.


// Greedy Method
// So,what I'm gonna do instead, is incrementally build up the result, from the leftmost bit rightwards.
// For each possible prefix, I can check whether it is obtainable in Linear Time
// Similar to checking if a Sum of two elements is available in linear time with memorizin the difference with their Targ,
// and then going over one more time for each element to check if ITS difference with the result exists on my memo.

// Similarly A^B=C <=> A=C^B
// Complexity O(n*nums[i].length(bits)), O(n) memory
var findMaximumXOR = function (nums) {
    var result = 0;
    var mask = 0;

    for (let i = 31; i >= 0; i--) {//for each bit from the end

        //essentially 11...0000
        mask = mask | (1 << i); //helps me get the leftmost bits of my eles

        //bestcase is the result SO FAR with this bit on
        let bestcase = result | (1 << i); //aka the PREFIX which I need to determine whether It is possible

        //Essentially, I need to determine whether two prefixes XOR up to the bestcase
        // If they do, then I should always choose these two numbers as the resulting XOR
        // The tactic I follow is two Loops that exploit the A^B=C <=> A=C^B property


        // create a set where u will store the prefixes
        // of your elements up to this bit
        const prefixes = new Set();
        for (let ele of nums)
            prefixes.add(ele & mask);


        // Bestcase^prefix=PRE2
        // Bestcase^prefix^prefix=PRE2^prefix
        // Bestcase=PRE2^prefix
        // which means that if i Already have PRE2,
        // then Bestcase XOR is attainable,
        for (let prefix of prefixes) {
            if (prefixes.has(bestcase ^ prefix)) { //searching for Bestcase
                result = bestcase;
                break;
            }
        }
    }

    return result;
};


// TRIE SOLUTION
var Trie = function () {

    this.TrieNode = function (val) {
        this.value = val
        this.children = {}
        this.hasFollowing = false
        this.completeword = false
    }

    this.root = new this.TrieNode('')
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let start = this.root
    let index = 0
    while (index != word.length) {
        if (start.children[word[index]] === undefined) {
            start.children[word[index]] = new this.TrieNode(start.value + word[index])
        }
        start = start.children[word[index]]
        index++
    }
    start.completeword = true
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let start = this.root
    let index = 0
    while (index != word.length) {
        if (!start.children[word[index]]) {
            return false
        }
        start = start.children[word[index]]
        index++
    }
    return start.completeword
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    let start = this.root
    let index = 0
    while (index != prefix.length) {
        if (!start.children[prefix[index]]) return false
        start = start.children[prefix[index]]
        index++
    }
    return true
};


// this needs a bit of tweaking, greedily picking the largest element is wrong. 
var findMaximumXOR = function (nums) {
    let trie = new Trie()
    nums = nums.map(d => {
        let x = d.toString(2),len=x.length
        for (let i = 0; i < 32 - len; i++)
            x = '0'+ x
        return x
    })

    for (const ele of nums)
        trie.insert(ele)

    let node = trie.root
    while (!node.completeword)
        if (node.children['1']!==undefined )
            node = node.children['1']
        else
            node = node.children['0']
    

    let biggestNum = node.value
    node = trie.root
    let i = 0
    while (!node.completeword) {
        if(biggestNum[i]^ 1 == 1)
            if(node.children['1'] !==undefined )
                node = node.children[ '1']
            else
                node = node.children[ '0']
        else 
            if(node.children['0'] !==undefined )
                node = node.children[ '0']
            else 
                node = node.children[ '1']
        i++
    }
    
    console.log(parseInt(biggestNum,2))
    console.log(parseInt(node.value,2))
    return parseInt(biggestNum,2) ^  parseInt(node.value,2);
};

console.log(findMaximumXOR(
    [8,10,2]
))