

//bottom top dp
var countRoutes = function(loc, start, finish, fuel) {
    let mod=1e9+7,n=loc.length
        ,dp=[...Array(n)].map(d=>[...Array(fuel+1)].map(d=>0))
    // dp[i][k] number of ways to get FROM START to city i with available fuel k 
    // Note: k means exactly k, not less than k, so dp[i][k-1] is not included
    //basecases
    dp[start][0]=1

    //for every cost (needs to be first cos I need previous costs to calculate
    //the ones that follow)
    for (let cost = 1; cost <=fuel; cost++) {
        // for every possible destination
        for (let i = 0; i < n; i++) {
            let acc=0
            //for every inbetween location
            for (let j = 0; j <n; j++) {
                if(i==j)
                    continue;
                // Consider going from start=>j=>i
                // And notice that j can be the start itself here
                if(cost>=Math.abs(loc[j]-loc[i]))    
                    acc=(acc+dp[j][cost-Math.abs(loc[j]-loc[i])])%mod
            }    
            dp[i][cost]+=acc
        }        
    }
    let result=0
    // Dont forget to consider the paths with less money to my destination
    for (let cost = 0; cost<=fuel; cost++) {
        result=(result+dp[finish][cost])%mod
    }
    return result%mod
};