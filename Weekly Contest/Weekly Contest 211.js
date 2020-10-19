



//O(n) O(26)=O(1)
var maxLengthBetweenEqualCharacters = function(s) {
    let result=-1,n=s.length,min=[...Array(26)].map(d=>Infinity)
    for (let i = 0; i < s.length; i++) {
        if(i<min[s[i].charCodeAt(0)-97]){
            min[s[i].charCodeAt(0)-97]=i
        }            
        else{
            result=Math.max(i-min[s[i].charCodeAt(0)-97]-1,result)
        }
    }
    return result
};


var findLexSmallestString = function(s, a, b) {
    let n=s.length,memo=new Set()
    let q=[Number(s)]
};

// console.log('01'<'08')


var bestTeamScore = function(scores, ages) {
    ages=ages.map((age,i)=>[age,scores[i]])
    // younger player has >score than older player
    // so age[i]<age[j] but score[i]>score[j]
    ages.sort((a,b)=>a[0]==b[0]?b[1]-a[1]:a[0]-b[0])
    let result=0
    let n=scores.length,prev=Infinity,curr=0
    console.log(ages)
    for(let i=0;i<n;i++){
        let [y,s]=ages[i]
        if(s<prev){
            result=Math.max(result,curr)
            curr=s
        }
        else{
            curr+=s
            result=Math.max(result,curr)
        }
        prev=s
    }
    return result
};



var areConnected = function(n, threshold, queries) {
    if(threshold==0)
        return [...Array(queries.length)].map(d=>true)
    let gcd=(a,b)=>{
        if(b==0)
            return a
        if(g[a]!==undefined&&g[a][b]!==undefined){
            return g[a][b]
        }
        if(g[b]!==undefined&&g[b][a]!==undefined){
            return g[b][a]
        }
        if(g[a]==undefined)
            g[a]={}
        if(g[b]===undefined)
            g[b]={}
        let gg=gcd(b,a%b)
        g[a][b]=gg
        g[b][a]=gg
        return gg
    }
    let g={}

    return queries.map(([a,b])=>{
        if(g[a][b]!==undefined&&g[a][b]>threshold)
            return true
        let gc=gcd(a,b)
        if(gc>threshold)
            return true
 
        let memo=new Set([a])
        let q=[a]
        while(q.length){
            let temp=[]
            for (const node of q) {
                if(g[node]==undefined)
                    continue
                if(node==b)
                    return true

                let ar=Object.keys(g[node])
                for (let i = 0; i <ar.length ; i++) {
                    if(g[node][ar[i]]>threshold&&!memo.has(ar[i])){
                        memo.add(ar[i])
                        temp.push(ar[i])
                    }
                }
                q=temp
            }
        }
        return false
    })  

};