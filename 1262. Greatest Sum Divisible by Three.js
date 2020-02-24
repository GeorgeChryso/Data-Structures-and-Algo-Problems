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
            let sum = num + pre[j];// max sum i can achieve using the curr element
            let k = sum % 3; 
            cur[k] = Math.max(cur[k], sum);
        }
        console.log(cur)
    }
    return cur[0];
};

// var maxSumDivThree = (A) => {
//     //cur[i] is the highest sum i can achieve such that sum%3=i
//     let item=0


//     for (let num of A) {
//         let pre =item // implicitly set current bucket to max of itself and previous bucket
//         let sum = num + pre;// max sum i can achieve using the curr element
//         let k = sum % 3; 
//         if(k==0)item = Math.max(item, sum);
//     }
//     return item
// };
console.log(
    maxSumDivThree(
      [3,6,5,1,8]//18
    )
)