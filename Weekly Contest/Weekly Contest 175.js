


var checkIfExist = function(arr) {

    for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if(arr[i]==2*arr[j]&&i!==j)return true
                
            }        
    }
    return false
};



var minSteps = function(s, t) {
    s=s.split('')
    t=t.split('')
    let bucket={}
    let result=0
    s.forEach((d,i)=>bucket[d]=(bucket[d]||0)+1)
    t.forEach(d=>{
        if(bucket[d]){
            if(bucket[d]>0)bucket[d]--
            else result++
        }
        else{
            result++
        }
    })
    return result
};



var maxStudents = function(S) {

    let startcheck=(i,j,k)=>{
        return ways.every(
                ([a,b])=>(i+a<0||j+b<0||i+a>=k.length||j+b>=k[0].length)?true:
                   k[i+a][j+b]==='#'
            )
    }
    let standard=0

    let check=(i,j,k)=>{
        return ways.every(
                ([a,b])=>(i+a<0||j+b<0||i+a>=k.length||j+b>=k[0].length)?true:
                   k[i+a][j+b]!==1
            )
    }
    let ways=[[-1,-1],[-1,+1],[0,-1],[0,1]]
    let proc=[]

    for (let i = 0; i < S.length; i++) {
        for (let j = 0; j < S[0].length; j++) {
            if(S[i][j]==='.'){
                if(startcheck(i,j,k)){
                    S[i][j]='#'
                    standard++
                }
                else{
                    proc.push([i,j])
                }
            
            }       
        }        
    }

    let helper=(matrix,left,seated)=>{
 
        if(left.length){
          

            let cand=left.shift()
            while(matrix[cand[0]][cand[1]]==='#'&&left.length){
                cand=left.shift()
            }
            let i=cand[0],j=cand[1]

            if(left.length==0 &&matrix[i][j]==='#')return seated

        
            let sum1=0
            if(check(i,j,matrix)==true){
                let m1=JSON.parse(JSON.stringify(matrix))
                m1[i][j]=1
                ways.forEach(([a,b])=>{
                    if(i+a<0||j+b<0||(i+a>=S.length)||(j+b>=S[0].length)){

                    }
                    else{
                        m1[i+a][j+b]='#'
                    }
                })
                
                sum1=helper(m1,[...left],seated+1)

            }
            let m2=JSON.parse(JSON.stringify(matrix))
            m2[i][j]='#'
            
           return Math.max(sum1,helper(m2,[...left],seated)) 
        }
        else{

            return seated
        }
    }
    
    

    return helper(S,proc,0)+standard

};

var TweetCounts = function() {
    this.dict={}
};

/** 
 * @param {string} tweetName 
 * @param {number} time
 * @return {void}
 */
TweetCounts.prototype.recordTweet = function(tweetName, time) {
    if(this.dict[tweetName]!==undefined)this.dict[tweetName].push(time)
    else this.dict[tweetName]=[time]
    
};

/** 
 * @param {string} freq 
 * @param {string} tweetName 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {number[]}
 */
TweetCounts.prototype.getTweetCountsPerFrequency = function(freq, tweetName, startTime, endTime) {
    let magic=0
    if(freq=='minute')magic=60
    else if(freq=='hour')magic=60*60
    else if(freq=='day')magic=60*60*24
    let result=Array((endTime - startTime + magic) / magic).fill(0)
    
    this.dict[tweetName].forEach(time=>{
        if(time<startTime||time<endTime){}
        else{
            let i = (time - startTime) / magic;
        result[i]++
        }
        
    })
    return result
};

console.log(maxStudents(
    [[".","#","#","."],
     [".",".",".","#"],
     [".",".",".","."],
     ["#",".","#","#"]]
))