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
    //dp[i] holds the minimum dollars I have to spent in order to travel from day i to the end
    let memodays=new Set(A) //this grants me O(1) access to the traveldays

    //base case 
    dp=dp.concat(Array(30).fill(0))
    // this "end" is considered any day after the last day. The maximum days I can get to travel after my last day are 30. That happens if I purchase a 30 day pass on the last day. Therefore all these days cost me 0 

    for (let i =A[A.length-1]; i >=0; i--) {
            // I consider buying only on travel days so I can maximize my profit
            if(memodays.has(i)){
                costs.forEach(cost =>dp[i]=Math.min(dp[i+days(cost)]+cost,dp[i]));
            }else{
                dp[i]=dp[i+1]
            }
    }


    // and my result is the minimum dollars I have to spend in order to trave from day 0 to the end, the end being any day past my higher value A[A.length-1]
    return dp[0]
};

//dp top-bottom approach added
var mincostTickets = function(A, costs) {
    let days=price=>{
        if(price==costs[0])return 1
        if(price==costs[1])return 7
        if(price==costs[2])return 30
    }
    let dp=Array(A[A.length-1]+1).fill(Infinity)
    //dp[i] holds the minimum dollars I have to spent in order to travel from start 0 to day i
    let memodays=new Set(A) //this grants me O(1) access to the traveldays

    //base case 
    dp=(Array(30).fill(0)).concat(dp)
    // this "start" is considered any day before the first day. The maximum days I can get to travel after my last days are 30. That happens if I purchase a 30 day pass on the first day. Therefore all these days cost me 0 

    for (let i =30; i <dp.length; i++) {
            // I consider buying only on travel days so I can maximize my profit
            if(memodays.has(i-30)){
                costs.forEach(cost =>dp[i]=Math.min(dp[i-days(cost)]+cost,dp[i]));
            }else{
                dp[i]=dp[i-1]
            }
    }
    // and my result is the minimum dollars I have to spend in order to travel from day 0 to the end, 30+A[A.length-1]
    return dp[30+A[A.length-1]]
};

// O(n)
var mincostTickets=(A,costs)=>{
    let cost=0
    let last7=[]
    let last30=[]

    for (const day of A) {

        //discard all the expired 7 days passes
        while(last7.length && (last7[0][0]+7)<=day)last7.shift()
        // and all the expired 30 days passes
        while(last30.length &&(last30[0][0]+30)<=day)last30.shift()

        //pushing the possibility of buying a 7 and 30 pass on
        last7.push([day,cost+costs[1]])
        last30.push([day,cost+costs[2]])
        cost=Math.min( cost+costs[0],last7[0][1],last30[0][1])
    }


    return cost
}

//?? needs studying
var mincostTickets = function(days, costs) {
    // dynamic problem
    // each new day have 3 options
    // 1) add another single day pass
    // 2) add 7 day pass
    // 3) add 30 day pass
    // Find the  min of all three options
    
    
    let findCost = function(ticketDay, index, days, totals) {
        // find the cost since day
        let prevDay = days[index] - ticketDay
        
        for(let i = index-1; i >= 0; i--) {
            if(days[i] <= prevDay)  return totals[i]
        }
        
        return 0
    }

    let totals = []
    
    for(let i in days) {
        let cost1 = (i == 0? 0: totals[i-1]) + costs[0]
        let cost7 = findCost(7, i, days, totals) + costs[1]
        let cost30 = findCost(30, i, days, totals) + costs[2]
        
        totals[i] = Math.min(cost1, cost7, cost30)
        // console.log({i: i, cost1: cost1, totals: totals})
    }
    return totals[totals.length-1]
};

console.log(mincostTickets(
 //   [1,4,6,7,8,20],[2,7,15]
    [4,5,9,11,14,16,17,19,21,22,24],
[1,4,18]
))