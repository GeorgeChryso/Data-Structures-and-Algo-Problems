// A car travels from a starting position to a destination which is target miles east of the starting position.

// Along the way, there are gas stations.  Each station[i] represents a gas station that is station[i][0] miles east of the starting position, and has station[i][1] liters of gas.

// The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it.  It uses 1 liter of gas per 1 mile that it drives.

// When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

// What is the least number of refueling stops the car must make in order to reach its destination?  If it cannot reach the destination, return -1.

// Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there.  If the car reaches the destination with 0 fuel left, it is still considered to have arrived.


// knapsack problem
var minRefuelStops = function(target, startFuel, stations) {
    let dp=Array(stations.length+1).fill(null).map(d=>0)
    // dp[i] is the maximum number of miles I can make using i refueling stops
    // base case
    dp[0]=startFuel // I can get a maximum of startfuel miles using 0 stops


    for (let i = 0; i < stations.length; i++) {
        const [st_miles,st_tank]=stations[i]
        for (let stops = i+1; stops>0 && dp[stops-1]>=st_miles; stops--) {
            dp[stops] = Math.max(dp[stops], dp[stops-1] + st_tank);   
        }
    }
    
    return dp.findIndex(d=>d>=target) 
};

console.log(minRefuelStops(
    1,1,[]
))