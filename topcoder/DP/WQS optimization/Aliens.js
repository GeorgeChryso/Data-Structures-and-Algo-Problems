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

        //if(i==9)
        //r=solveNaive(n,m,k,POI),
        r=solve(n,m,k,POI),
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
    A.forEach(d=>console.log(d+''))

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
    dp.forEach(d=>console.log(d+''))
    //arg.forEach(d=>console.log(d+'')) //notice nondecreasing args
    return result
}


// Optimizations: http://ioi.te.lv/locations/ioi16/contest/IOI2016_analysis.pdf
// The args seem to be nondecreasing. therefore a DC optimzation is in order
//O(knlogn)
let solve=(n,m,k,POI)=>{

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
            let [xc,yc]=P[mid-1], //j-th coors
                [xo,yo]=P[p-1] // p-th coors
                if(dp[i][mid]> dp[i-1][p-1]+(yc-xo+1)**2-(p>=2?Math.max(P[p-2][1]-xo+1,0)**2:0))
                    dp[i][mid]= dp[i-1][p-1]+(yc-xo+1)**2-(p>=2?Math.max(P[p-2][1]-xo+1,0)**2:0),
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