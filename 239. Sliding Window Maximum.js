// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

const maxSlidingWindow = (nums, k) => {

    // Store the max values for each window position
    let maxes = [];
    // Queue to determine maxes
    let q = [];
  
    // Iterate through all window positions
    for (let last = 0, first = 1 - k; last < nums.length; last++, first++) {
      // Make sure q will stay in descending order after adding new window el
      while (q.length && nums[last] > q[q.length - 1]) { q.pop(); }
      // Add new window el to q, gauranteed to be smallest in q
      q.push(nums[last]);
      // If window isn't fully overlapping nums, don't yet know the first max
      if (first < 0) { continue; }
      // Add q[0] to output, since it's current largest el in window
      maxes.push(q[0]);
      // If biggest el in q is about to exit window, remove it from q
      if (nums[first] === q[0]) { q.shift(); }
    }
  
    return maxes;
      
  }

