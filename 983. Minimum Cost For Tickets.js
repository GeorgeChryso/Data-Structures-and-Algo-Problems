// In a country popular for train travel, you have planned some train travelling one year in advance.  The days of the year that you will travel is given as an array days.  Each day is an integer from 1 to 365.

// Train tickets are sold in 3 different ways:

// a 1-day pass is sold for costs[0] dollars;
// a 7-day pass is sold for costs[1] dollars;
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.  For example, if we get a 7-day pass on day 2, then we can travel for 7 days: day 2, 3, 4, 5, 6, 7, and 8.

// Return the minimum number of dollars you need to travel every day in the given list of days.



//dfs?
var mincostTickets=(A,costs)=>{
    let cost

}

var mincostTickets = function(A, costs) {
    let days=price=>{
        if(price==costs[0])return 1
        if(price==costs[1])return 7
        if(price==costs[2])return 30
    }
    let dp=Array(386).fill(Infinity)
    let memodays=new Set(A)
    //dp[i]

    //base case 
    dp[0]=0 // need 0 dollars to travel to day 0

   
    for (let i = 1; i <=365; i++) {
            //BUY ONLY ON DAYS THAT U HAVE TO TRAVEL OR DONT BUY AT ALL
            if(memodays.has(i)){
                costs.forEach(cost => dp[i]=Math.min(dp[i+days(cost)]+cost,dp[i]));
            }
    }
    console.log(dp+'')
    return Math.min(...dp.slice(365))
};


console.log(mincostTickets(
    [1,4,6,7,8,20],  [2,7,15]
))