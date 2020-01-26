



var removePalindromeSub = function(s) {
    if(s=='')return 0
    let isPalindrome=S=>{
        for (let i = 0; i <  Math.floor(S.length/2); i++) {
                if(S[i]!==S[S.length-1-i])return false            
        }
        return true
    }
    let hash={}
    let steps=0
    let queue=[s]
    while(steps<=s.length){
        let temp=[]
        console.log(queue+'')
        for (const string of queue) {
            for (let start = 0; start <= string.length; start++) {
                for (let end = start+1; end <= string.length; end++) {
                    let curr=string.slice(start,end+1)
                
                    if(curr.length===1||isPalindrome(curr)){
                        let removed=string.slice(0,start)+string.slice(end)
                        console.log(string,curr,`remove=`,string.slice(0,start),string.slice(end),isPalindrome(removed))
                        if(removed==''||!removed.length)return steps+1
                        if(hash[removed]==undefined){
                            hash[removed]=1
                            temp.push(removed)
                        }
                    }
                    
                }                
            }
        }
        if(temp.indexOf('')!=-1)return steps+1
        steps++
        queue=temp
    }

    return steps
};


let isPalindrome=s=>{
    if (s.length==0)return 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i)!=s.charAt(s.length()-i-1)) return 2;
    }
    return 1;
}
console.log(removePalindromeSub
    (
        "bbaabaaa"
    ))
var filterRestaurants = function(restaurants, veganFriendly, maxPrice, maxDistance) {
    let resultArr=[]
    //vegan
    if(veganFriendly){
        resultArr=restaurants.filter(d=>d[2]&&d[3]<=maxPrice&&d[4]<=maxDistance)
    }
    else resultArr=restaurants.filter(d=>d[3]<=maxPrice&&d[4]<=maxDistance)
    console.log(resultArr)
    resultArr= resultArr.sort((a,b)=>
   // b[1]-a[1]
    {
       if (b[1]>a[1])return 1
       else if (b[1]==a[1]){
           if(a[0]>=b[0])return -1
           else return 1
       }
       else return -1
    }
    )
    console.log(resultArr)
    return resultArr.map(d=>d[0])
    

};


var findTheCity = function(n, edges, distanceThreshold) {
    let dict={}
    for (const [fromi, to, weight] of edges) {
        if(dict[fromi]){
            if(dict[fromi][to]==undefined){
                dict[fromi][to]=weight
            }
        }
        else{
            dict[fromi]={}
            dict[fromi][to]=weight
        }

        if(dict[to]){
            if(dict[to][fromi]==undefined){
                dict[to][fromi]=weight
            }
        }
        else{
            dict[to]={}
            dict[to][fromi]=weight
        }
    }

 
    let result=Infinity
    let resultnode=0
    let dp=(node,seen,weightleft,count,start)=>{
        if(weightleft>=0){
            if(count<result){
                count=result
                resultnode=start
            }
            else if(count==result){
                if(resultnode<start){
                    resultnode=start
                }
            }
        }
        if (weightleft<0 || !seen.length)return 
        for (const next of Object.keys(dict[node])) {
            if(!seen.has(next)){
                let k=new Set(seen)
                k.add(next)
                dp( next, k,weightleft-dict[next],count+1,start)
            }
        }
    }
    for (let start = 0; start < n; start++) {
        dp(start,new Set([start]),distanceThreshold,0,start)
    }
    return resultnode
};
// console.log(
//     filterRestaurants (
        
//         [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], 0,50,10
//         //[[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]],1, 50,  10
// ))