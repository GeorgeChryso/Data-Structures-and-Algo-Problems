// Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

// The update(i, val) function modifies nums by updating the element at index i to val.

//prefix sum solution
var NumArray = function(nums) {
    this.nums=nums
    this.prefixSum=[0]
    let sum=0
    for (let i = 0; i < nums.length; i++) {
        sum+=nums[i]
        this.prefixSum.push(sum)        
    }

};

/** 
 * @param {number} i 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(k, val) {
    for (let i = k+1; i < this.prefixSum.length; i++) {
        this.prefixSum[i]+=val-this.nums[k]
    }
    this.nums[k]=val
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    return this.prefixSum[j+1]-this.prefixSum[i]
};

/// segment tree todo