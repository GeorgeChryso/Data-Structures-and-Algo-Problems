

var busyStudent = function(startTime, endTime, queryTime) {
    let result=0
    for (let i = 0; i < startTime.length; i++) {
        if(startTime[i]<=queryTime&&queryTime<=endTime[i])result++        
    }
    return result
};



var arrangeWords = function(text) {
    text=text.toLowerCase()

    text=text.split(' ')

    let memo={}
    text.forEach((d,i)=>memo[d.length]?memo[d.length].push(d):memo[d.length]=[d])
    text=Object.keys(memo)
    text.sort((a,b)=>a-b)
    text=text.map(d=>memo[d])
    let result=[]
    text.forEach(d=>result=result.concat(d))
    let first=result[0].split('')
    first[0]=first[0].toUpperCase()
    result[0]=first
    return result.join(' ')
};


var peopleIndexes = function(favoriteCompanies) {
    
    let result=[]
    for (let i = 0; i < favoriteCompanies.length; i++) {
        let k=0
        for (let j = 0; j < favoriteCompanies.length; j++) {
            if(i===j)continue
            for (const companyi of favoriteCompanies[i]) {
                let flag=false
                for (const companyj of favoriteCompanies[j]) {
                    if(companyi===companyj)flag=true
                }
                if(flag===false){
                    k++
                    break
                }
            }       
        }
        if(k===favoriteCompanies.length-1)result.push(i)
    }
    return result
};


var numPoints = function(points, r) {


    // for (const [x,y] of points) {
    //     minx=Math.min(minx,x)
    //     miny=Math.min(miny,y)
    //     maxx=Math.max(maxx,x)
    //     maxy=Math.max(maxy,y)
    // }
    // console.log(minx,miny,)
    // let result=-1
    // for (let x = minx; x <=maxx; x+=.25) {
    //     for (let y = miny; y <=maxy; y+=.5) {
    //         let count=0
    //         for (const [xx,yy] of points) {
    //             if(((xx-x)**2 + (yy-y)**2)<=r*r)count++
    //         }            
    //         console.log(count,x,y)
    //         result=Math.max(result,count)
    //     }        
    // }

    for (const [x1,y1] of points) {
        for (const [x2,y2] of points) {
            if(x1==x2&&y1==y2)continue
            let alpha=x2-x1
            let beta=y2-y1
            
            let count1=0
            let count2=0

            let lamda=(y1-y2)/(x1-x2)
            let flag=((x1-x2)**2+(y1-y2)**2)===r*r
            for (const [xx,yy] of points) {

                if(((xx-x)**2 + (yy-y)**2)<=r*r)count1++
                if(flag&&((((xx-(x1+x2)/2)**2 + (yy-(y1+y2)/2)**2))<=r*r))count2++

            }   
            result=Math.max(result,count1,count2)

        }
    }
    return result
};

console.log(
    numPoints(
        [[-2,0],[2,0],[0,2],[0,-2]],
        2
    )
)