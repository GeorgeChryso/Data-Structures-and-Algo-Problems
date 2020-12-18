process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '',currentLine = 0,readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string =>string.trim());
    let t=Number(readline()),res=[]
    for (let i = 0; i <t-1; i++) {
        let [n,m,k]=readline().split(' ').map(d=>Number(d))
        let POI=[]
        for(let i=0;i<n;i++)
            POI.push(readline().split(' ').map(d=>Number(d)))

        // if(i==9)
        // r=solveNaive(n,m,k,POI),
        // r=solveDC(n,m,k,POI),
        r=solveCHT(n,m,k,POI),
        res.push(r)
        //console.log(r+'')
    }
    let output=[41,4284,25,16,4,4,4,12,52,210,88,7696,1,2374,9502,49,151,996004,250000,1824916,10680029]
    console.log(res,'\n',res.every((d,i)=>d==output[i])?'AC':'WRONG')
});
//1 ≤ n ≤ 100 000, 1 ≤ m ≤ 1 000 000.
// naive dp O(k*n*n)
let solveNaive=(n,m,k,POI)=>{

    POI=POI.map(([x,y])=>x>y?[y,x]:[x,y]) //mirror the points to be above the main diagonal
    POI.sort(([x1,y1],[x2,y2])=>y1==y2?x1-x2: y2-y1) //sort them ascending
    let P=[]
    while(POI.length){
        let [cx,cy]=POI.shift()
        while(POI.length&&cx<=POI[0][0]&&cy>=POI[0][1])
            POI.shift()
        P.push([cx,cy])
    }
    P.sort((a,b)=>a[0]-b[0])
    let A=[...Array(m)].map(d=>[...Array(m)].map(d=>0))
    for(let [x,y] of P)
        A[x][y]=1
    //A.forEach(d=>console.log(d+''))

    let dp=[...Array(k+1)].map(d=>[...Array(P.length+1)].map(d=>Infinity)),result=Infinity,
        arg=[...Array(k+1)].map(d=>[...Array(P.length+1)].map(d=>Infinity))
    dp[0][0]=0
    for(let i=1;i<=k;i++)
        for(let j=i;j<=P.length;j++)
            for(let p=1;p<=j;p++){
                let [xc,yc]=P[j-1], //j-th coors
                    [xo,yo]=P[p-1] // p-th coors
                    if(dp[i][j]> dp[i-1][p-1]+(yc-xo+1)**2-(p>=2?Math.max(P[p-2][1]-xo+1,0)**2:0))
                        dp[i][j]= dp[i-1][p-1]+(yc-xo+1)**2-(p>=2?Math.max(P[p-2][1]-xo+1,0)**2:0),
                        arg[i][j]=p
                if(j===P.length)
                   result=Math.min( dp[i][j],result)
            }
    //dp.forEach(d=>console.log(d+''))
    //arg.forEach(d=>console.log(d+'')) //notice nondecreasing args
    return result
}


// Optimizations: http://ioi.te.lv/locations/ioi16/contest/IOI2016_analysis.pdf
// The args seem to be nondecreasing. therefore a DC optimzation is in order
//O(knlogn)
let solveDC=(n,m,k,POI)=>{

    POI=POI.map(([x,y])=>x>y?[y,x]:[x,y]) //mirror the points to be above the main diagonal
    POI.sort(([x1,y1],[x2,y2])=>y1==y2?x1-x2: y2-y1) //sort them ascending
    let P=[]
    while(POI.length){
        let [cx,cy]=POI.shift()
        while(POI.length&&cx<=POI[0][0]&&cy>=POI[0][1])
            POI.shift()
        P.push([cx,cy])
    }
    P.sort((a,b)=>a[0]-b[0])
    let dp=[...Array(k+1)].map(d=>[...Array(P.length+1)].map(d=>Infinity)),result=Infinity
    dp[0][0]=0
    let DC=(i,jmin,jmax,kmin,kmax)=>{
        if(jmin>jmax)
            return
        let mid=(jmin+jmax)>>1,bestk=-1
        for(let p=Math.max(1,kmin);p<=Math.min(mid,kmax);p++){
            let [xc,yc]=P[mid-1], [xo,yo]=P[p-1] // p-th coors
            let val=dp[i-1][p-1]+(yc-xo+1)**2-(p>=2?Math.max(P[p-2][1]-xo+1,0)**2:0)
            if(dp[i][mid]>val ) // loosen dp[i][mid]
                dp[i][mid]=val,
                bestk=p
            if(mid===P.length)
                result=Math.min( dp[i][mid],result)
        }
        DC(i,jmin,mid-1,kmin,bestk)
        DC(i,mid+1,jmax,bestk,kmax)
    }
    for(let i=1;i<=k;i++)
        DC(i,0,P.length,1,P.length)

    //dp.forEach(d=>console.log(d+''))
    return result
}


