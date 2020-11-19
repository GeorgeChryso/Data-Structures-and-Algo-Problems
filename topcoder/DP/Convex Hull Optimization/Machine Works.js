


// * can buy and sell at the same day
// * no profit of the machine if i sell it on that day
// * no profit  if i buy it on that day
// * I have to sell any machine bought in the end.


// Days,Gain,Cost to buy, Cost to sell, Initial Budget
let Machines=(D,G,P,R,c,days)=>{
    let Machines=[],n=D.length
    for (let i = 0; i < n; i++) 
        Machines.push([D[i],G[i],P[i],R[i]])        
    Machines.sort((a,b)=>a[0]-b[0]) //sort by day to buy
    /*
        dp[i]=Max value I can achieve at THE END OF day i,if I sell a machine I have previously bought at that day
    */
    let dp=[...Array(days+2)].map(d=>c) //days +2 cos I have to return the best at day days+1
    //basecase
    //the starting value of everything is the budget at the beginning

    // [Day, Gain, Price, Resale] tuples
    for (let i = 1; i < dp.length; i++)  //for each day
        for ( let [D,G,P,R] of Machines) { //try selling a machine that was previously bought
            if(D>=i) // the current machine can only be bought on a later day than i 
                break
            if(dp[D]>=P) // Only If at that day I could buy the machine 
                dp[i]=Math.max(
                        dp[i],
                        dp[D]+ G*(i-D-1) + R - P, //sell it, acquire its gain and resell price, and also subtract its price so you can simulate its buying aswell
                     )
        }        

    return Math.max(...dp)
}



let tests=[
   [[6,1,3,8,4,2],[3,2,2,4,4,1],[12,9,2,20,11,10],[1,1,1,5,7,9],10,20]
]
let output=[44]

console.log(
    tests.map(([D,G,P,R,C,DA])=>Machines(
        D,G,P,R,C,DA
    ))
)