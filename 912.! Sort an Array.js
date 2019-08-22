'use strict'

var sortArray = function(nums) {
    return  nums.sort((a,b)=>a-b)
  };

var sortArray = function(nums) {
   
 
};

function merge(left, right) {
	const result = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	return result.concat(...left, ...right);
}

var sortArray = function(nums) {
	if (nums.length < 2) {
		return nums;
	} else {
		const m = Math.floor(nums.length / 2);
		const left = sortArray(nums.slice(0, m));
		const right = sortArray(nums.slice(m));
		return merge(left, right);
	}
};

// Read up on that recursion