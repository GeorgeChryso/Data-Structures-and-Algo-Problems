// ou have an initial power of P, an initial score of 0, and a bag of tokens where tokens[i] is the value of the ith token (0-indexed).

// Your goal is to maximize your total score by potentially playing each token in one of two ways:

// If your current power is at least tokens[i], you may play the ith token face up, losing tokens[i] power and gaining 1 score.
// If your current score is at least 1, you may play the ith token face down, gaining tokens[i] power and losing 1 score.
// Each token may be played at most once and in any order. You do not have to play all the tokens.

// Return the largest possible score you can achieve after playing any number of tokens.

 

// Example 1:

// Input: tokens = [100], P = 50
// Output: 0
// Explanation: Playing the only token in the bag is impossible because you either have too little power or too little score.
// Example 2:

// Input: tokens = [100,200], P = 150
// Output: 1
// Explanation: Play the 0th token (100) face up, your power becomes 50 and score becomes 1.
// There is no need to play the 1st token since you cannot play it face up to add to your score.
// Example 3:

// Input: tokens = [100,200,300,400], P = 200
// Output: 2
// Explanation: Play the tokens in this order to get a score of 2:
// 1. Play the 0th token (100) face up, your power becomes 100 and score becomes 1.
// 2. Play the 3rd token (400) face down, your power becomes 500 and score becomes 0.
// 3. Play the 1st token (200) face up, your power becomes 300 and score becomes 1.
// 4. Play the 2nd token (300) face up, your power becomes 0 and score becomes 2.
 

// Constraints:

// 0 <= tokens.length <= 1000
// 0 <= tokens[i], P < 104






var bagOfTokensScore = function(tokens, P) {
    tokens.sort((a,b)=>a-b)
    let prefixSum=[0],n=tokens.length,leftpurchases=0
    for (let i = 0; i <n; i++) 
        prefixSum.push(prefixSum[prefixSum.length-1]+tokens[i])
    if(tokens[0]>P)
        return 0
    //2 pointers logic
    // if [i,j] is boughtable aka prefixsum[j]-prefixsum[i]<=P, score+=j-i+1
    // start [i=0,j=n-1]
    // it's gonna be my best score
    // If i cant buy that, j--
    // If i still cant buy [i,j]
    // buy i, buy j+1, and try [i+1,j-1]    
    let i=0,j=n-1
    while(i<=j)
        if(prefixSum[j+1]-prefixSum[i]<=P)
            return j-i+1
        else{
            //consider buying [i,j-1] with this power instead
            if(prefixSum[j]-prefixSum[i]<=P)
                return j-i

            //progress to [i+1,j-1]
            // by buying the first element if possible +1 coin 
            // and then getting the n-ths power for -1 coin
            if(P>=tokens[i])
                P=P-tokens[i]+tokens[j]
            else
                return leftpurchases 
            
            i++
            j-- 
            leftpurchases++ //left purchases
        }
    
    return 0
};

// O(N) O(1) 
// keep a balance for score
// buy from lowest and sell for highest
var bagOfTokensScore = function(tokens, P) {
    tokens.sort((a,b)=>a-b)
    if(tokens[0]>P)
        return 0
  
    let n=tokens.length,i=0,j=n-1,score=0,maxscore=0
    while(i<=j){
        if(score<0)
            break
        //buy the cheapest
        if(P>=tokens[i]){
            P-=tokens[i]
            score++
            i++
        }
        //cant buy the cheapest? 
        //you can always just gain the last index's power
        // you already paid for the first items up to i
        else{
            P=P+tokens[j]
            score--
            j--
        }   
        maxscore=Math.max(score,maxscore)
    }
    return maxscore
};
console.log(bagOfTokensScore(
    [1,1,1],
    1
))