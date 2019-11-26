// Say you have an array for which the ith element is the price of a given stock on day i.

// If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

// Note that you cannot sell a stock before you buy one.


// essentially i  need to find the lowest shizzle before the highest price in order to maximize profit. If i come across a lower value than my highest,I need to start over
var maxProfit=A=>{
    var answer=0
    var low=Infinity
    var high=Infinity
    for (let i = 0; i < A.length; i++) {
            if (A[i]<low) {
              low=A[i]
              high =A[i]  
            }    
            else if( A[i]>high){
              high=A[i]
            }
            console.log(low,high)
        answer=Math.max(answer,high-low)
    }

    return answer
}

// All the straight forward solution should work, but if the interviewer twists the question slightly by giving the difference array of prices, Ex: for {1, 7, 4, 11}, if he gives {0, 6, -3, 7}, you might end up being confused.Here, the logic is to calculate the difference (maxCur += prices[i] - prices[i-1]) of the original array, and find a contiguous subarray giving maximum profit. If the difference falls below 0, reset it to zero.
// Kadane's algorithm
var maxProfit = function(A) {
    var maxCur=0
    var MaxSoFar=0

   
   for (let i = 1; i < A.length; i++) {
        maxCur+=(A[i]-A[i-1])
        maxCur=Math.max(0,maxCur)
        MaxSoFar=Math.max(MaxSoFar,maxCur)
    }


   return MaxSoFar


};
// Readability
var maxProfit = function(A) {
    var maxCur=0
    var MaxSoFar=0

    var CumSum=[0]
    for (let i = 1; i < A.length; i++) {
        CumSum[i]=A[i]-A[i-1]
    }

    // I will now find the maximum subarray sum of CumSum
    // so the question still remains DO I EXTEND OR DO I START ANEW? (yOUR boy Kadane-boi)

    for (let i = 1; i < CumSum.length; i++) {
        CumSum[i] = Math.max(CumSum[i], CumSum[i] + CumSum[i - 1]);
    }

    return Math.max(...CumSum)


};

// doesnt work
var maxProfit=A=>{
    var max_Profit=0
    var minmum_so_far=A[0]
    
    for (var price in A) {
        minmum_so_far=Math.min(minmum_so_far,price)
        let currProfit= price-minmum_so_far// bought minimum so far and sold for current price
        max_Profit=Math.max(currProfit,max_Profit)
    }
    return max_Profit
}

console.log(
    maxProfit(
        [7,6,4,3,1]
       // [7,1,5,3,6,4]
    )
)