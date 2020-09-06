

//bottom up dp
var countRoutes = function(loc, start, finish, fuel) {
    let mod=1e9+7,n=loc.length
        ,dp=[...Array(n)].map(d=>[...Array(fuel+1)].map(d=>0))
    // dp[i][k] is the number of ways to get FROM START to city i with available fuel k 
    // Note: k means exactly k, not less than k, so the number of ways to get to i with cost k-1 is not included

    //basecase
    dp[start][0]=1 // with cost=0, i'm already at the start, so there s only 1 way

    //for every cost (needs to be first cos I need previous costs to calculate
    //the ones that follow)
    for (let cost = 1; cost <=fuel; cost++) 
        // for every possible destination
        for (let i = 0; i < n; i++) 
            //for every inbetween location
            for (let j = 0; j <n; j++) 
                // Consider going from start=>j=>i
                // And notice that i can be the start itself here
                if(i!=j&&cost>=Math.abs(loc[j]-loc[i]))
                    dp[i][cost]=(dp[i][cost]+dp[j][cost-Math.abs(loc[j]-loc[i])])%mod

    let result=0
    // Dont forget to consider the paths with less money to my destination
    for (let cost = 0; cost<=fuel; cost++) 
        result=(result+dp[finish][cost])%mod
    return result%mod
};


//top down dp
var countRoutes = function(loc, start, finish, fuel) {
    let mod=1e9+7,n=loc.length
        ,dp=[...Array(n)].map(d=>[...Array(fuel+1)].map(d=>-1)),result=0
    //basecase
    dp[start][0]=1

    let recursion=(destination,fuelLeft)=>{
        if(fuelLeft<0)return 0
        if(dp[destination][fuelLeft]==-1){
            let acc=0
            for (let i = 0; i < n; i++) {
                if(i!=destination&&fuelLeft>=Math.abs(loc[destination]-loc[i]))
                    acc=(acc+recursion(i,fuelLeft-Math.abs(loc[i]-loc[destination])))%mod          
            }
            dp[destination][fuelLeft]=acc
        }
        return dp[destination][fuelLeft]
    }
    for (let cost = 0; cost <=fuel; cost++)
        result=(result+recursion(finish,cost))%mod    

    return result
};