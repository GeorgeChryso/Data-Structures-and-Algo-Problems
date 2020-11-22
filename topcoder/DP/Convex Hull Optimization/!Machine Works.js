


// * can buy and sell at the same day
// * no profit of the machine if i sell it on that day
// * no profit  if i buy it on that day
// * I have to sell any machine bought in the end.


// Days,Gain,Cost to buy, Cost to sell, Initial Budget
let MachinesNaive=(D,G,P,R,c,days)=>{
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
    
    console.log(dp)
    return Math.max(...dp)
}
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
    Machines.push([days+1, 0, 0,0])

    for ( let [DD,GG,PP,RR] of Machines)         
        for ( let [D,G,P,R] of Machines) { //try selling a machine that was previously bought
            if(D>=DD) // the current machine can only be bought on a later day than i 
                break
            if(dp[D]>=P) // Only If at that day I could buy the machine 
                dp[DD]=Math.max(
                        dp[DD],
                        dp[D]+ G*(DD-D-1) + R - P, //sell it, acquire its gain and resell price, and also subtract its price so you can simulate its buying aswell
                     )
        }        
    
    console.log(dp)
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

// this is wrong because slope is non ascending/descending and needs a dynamic hull variant
let MachinesCHT=(D,G,P,R,c,days)=>{
    let y=(line,x)=>{
        let [M,C]=line
        return M*x+C
    }
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let Machines=[],n=D.length
    for (let i = 0; i < n; i++) 
        Machines.push([D[i],G[i],P[i],R[i]])        
    Machines.sort((a,b)=>a[0]-b[0]) //sort by day to buy
    /*
        dp[i]=Max value I can achieve at THE END OF day i,if I sell a machine I have previously bought at that day

            dp[i]=Max( G*i    -GD-1G + dp[D] + R-P)
            y          M*x  +       C

            non ascending/descending slope
            ascending x
    */
    Machines.push([days+1, 0, 0,0])

    let dp=[...Array(days+2)].map(d=>c) //days +2 cos I have to return the best at day days+1
    //basecase
    //the starting value of everything is the budget at the beginning
    let Q=[ [0,c] ]
    for ( let [D,G,P,R] of Machines) { //try selling a machine that was previously bought
            while(Q.length>=2&& y(Q[0],D)<=y(Q[1],D))
                Q.shift()
            dp[D]=Math.max(y(Q[0],D),dp[D])
            if(dp[D]>=P){
                nextLine=[G,dp[D]-G*D-G+R-P]
                while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-2],Q[Q.length-1]).x )
                    Q.pop()
                Q.push(nextLine)
            }
    }        
    console.log(dp)
    return Math.max(...dp)
}
console.log(
    tests.map(([D,G,P,R,C,DA])=>MachinesCHT(
        D,G,P,R,C,DA
    ))
)
