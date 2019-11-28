/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.q=[];
    this.min=Infinity
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
 
    this.q.push(x)
    this.min=Math.min(this.min,x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.q.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.q[this.q.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return Math.min(...this.q)
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */