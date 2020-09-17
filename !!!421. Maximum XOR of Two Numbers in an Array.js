// Given a non-empty array of numbers, a0, a1, a2, … , an-1, where 0 ≤ ai < 231.

// Find the maximum result of ai XOR aj, where 0 ≤ i, j < n.

// Could you do this in O(n) runtime?

// Example:

// Input: [3, 10, 5, 25, 2, 8]

// Output: 28

// Explanation: The maximum result is 5 ^ 25 = 28.



// So,what I'm gonna do instead, is incrementally build up the result, from the leftmost bit
// For each possible prefix, I can check whether it is obtainable in Linear Time
// Similar to checking if a Sum of two elements is available in linear time with memoizing the difference
// and then going over one more time for each element to check if ITS difference with the result exists on my memo.

// Similarly A^B=C <=> A=C^B
var findMaximumXOR = function(nums) {
    var result = 0;
    var mask = 0;
    
    for (let i = 31; i >= 0; i--) {//for each bit from the end

        //essentially 11...0000
        mask = mask | ( 1 << i); //helps me get the leftmost bits of my eles


        // create a set where u will store the prefixes
        // of your elements up to this bit
        const set = new Set(); 
        for (let ele of nums) 
            set.add(ele & mask);

        //bestcase is the result SO FAR with this bit on
        let bestcase = result | (1 << i); //aka the PREFIX which I need to determine whether It is possible


        // Bestcase^prefix=PRE2
        // Bestcase^prefix^prefix=PRE2^prefix
        // Bestcase=PRE2^prefix
        // which means that if i Already have PRE2,
        // then Bestcase XOR is attainable,
        for (let prefix of set) {
            if (set.has(bestcase ^ prefix)) {
                result = bestcase;
                break;
            }
        }
    }
    
    return result; 
};

console.log(findMaximumXOR(
    [3, 10, 5, 25, 2, 8]
))