// A car travels from a starting position to a destination which is target miles east of the starting position.

// Along the way, there are gas stations.  Each station[i] represents a gas station that is station[i][0] miles east of the starting position, and has station[i][1] liters of gas.

// The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it.  It uses 1 liter of gas per 1 mile that it drives.

// When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

// What is the least number of refueling stops the car must make in order to reach its destination?  If it cannot reach the destination, return -1.

// Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there.  If the car reaches the destination with 0 fuel left, it is still considered to have arrived.



var minRefuelStops = function(target, startFuel, stations) {
    let dp=Array(target+1).fill(null).map((d)=>Array(stations.length).fill(null).map((k,i)=>[0,startFuel-i]))
    //dp[i][0] is the min number of stops i must make to reach i miles to the right, while i still have dp[i][1] liters in the tank 
    dp[0][0]=[0,startFuel]//i need to make 0 stops to reach 0 miles to the right while having startfuel in the tank
    

    for (let i = 0; i < stations.length; i++) {
        let [S_miles,S_liters]=stations[i]
        for (let j = S_miles; j < dp.length; j++) {
            //dp[j] the min number of stations i have to visit to reach j'th mile
            let currmile=j
            let [minsteps,tank]=dp[i][j]

            if(tank<0)continue
            dp[i][j]=Math.min(1+dp[i-1][j-S_miles],dp[i-1][j])
            

        }        
    }
};