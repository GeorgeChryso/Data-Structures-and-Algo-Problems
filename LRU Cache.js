// Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

// The cache is initialized with a positive capacity.


/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache={}
    this.maxCapacity=capacity
    this.time=1000
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.cache[key]===undefined){
        this.cache[key]=undefined
        return -1   
    }
    
    if(this.cache[key][1]>this.time+this.maxCapacity){
        this.cache[key]=undefined
        return -1   
    }
    this.cache[key][1]=this.time
    return this.cache[key][0]
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.cache[key]!==undefined){
        if(this.cache[key][1]>this.time+this.maxCapacity){
            this.cache[key]=[value,this.time-1]
            this.time--
        }
        else{
            this.cache[key]=[value,this.time]
        }
        return
    }
    this.cache[key]=[value,this.time-1]
    this.time--
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */



var LRUCache = function(capacity) {
    this.cache={}
    this.capacity=capacity
    this.stack=[]
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    
    let result=-1
    let temp=[]
    
    for (let i = 0; i <this.stack.length; i++) {
        if(temp.length<this.capacity){
            if(this.stack[i][0]==key)result==-1?result=this.stack[i][1]:null
            else{
                temp.push(this.stack[i])
            }
        }   
        else break
    }
    this.stack=temp
    if(result!=-1)this.stack.unshift([key,result])
    return result
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let temp=[]
    
    let i=0

    while(i<this.stack.length&&i<this.capacity){
        if(this.stack[i][0]!==key)temp.push(this.stack[i])
        i++
    }
    this.stack=temp
    this.stack.unshift([key,value])
};
