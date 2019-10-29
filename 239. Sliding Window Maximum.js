// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

function maxSlidingWindow(nums, k) {
    const res = [];
    const q = [];
  
    for (let i = 0; i < nums.length; i++) {
      while (q.length - 1 >= 0 && nums[i] > q[q.length - 1]) q.pop();
      q.push(nums[i]);
  
      // When i + 1 - k >= 0, the window is fully overlapping nums
      const j = i + 1 - k;
      if (j >= 0) {
        res.push(q[0]);
        if (nums[j] === q[0]) q.shift();  // If the biggest element in q is about to exit window, remove it from q
      }
    }
    return res;
  }


  var maxSlidingWindow = function(nums, k) {
    if (!nums.length) return [];
    const findMaxWithIndex = (start, end) => {
        if (start === end) {
            return [nums[start], start];
        } else if (start > end) {
            return [];
        }
        
        let max = [nums[start], start];
        
        for (let i = start + 1; i <= end; i++) {
            max = nums[i] > max[0] ? [nums[i], i] : max;
        }
        
        return max;
    };
    
    let start = 0;
    let end = k - 1;
    let max = null;
    let maxIndex = null;
    let result = [];
    
    while (end < nums.length) {
        if (max === null || start > maxIndex) {
            const newMax = findMaxWithIndex(start, end);
            max = newMax[0];
            maxIndex = newMax[1];
        } else if (nums[end] > max) {
            max = nums[end];
            maxIndex = end;
        }
        
        start++;
        end++;
        result.push(max);
    }
    
    return result;
};