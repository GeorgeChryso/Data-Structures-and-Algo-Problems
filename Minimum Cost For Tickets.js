// In a country popular for train travel, you have planned some train travelling one year in advance.  The days of the year that you will travel is given as an array days.  Each day is an integer from 1 to 365.

// Train tickets are sold in 3 different ways:

// a 1-day pass is sold for costs[0] dollars;
// a 7-day pass is sold for costs[1] dollars;
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.  For example, if we get a 7-day pass on day 2, then we can travel for 7 days: day 2, 3, 4, 5, 6, 7, and 8.

// Return the minimum number of dollars you need to travel every day in the given list of days.


// 1 <= days.length <= 365
// 1 <= days[i] <= 365
// days is in strictly increasing order.
// costs.length == 3
// 1 <= costs[i] <= 1000



//classic dp, the only catch is that YOU HAVE TO BE ABLE TO CHOOSE TO BUY A TICKER FOR A DAY LARGER THAN THE CURRENT, for example, buy a ticket for 30 days to cover day 2 
var mincostTickets = function(days, costs) {
    let traveldays=[1,7,30]
    //dp[i]=min cost to get to day i,assuming i travelled all the days
    // =min cost to get to any previous days+ cost[1], cost[7], cost[30]
    let memo=new Set(days)
    let n=days.length
    let dp=[...Array(days[n-1]+1)].map(d=>Infinity)
    dp[0]=0//already at day 0
    for (let i = 1; i<dp.length; i++) {
        for (let j = 0; j < costs.length; j++) {
            //if it's a day when I have to travel, u need to cover it
            if(memo.has(i))
        //========================THIS LINE IS MAGIC===========================\\
                dp[i]=Math.min(dp[i],(dp[i-traveldays[j]]||0)+costs[j]) //this line means:
                // Pick any of the 3 costs even at day 1, even if i-traveldays[j]<0 I still have 
                // the option to buy ticket for 7 or 30 days, That's the logic here
            else //else if it's a day when I dont have to travel, just take the already minimum cost to travel to my required days I that precede this 
                dp[i]=dp[i-1]    
        }
    }
    return dp[dp.length-1]
};

console.log(mincostTickets(
   // [1,4,6,7,8,20],[2,7,15] 
   //[1,2,3,4,5,6,7,8,9,10,30,31],[2,7,15]
    [1,4,6,7,8,20],[7,2,15]
))