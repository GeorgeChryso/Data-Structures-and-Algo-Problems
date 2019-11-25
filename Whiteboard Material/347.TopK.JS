var topKFrequent = function(nums, k) {
    var memo={}
    nums.forEach(d=>memo[d]=(memo[d]||0)+1)
    return Object.keys(memo).sort((a,b)=>memo[b]-memo[a]).slice(0,k)
};

console.log(topKFrequent(
    [1,1,1,2,2,3],2
))