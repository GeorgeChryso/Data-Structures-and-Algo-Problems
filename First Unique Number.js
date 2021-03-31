// You have a queue of integers, you need to retrieve the first unique integer in the queue.

// Implement the FirstUnique class:

// FirstUnique(int[] nums) Initializes the object with the numbers in the queue.
// int showFirstUnique() returns the value of the first unique integer of the queue, and returns -1 if there is no such integer.
// void add(int value) insert value to the queue.






/**
 * @param {number[]} nums
 */
var FirstUnique = function(nums) {
    this.memo={}
    this.order=[...nums]
    this.order.forEach(d=>this.memo[d]=(this.memo[d]||0)+1)
};

/**
 * @return {number}
 */
FirstUnique.prototype.showFirstUnique = function() {
    while(this.order.length&&this.memo[this.order[0]]!==1)this.order.shift()
    return this.order.length?this.order[0]:-1
};

/** 
 * @param {number} value
 * @return {void}
 */
FirstUnique.prototype.add = function(value) {
    if(this.memo[value]===undefined)this.order.push(value)
    this.memo[value]=(this.memo[value]||0)+1
    
};

/** 
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */