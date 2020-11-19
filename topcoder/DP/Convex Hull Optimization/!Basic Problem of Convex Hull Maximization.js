


/*
            Given 2 Arrays 
                m=[m0,..., mj,...,mn]
                c=[c0,..., cj,...,cn]
            Maximize the following formula
               Max{  mj*x+ cj } , for some queries Xs=[x1,<x2,<...,<xn] 
*/

// Naive O(X*M)  approach
let findMaxCH=(M,C,Xs)=>{
    let n=M.length,result=[...Array(Xs.length)].map(d=>-Infinity)
    for (let i = 0; i < Xs.length; i++) 
        for (let j = 0; j < n; j++) 
            result[i]=Math.max(
                        Xs[i]*M[j]+C[j],
                        result[i]
                    )           
    return result
}



let tests=[
    [-2,-1,0,1,2],
    [1,3,2,-2,-3],
    [-7,-3,-2,-1,-0.5,0,1,1.13,2,4,13,14]
]

console.log(findMaxCH(tests[0],tests[1],tests[2]))

// We know that the bests solutions lie on the upper envelope. 
// Maintain all of the lines of the upper envelope in increasing slopes (M's)
// For each query the best y will be on the top of the queue of slopes

// CHT, O( (X+M)logM)
let findMaxCHQ=(M,C,Xs)=>{
    let y=(line,x)=>{
        let [M,C]=line
        return M*x+C
    }
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let lines=M.map( (d,i)=>[d,C[i]]) //[M,C] pairs ( y=Mx+C)
            // CONSTRUCT THE QUEUE- CONVEX HULL
    lines.sort((a,b)=>a[0]-b[0]) //sort ascending for maximization (upper envelope), descending for min (lower envelope)
    let Q=[lines.shift(),lines.shift()]
    while(lines.length){    
        let nextLine=lines.shift() 
        // [...Qn-2,Qn-1]
        // if the x of intersection Point between next and Qn-2 is to the left of the x of the intersection Point between Qn-2 and Qn-1, then next is better than Qn-1, and Qn-2 is now obsolete and has to be popped
        while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-1],Q[Q.length-2]).x)
            Q.pop() //careful, this cant handle 3 parallel lines <<===========================
        Q.push(nextLine)
    }
    // Ok, now Q has all the lines of the convex hull
    // QUERY IT INFINITELY IN O(1) IF Xs are sorted ascending
    // Otherwise BINARY SEARCH THE POSITION OF X 
    console.log(Q)

    //let's first do it without sorting the X's, because that would result in a complexity of 
    // O( NlogN+XlogX)
    // Whereas if I binary search for the position of my x 
    // O(NlogN+ XlogN) where N is the number of lines, and X the number of Xs Queries
    
    // k lines of the convex hull will give us k-1 points of intersection
    // these points of intersection will be the intervals of X where each query is maximized
    // So I will create these intervals

    let intervals=[]// will essentially hold the x's where the CHT changes lines
    for (let i = 0; i < Q.length-1; i++) 
        intervals.push(Intersection(Q[i],Q[i+1]).x)
    // so if we have a Query x_i and its x_i<intervals[0], that means that this fella is maximized
    // on the line that resides in Q[0]
    // so for each of my queries I can binary search on intervals, for the correct index of Q
    let result=[],k=intervals.length
    for (const x of Xs){
        let lo=0, hi=k-1 
        while(lo<=hi){
            let mid=(lo+hi)>>1
            if(intervals[mid]>x)
                hi=mid-1
            else
                lo=mid+1
        }
        result.push(y(Q[lo],x))
    }
    return result
}
console.log(findMaxCHQ(tests[0],tests[1],tests[2]))


//if X is sorted already,which it is, I dont really need to binary search, because I can process my 
// lines in Q from left to right

let findMaxCHQXsorted=(M,C,Xs)=>{
    let y=([M,C],x)=> M*x+C //calculates y=Mx+C
    let Intersection=([m1,c1],[m2,c2])=>{return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}}
    let lines=M.map( (d,i)=>[d,C[i]]) 
    lines.sort((a,b)=>a[0]-b[0]) 
    let Q=[lines.shift(),lines.shift()],result=[]
    while(lines.length){    
        let nextLine=lines.shift() 
        while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-1],Q[Q.length-2]).x)
            Q.pop() 
        Q.push(nextLine)
    } 
    let intervals=[]
    for (let i = 0; i < Q.length-1; i++) 
        intervals.push(Intersection(Q[i],Q[i+1]).x)
    for (const x of Xs){ //x's are sorted now
        while(intervals.length&&x>intervals[0])
            intervals.shift(),
            Q.shift()
        result.push(y(Q[0],x))
    }
    return result
}

console.log(findMaxCHQXsorted(tests[0],tests[1],tests[2]))
