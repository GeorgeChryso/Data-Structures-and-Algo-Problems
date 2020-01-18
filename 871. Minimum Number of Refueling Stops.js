// A car travels from a starting position to a destination which is target miles east of the starting position.

// Along the way, there are gas stations.  Each station[i] represents a gas station that is station[i][0] miles east of the starting position, and has station[i][1] liters of gas.

// The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it.  It uses 1 liter of gas per 1 mile that it drives.

// When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

// What is the least number of refueling stops the car must make in order to reach its destination?  If it cannot reach the destination, return -1.

// Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there.  If the car reaches the destination with 0 fuel left, it is still considered to have arrived.

// knapsack problem
var minRefuelStops = function(target, startFuel, stations) {
    let dp = Array(stations.length + 1)
        .fill(null)
        .map(d => 0);
    // dp[i] is the maximum distance travelled using i refueling stops
    // base case
    dp[0] = startFuel; // I can get a maximum of startfuel miles using 0 stops

    for (let i = 0; i < stations.length; i++) {
        let [st_location, st_tank] = stations[i];

        dp = dp.map((maxmiles, stops) => {
            if (
                dp[stops - 1] < st_location || //the station isnt reachable
                stops == 0 || // I never need to meddle with the base case
                stops > i + 1 // and I never need to meddle with the next stations as I m examining one station at a time that can only affect the previous results so far.
                // remember that i=0 means the FIRST station but stops=0 means 0 stops
                // so for 2 stops stops=2 but i=1
            )
                return maxmiles;

            return Math.max(
                maxmiles, // or dont use the current station
                dp[stops - 1] + st_tank //use the current reachable station plus the max distance from the last
            );
        });
    }
    console.log(dp);

    return dp.findIndex(d => d >= target);
};
// What bugs me about this knapsack:
// It's essentially as if the stations act both as rows and columns of my knapsack board
// There's no clear constraint and instead of maximizing profit i m trying to minimize it, profit being the number of stations.

// same approach, better readability
var minRefuelStops = (target, startFuel, stations) => {
    let dp = Array(stations.length + 1)
        .fill(null)
        .map(d => Array(stations.length + 1).fill(0));
    //dp[i][j] is the Max distance I can cover using i stations, while wanting to get to j'th station

    //base case
    dp[0] = Array(stations.length + 1).fill(startFuel); //using 0 stations I only have startFuel

    for (let i = 1; i <= stations.length; i++) {
        console.log(dp);

        dp[i][0] = startFuel; //base case, never changes

        // currStop=i
        let [st_location, st_tank] = stations[i - 1];
        //for each station up to my current station
        for (let j = 1; j <= i; j++) {
            if (dp[i - 1][j - 1] >= st_location) {
                //if the current station is reachable from the last station

                dp[i][j] = Math.max(
                    dp[i - 1][j], //either the max distance ignoring the current station
                    dp[i - 1][j - 1] + st_tank // or by using the current station on the previous stop
                );
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    console.log(dp);
    return dp[stations.length].findIndex(d => d >= target);
};
console.log(
    minRefuelStops(
        // 1,1,[]
        100,
        10,
        [
            [10, 90],
            [20, 30],
            [30, 30],
            [60, 40]
        ]
        //100,1,[[10,100]]
    )
);
