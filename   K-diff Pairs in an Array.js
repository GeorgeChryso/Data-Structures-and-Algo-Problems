// Given an array of integers nums and an integer k, return the number of unique k-diff pairs in the array.

// A k-diff pair is an integer pair (nums[i], nums[j]), where the following are true:

// 0 <= i, j < nums.length
// i != j
// a <= b
// b - a == k


// Example 1:

// Input: nums = [3,1,4,1,5], k = 2
// Output: 2
// Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
// Although we have two 1s in the input, we should only return the number of unique pairs.
// Example 2:

// Input: nums = [1,2,3,4,5], k = 1
// Output: 4
// Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
// Example 3:

// Input: nums = [1,3,1,5,4], k = 0
// Output: 1
// Explanation: There is one 0-diff pair in the array, (1, 1).
// Example 4:

// Input: nums = [1,2,4,4,3,3,0,9,2,3], k = 3
// Output: 2
// Example 5:

// Input: nums = [-1,-2,-3], k = 1
// Output: 2


// Constraints:

// 1 <= nums.length <= 104
// -107 <= nums[i] <= 107
// 0 <= k <= 107

//naive O(n**2*maxlen), O(n)
var findPairs = function (nums, k) {
    let memo = new Set(), result = 0, n = nums.length
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(nums[i] - nums[j]) == k) {
                let min = Math.min(nums[i], nums[j]),
                    max = Math.max(nums[i], nums[j])
                if (!memo.has(min + '*!' + max))
                    result++
                memo.add(min + '*!' + max)
            }
        }
    }
    return result
};



// Ugly O(n) O(n), save a hash memo
var findPairs = function (nums, k) {
    let memo = {},mem=new Set(nums),result = 0, n = nums.length

    if(k==0){
        for (let i = 0; i < n; i++) {
            if(memo[nums[i]]==undefined){
                memo[nums[i]]=false
                continue
            }
            if(memo[nums[i]]==true)
                continue

            memo[nums[i]]=true
            result++
        }
        return result
    }
    let base=123,mod=1e9+9
    for (let i = 0; i < n; i++) {
        let curr = nums[i], hi = nums[i] + k,lo = nums[i] - k,
            s1=lo*base**2+curr*base**3,s2=curr*base**2+hi*base**3
        s1%=mod
        s2%=mod
        if (memo[s2] !== undefined) {
            if (memo[s2] == false&&mem.has(hi)) {
                memo[s2] = true
                result++
            }
        }
        else 
            memo[s2] = false
        
        if (memo[s1] !== undefined) {
            if (memo[s1] == false&&mem.has(lo)) {
                memo[s1] = true
                result++
            }
        }
        else 
            memo[s1] = false
    }
    return result
};


//cleaner
var findPairs = function(nums, k) {
    if (k < 0) 
        return 0;   
        
    //removes duplicates cos they re reduntant when k !==0
    if (k > 0)
        nums = Array.from(new Set(nums)); 
    let freq = {}, res = 0;
    for (let num of nums) {
        if (freq[num+k]!==undefined && freq[num+k]=== 1) 
            res++;
        if (freq[num-k]!==undefined && freq[num-k]=== 1 && k!=0) 
            res++;
        freq[num]=(freq[num]||0) +1
    }
    return res;
};
console.log(
    findPairs(
        [1,3,1,5,4],
        0
    )
)