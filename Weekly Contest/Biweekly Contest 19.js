



var numberOfSteps  = function(num) {
    let result=0
    
    while(num!==0){
        if(num%2==0){
            num/=2
        }
        else{
            num--
        }
        result++
    }

    return result
};



//5312. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold



var numOfSubarrays = function(arr, k, threshold) {
    if(arr.length<k||k===0)return 0
    let result=0
    
    let sums=[]
    let temp=0

    for (var start = 0; start <= k-1; start++) {
        temp+=arr[start]
    }
    sums.push(temp)
    while(start<arr.length){
      let q= sums[sums.length-1]
      q+=(arr[start]-arr[start-k])
      sums.push(q)
      start++
    }
    sums.forEach(d=>{
        if(d/k>=threshold){
            result++
        console.log(d,d/k)
    }
        
    })


    return result
};


var angleClock = function(hour, minutes) {
    hours={
        12:0,
        1:5,
        2:10,
        3:15,
        4:20,
        5:25,
        6:30,
        7:35,

    }

    let abshour=Math.min(Math.abs(12-hour),hour)*30
    let absmins=Math.min(Math.abs(60-minutes),minutes)*6
    //console.log(distance)
    let rest=30*minutes/60
    console.log(abshour,absmins,rest)
    console.log(Math.abs(abshour+absmins)-rest,Math.max(Math.abs(12-hour),hour)*30-absmins-rest,
    Math.max(Math.abs(60-minutes),minutes)*6-abshour-rest,abshour-absmins-rest)
    return Math.abs(Math.min(Math.abs(abshour+absmins)-rest,Math.max(Math.abs(12-hour),hour)*30-absmins-rest,
    Math.max(Math.abs(60-minutes),minutes)*6-abshour-rest,Math.abs(abshour-absmins-rest)))

    console.log(abshour,absmins,rest)
    console.log(abshour+absmins-rest,abshour-absmins-rest)
return    Math.abs(Math.abs(abshour-absmins)-rest)





//return Math.max( Math.abs(Math.min(hour,Math.abs(12-hour))*30-Math.min(Math.abs(60-minutes),minutes)*6),
//Math.abs(Math.min(hour,Math.abs(12-hour))*30+Math.min(Math.abs(60-minutes),minutes)*6)-(minutes/ 60)*30)

};

var minJumps = function(arr) {
    let previous=Array(arr.length).fill(null).map(d=>Infinity)
    let dictionary={

    }
    arr.forEach(
        (d,i)=>{
            dictionary[d]=dictionary[d]||Infinity
    })
    //basecase
    previous[0]=0

    let minsofar=Infinity
    let result=Infinity
    for (let i = 0; i < arr.length; i++) {
        // let next=Array(arr.length).fill(null).map(d=>Infinity)
        // for (let j = 0; j < arr.length; j++) {
        //     next[j]=Math.min(previous[j],
        //             j-1>=0?1+previous[j-1]:Infinity,
        //             j+1<=arr.length-1?1+previous[j+1]:Infinity,
        //             dictionary[arr[j]]+1
        //             )
        //     minsofar=Math.min(next[j],minsofar)
        //     dictionary[arr[j]]=Math.min(dictionary[arr[j]],next[j])
        // }

        previous=previous.map((d,j)=>{
            let res=Math.min(previous[j],
                j-1>=0?1+previous[j-1]:Infinity,
                j+1<=arr.length-1?1+previous[j+1]:Infinity,
                dictionary[arr[j]]+1
                )
            minsofar=Math.min(res,minsofar)
            dictionary[arr[j]]=Math.min(dictionary[arr[j]],res)
            return res
        })

        if(minsofar==result)return result
        result=Math.min(result,previous[arr.length-1])
        // previous=next
    }


    return result
};

console.log(minJumps(
    [7,6,9,6,9,6,9,7]    ))




var angleClock = function(hour, minutes) {
    if(hour==12&&minutes==0)return 0
    if(hour==12)hour=0
    let rest=minutes/2
    if(hour*30<minutes*6)rest*=-1
    if(hour<6&&minutes<=30)return Math.abs(hour*30-minutes*6) +rest
    if(hour>6&&minutes>30)return Math.abs( Math.abs(12-hour)*30-Math.abs(60-minutes)*6)+rest

    console.log( Math.abs( Math.abs(12-hour)*30-Math.abs(60-minutes)*6),
    Math.abs(hour*30-minutes*6),rest)
    return Math.abs(Math.min(
    Math.abs( Math.abs(12-hour)*30-Math.abs(60-minutes)*6),
    Math.abs(hour*30-minutes*6)
    )+rest)
}

// 6,5//152.5
// 3,30 //75
// //12,30 //165
// //  3,15  //7,5
// //4,50 //155
//  12,0//0
// console.log(
//     angleClock(
//         1,57
//             )
// )