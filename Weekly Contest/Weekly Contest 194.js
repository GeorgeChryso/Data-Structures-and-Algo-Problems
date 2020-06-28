
var xorOperation = function(n, start) {
    

    let nums=[...Array(n)].map((d,i)=>start+2*i)
    return nums.reduce((acc,curr)=>acc^curr)
};




var getFolderNames = function(names) {
    
    let memo={}

    return names.map((d)=>{

        if(d[d.length-1]===')'){
            let i=d.length-2
            while(d[i]!=='('&&i>=0)i--


            if(i>=0){
                let k=d.slice(i+1,d.length-1)
                let answ=d.slice(0,i)
                if(memo[answ]===undefined){
                    memo[answ]=[1,new Set(...[Number(k)])]
                }
                else{
                    if(memo[answ][0]==k){
                        memo[answ][0]++
                        memo[answ][1].add(Number(k))
                        memo[d]= (memo[d]||0) +1
                        return ''+d+'('+(memo[answ])+')'
                    }
                    else{

                    }

                }

            }
            else{
                memo[d]=[1,new Set(...[1])]
            }
        }
        else{
            if(memo[d]===undefined){
                memo[d]=0
                return d
            }
            else{
                memo[d]++
                let answ=''+d+'('+(memo[d])+')'
                while(memo[answ]!==undefined){
                    answ=answ+'(1)'
                }
                memo[answ]=0
                return answ
            }
        }
      

    })

};






var avoidFlood = function(rains) {
    let memo={}
    let zeroes=[]
    for (let i = 0; i < rains.length; i++) {
        if(rains[i]===0){
            zeroes.push(i)
        }        
        else{
            if(memo[rains[i]]!==undefined){
                    let flag=false
                    for (let j = 0; j <zeroes.length; j++) {
                        if(zeroes[j]>memo[rains[i]]){
                            rains[zeroes[j]]=rains[i]
                            zeroes[j]=-1
                            flag=true
                            break
                        }
                        
                    }

                if(flag===false)return []
                memo[rains[i]]=i
                
            }   
            else{
                memo[rains[i]]=i
            }
            rains[i]=-1
        }
    }
    return rains.map(d=>d==0?1:d)
};


console.log(avoidFlood(
    [69,0,0,0,69]
))