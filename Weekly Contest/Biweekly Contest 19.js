



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

    
    //calculate the sum of the first subarray 
    let sums=arr.slice(0,k).reduce((a,b)=>a+b)
    if(sums/k>=threshold)result++


    //and every possible next sum
    for (let i = k; i < arr.length; i++) {
      //find the next sum
      sums+=(arr[i]-arr[i-k])

      //increment if of wanted type
      if(sums/k>=threshold)result++
    }
      
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
            if(i==0)dictionary[d]=0
            else dictionary[d]=dictionary[d]||Infinity
    })
    //basecase
    previous[0]=0

    let minsofar=Infinity
    let result=Infinity
    for (let i = 0; i < arr.length; i++) {
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
    if(hour==12)hour==0 // 0 and 12 shouldnt coexist cos we re talking about the same time

    let minuteDegrees=minutes*6 //1minute is 6 degrees from 12:00/0:00
    let hourDegrees=hour*30+minutes/2 //1hour is 30 degrees + the offset of degrees that  depends on minutes (that would be minutes/2 degrees)  (from 12:00/0:00)
    //e.g. 4:30 would mean that 4 is essentially 4.5, so the offset was 30/2=15 extra degrees
    // because 4=>120 degrees,whereas 4.5=>135 degrees, the offset of the 15 degrees of difference was a result of 30 

    let difference=Math.abs(minuteDegrees-hourDegrees) // the difference in between them

    return Math.min(difference,360-difference) //I want the minimum difference between them which is either the difference itself or the sum of all the degrees left
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