let y=([M,C],x)=> M*x+C //calculates y=Mx+C
let Intersection=([m1,c1],[m2,c2])=>{return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}}

// try CHT O(KN)
let solveCHT=(n,m,k,POI)=>{

    POI=POI.map(([x,y])=>x>y?[y,x]:[x,y]) //mirror the points to be above the main diagonal
    POI.sort(([x1,y1],[x2,y2])=>y1==y2?x1-x2: y2-y1) //sort them ascending
    let P=[]
    while(POI.length){
        let [cx,cy]=POI.shift()
        while(POI.length&&cx<=POI[0][0]&&cy>=POI[0][1])
            POI.shift()
        P.push([cx,cy])
    }
    P.sort((a,b)=>a[0]-b[0])
    let dp=[...Array(k+1)].map(d=>[...Array(P.length+1)].map(d=>Infinity)),result=Infinity
    dp[0][0]=0
    /*                      DP RECURRENCE => CHT LINE FORMAT 
        dp[i][j]=Min (-2(xk-1)  *   yk   + dp[i-1][k-1]+(xk-1)**2-(j>=2?Math.max(P[j-2][1]-xc+1,0)**2:0)  + yj**2 )
            y   =        M(k)   *  x[j]  +                          C[k]                                  + C'[j]

            slope=> Decreasing          }   OK 
             x[j]=> Increasing        }   OK
    */
    for(let i=1;i<=k;i++){
        if(i-1>=P.length)//will never use 9 boxes for 8 points
            break
        let q=[]
        for (let j = 1; j <=P.length; j++) {
            [xc,yc]=P[j-1]
            let nextline=[-2*(xc-1),dp[i-1][j-1] +(xc-1)**2-(j>=2?Math.max(P[j-2][1]-xc+1,0)**2:0),j]
            while(q.length>=2 && 
                Intersection(nextline,q[q.length-2]).x <= Intersection(q[q.length-2],q[q.length-1]).x )
                q.pop()
            q.push(nextline)
            while(q.length>=2&& y(q[0],yc)>=y(q[1],yc))
                q.shift()
            let [M,C]=q[0]
            dp[i][j]=M*yc+C+ yc**2
            if(j===P.length)
                result=Math.min(dp[i][j],result)
        }
    }

    //dp.forEach(d=>console.log(d+''))
    return result
}


/*
    WQS idea: 
        f(k)= Min cells used to cover all my special cells using K boxes
        f(k+1)<=f(k) 
        f(k)-f(k+1) <= f(k-1)-f(k)  //the gain i get from adding 1 box is nonincreasing
    
    Now it remains to : calculate fast 
    g(p)= min cells used to cover all my special cells using as many boxes as i want, if I had to pay p extra cells for each box
    arg(g(p))= the amount of boxes i used for that optimal solution of g(p)
     
*/

// O(nlog(n))  O(log(n)logn)
let solveWQS=(n,m,k,POI)=>{

    POI=POI.map(([x,y])=>x>y?[y,x]:[x,y]) //mirror the points to be above the main diagonal
    POI.sort(([x1,y1],[x2,y2])=>y1==y2?x1-x2: y2-y1) //sort them ascending
    let P=[]
    while(POI.length){
        let [cx,cy]=POI.shift()
        while(POI.length&&cx<=POI[0][0]&&cy>=POI[0][1])
            POI.shift()
        P.push([cx,cy])
    }
    P.sort((a,b)=>a[0]-b[0])
    
    
    let gains=[]
    for(let i=1;i<n;i++){
        let [ox,oy]=P[i-1],
            [nx,ny]=P[i]
        let fullcost= (  ny-ox +1 )**2 //if no square partions this 2 
        let gain=0,
            used
        if(oy>nx)
            used= (ny-nx+1)**2+ (oy-ox+1)**2-(oy-nx+1)**2
        else
            used= (ny-nx+1)**2+ (oy-ox+1)**2
        gain=fullcost-used 
        gains.push([gain,fullcost,used1,used2,intersection,i])
    }
    let can=p=>{
        let used=0,res=Infinity
        //strategy: keep partitioning (picking new squares until the cost outweights the gain )

        return [used,res]
    }
    let lo=0, hi= m*m+1 ,result=Infinity
    while(lo<hi){
        let mid=lo +( (hi-lo)>>1)
        let [boxesUsed,minCost]=can(mid)
        if(boxesUsed>=k)
            hi=mid-1,
            result= minCost +boxesUsed*mid
        else
            lo=mid+1
    }
    return result
}