// Given an array nums of integers, we need to find the maximum possible sum of elements of the array such that it is divisible by three.



//intuition : similar to 1363
// A number is divisible by 3 if the sum of its elements is divisible by 3

// through knapsack I can find which sums are possible. 
// (target sum)
// then I  can see if the possible sums are divisible by 3 and I will take the biggest of them
var maxSumDivThree = function(nums) {
    //nums.sort((a,b)=>a-b)
    let total=nums.reduce((a,b)=>a+b)
    if(total%3==0)return total

    //if 1 is remainder, i need to remove numbers that add up to k
    // such that k%3==1 (1,4,6,7,...,total)

    //but instead i can  just do knapsack for all the possible sums and be done with it
    //base case (sum=0 with 0 elements)
    let dp=1n<<BigInt(total) //update, if i place the total here bad things happen (TLE)when i get a big number,instead i m gonna attempt something else

    for (const weight of nums) {
        dp|=(dp>>BigInt(weight))
    }

    while(dp!=0){
        
        if(total%3==0&&(dp&1n))return total
        dp>>=1n
        total--
    }
    return 0
};

var maxSumDivThree = function(nums) {
    nums.sort((a,b)=>a-b)


    let total=nums.reduce((a,b)=>a+b)
    if(total%3==0)return total

    let remainder=total%3

    let target=0
    let count=0
    for (let i = 0; i < nums.length; i++) {
        if(nums[i]%3===remainder){
            count=i+1
            target=nums[i]
        }
        
    }

    //knapsack
    let dp=1n<<BigInt(target)
    for (let i = 0; i < count; i++) {
        dp|=(dp>>BigInt(nums[i]))
    }



    //find the first possible sum with the same remainder
    let l=1
    while(l<target){
       
        q=(1n<<BigInt(target-l))
  
        if(((dp&q)!==0n)&&((l%3)===remainder)){

            return Math.max(total-l,total-target)
        }
        l++
    }

    //got here means there is no possible sum less than my total
    if(target!=0)return total-target

    return 0
    
};

var maxSumDivThree = function(nums) {
    let total=nums.reduce((a,b)=>a+b)
    if(total%3==0)return total
    let remainder=total%3

    let target=Infinity
    for (let i = 0; i < nums.length; i++) {
        if((nums[i]%3)==remainder &&nums[i]<target){
            target=nums[i]
        }
        
    }

    //bitwise truth knapsack
    let dp=1n<<BigInt(target)
    for (let i = 0; i < nums.length; i++) {
        dp|=(dp>>BigInt(nums[i]))
    }


    //find the first (nonzero) possible sum with the same remainder
    let l=1
    while(l<target){
       
        q=(1n<<BigInt(target-l))
  
        if(((dp&q)!==0n)&&((l%3)===remainder)){

            return Math.max(total-l,total-target)
        }
        l++
    }

    //got here means there is no possible sum less than my total
    if(target!=0)return total-target

    return 0
    
};

var maxSumDivThree = (A) => {
    //cur[i] is the highest sum i can achieve such that sum%3=i
    let cur = [0,0,0];


    for (let num of A) {
        let pre = [...cur]; // implicitly set current bucket to max of itself and previous bucket
        for (let j=0; j < 3; ++j) {
            let sum = num + cur[j];// max sum i can achieve using the curr element and curr bucket
            let k = sum % 3; 
            pre[k] = Math.max(pre[k], sum);
        }
        cur=pre
        console.log(cur)

    }
    return cur[0];
};
console.log(maxSumDivThree(
    [3,1,5]
))
//generalization to Greatest sum divisible by K
var maxSumDivK = (A,K) => {
    //cur[i] is the highest sum i can achieve such that sum%K=i
    let cur = Array(A.length).fill(null).map(d=>0)

    //Ok , so, my end target is cur[0], after considering all the elements. 
    // But how does my array A affect cur[0]?
    // A)Well I can incremet curr[0] automatically if my Array's element is divisible by K
    // because if C%K==0, and Q%K==0 =>(Q+C)%K==0
    // B) But, I can also increase curr[0] by another sum that isnt equal to any of my Array's elements, but comes from their potential and selective sum.
    //  for example, if my K=3 and my Array=[3,1,5]
    // when i Examine 3, my curr=[3,0,0]
    // when I examine 1, my curr=[3,4=3+1,0]
    // but when I examine 5, my curr becomes [9,4,8]. Why?
    // because cur[0] was increased to 9=4+5, a sum which came from adding 5 to sum[1]
    
    //!!! So the second max comes from the current element I'm examining+one other element preexisting in the array. Why preexisting? Because If it's possible it'll be there as it must have %3 between 0,1 and 2
    
    for (let num of A) {
        let pre = [...cur]; // implicitly set current bucket to max of itself and previous bucket
        for (let j=0; j < K; ++j) {
            let sum = num + cur[j];// max sum i can achieve using the curr element and curr bucket
            let k = sum % K; 
            pre[k] = Math.max(pre[k], sum);
        }
        cur=pre
    }
    return cur[0];
};

console.log(
    maxSumDivThree(
      [3,6,5,1,8]//18
    )
)