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

// dp bottom-top with memo
var mincostTickets = function(A, costs) {
    let days=price=>{
        if(price==costs[0])return 1
        if(price==costs[1])return 7
        if(price==costs[2])return 30
    }
    let dp=Array(A[A.length-1]+1).fill(Infinity)
    let memodays=new Set(A)
    //dp[i] is the mi

    //base case 
    dp=dp.concat(Array(30).fill(0))
    for (let i =A[A.length-1]; i >=0; i--) {
            //BUY ONLY ON DAYS THAT U HAVE TO TRAVEL OR DONT BUY AT ALL
            if(memodays.has(i)){
                costs.forEach(cost =>dp[i]=Math.min(dp[i+days(cost)]+cost,dp[i])
                );
                console.log(dp[i])
            }else{
                dp[i]=dp[i+1]
            }
    }


    return dp[0]
};


console.log(mincostTickets(
    [1,4,6,7,8,20],[2,7,15]
))