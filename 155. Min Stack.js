
var MinStack = function() {
    this.q=[];
    this.min=Infinity
};


MinStack.prototype.push = function(x) {
 
    this.q.push(x)
    this.min=Math.min(this.min,x)
};


MinStack.prototype.pop = function() {
    this.q.pop()
};


MinStack.prototype.top = function() {
    return this.q[this.q.length-1]
};


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


 //Optimzied with a use of a log
var MinStack = function() {
    this.q=[];
    this.min=[Infinity]
};
MinStack.prototype.push = function(x) {
 
    this.q.push(x)
    this.min.push(Math.min(this.min[this.min.length-1],x))
};
MinStack.prototype.pop = function() {
    this.q.pop()
    this.min.pop()
};

MinStack.prototype.top = function() {
    return this.q[this.q.length-1]
};

MinStack.prototype.getMin = function() {
    //return Math.min(...this.q)
    return this.min[this.min.length-1]
};

