var kidsWithCandies = function(candies, extraCandies) {
    let max=Math.max(...candies)
    return candies.map(d=>d+extraCandies>=max)
};






var maxDiff = function(num) {
   // num=String(num).split('')
    let max=String(num).split('')
    
    let i=0
    while(i<max.length&&max[i]=='9')i++
    console.log(max)
    max=Number(max.map(d=>(i<max.length&&d==max[i])?'9':d).join(''))
    if(num.length==1){
        return max-1
    }
    console.log(max)
    i=0
    let min=String(num).split('')
    while(i<min.length&&min[i]==min[0])i++

    if(i===min.length)return max-Number(min.map(d=>'1').join(''))


    if(min[0]=='1'){
        i=1
        while(i<min.length&&(min[i]=='1'||min[i]=='0'))i++
        return max-Number(min.map(d=>d==min[i]?'0':d).join(''))
    }

    return max-Number(min.map(d=>d==min[0]?'1':d).join(''))
};


var checkIfCanBreak = function(s1, s2) {
    
    s1=s1.split('')
    s1=s1.map(d=>d.charCodeAt(0)).sort((a,b)=>a-b)

    s2=s2.split('')
    s2=s2.map(d=>d.charCodeAt(0)).sort((a,b)=>a-b)

    return s1.every((d,i)=>s1[i]>=s2[i])||s2.every((d,i)=>s2[i]>=s1[i])
};




console.log(maxDiff(
    1101057
))