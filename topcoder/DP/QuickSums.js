// Given a string of digits, find the minimum number of additions required for the string to equal some target number. Each addition is the equivalent of inserting a plus sign somewhere into the string of digits. After all plus signs are inserted, evaluate the sum as usual. For example, consider the string "12" (quotes for clarity). With zero additions, we can achieve the number 12. If we insert one plus sign into the string, we get "1+2", which evaluates to 3. So, in that case, given "12", a minimum of 1 addition is required to get the number 3. As another example, consider "303" and a target sum of 6. The best strategy is not "3+0+3", but "3+03". You can do this because leading zeros do not change the result.
// Write a class QuickSums that contains the method minSums, which takes a String numbers and an int sum. The method should calculate and return the minimum number of additions required to create an expression from numbers that evaluates to sum. If this is impossible, return -1.

let minSums = (S, target) => {
    let n = S.length,
        dp = [...Array(n + 1)].map(d =>[...Array(target + 1)].map(d => Infinity));
    //dp[i][k]: min cut needed on S[:i-1] to reach sum=k
    //basecases
    dp[0][0] = 0; // I can reach 0 with the first 0 elements with 0 cuts
    let curr=''
    for (let i = 0;i<n; i++) {
        curr+=S[i]
        dp[i+1][Number.parseInt(curr)]=0 //i can reach every number up to S[:i] with 0 cuts
    }

    for (let i = 1; i <= n; i++) 
        for (let sum = 0; sum <= target; sum++) 
            //essentially try making a split on j and trying best[:j]+sum[j+1:i] 
            for (let j = i - 1,s=0; j >= 0; j--) {
                s += 10**(i-j-1)*Number(S[j]); //recreate the number online
                if(sum>=s)dp[i][sum] = Math.min(dp[j][sum - s] + 1, dp[i][sum]);
            }
        
    

    return dp[n][target]===Infinity?-1:dp[n][target];
};

let tests = [
    ['99999', 45], //4
    ['1110', 3], //3
    ['0123456789', 45], //8
    ['99999', 100], //-1
    ['382834', 100], //2
    ['9230560001', 71], //4
    ['000000000',0],//0
    ["1583",161],//1
    ["26007",15]//2
];

tests.forEach(([s, t]) => console.log(minSums(s, t)));
