


var generateTheString = function(n) {
    
    let result=''

    if(n%2==0){
        for (let i = 0; i <n-1; i++) {
            result+='x'
        }
        result+='y'
    }
    else {
        for (let i = 0; i <n; i++) {
            result+='y'
        }

    }
    return result
};



var numTimesAllBlue = function(L) {
    let result=0
    let left=new Set()

    let extra=new Set()

    for (let i = 0; i < L.length; i++) {
        let curr=i+1
 
        if(left.has(L[i]))left.delete(L[i])
        else{
            extra.add(L[i])

        }
        if(extra.has(curr))extra.delete(curr)
        else{
            left.add(curr)

        }

      
       
        if(left.size===extra.size && extra.size===0)result++
    }
    
    return result
};



var numOfMinutes = function(n, headID, manager, informTime) {

    let manages={}

    for (let i = 0; i < manager.length; i++) {
        if(manager[i]===-1)continue
        if(manages[manager[i]]===undefined)manages[manager[i]]=[i]
        else manages[manager[i]].push(i)        
    }

    let result=0
    let q=[[headID,0]]
    while(q.length){
        let tempu=[]

        while(q.length){
            let [curr,it]=q.shift()
            if(manages[curr]===undefined){
                result=Math.max(result,it)
                continue
            }

            for (let i = 0; i < manages[curr].length; i++) {
               tempu.push([manages[curr][i],it+informTime[curr]])           
            }
        }
       
        q=tempu
    }   
    return result
};


// BFS
var frogPosition = function(n, conns, t, target) {
    
    let edges=[...Array(n+1)].map(d=>Array(n+1).fill(Infinity))

    for (const [source,to] of conns) {
        edges[source][to]=true
        edges[to][source]=true
    }

    let magic=edges[target].reduce((acc,curr)=>acc+Number(curr!==Infinity),0)
    console.log(`magic`,magic)


    let time=0
    let start=new Set()
    start.add(1)
    let q=[[start,1,1]]
    while(time<t){
        console.log(q)
        let temp=[]
        
        for (const [set,currnode,probability] of q) {


            let prob=0
            for (let i = 0; i < edges[currnode].length; i++) {
                if(edges[currnode][i]!==Infinity && !set.has(i)){
                   prob++
                }                
            }

            
            if(currnode==target&&prob==0){
                temp.push([set,currnode,probability])
                continue
            }
            for (let i = 0; i < edges[currnode].length; i++) {
                if(edges[currnode][i]!==Infinity && !set.has(i)){
                    let cloned=new Set(set)
                    cloned.add(i)
                    temp.push( [cloned,i,probability*1/prob])
                }                
            }
        }

        q=temp
        time++
    }

    let result=0
    for (const [set,currnode,probability] of q) {
        if(currnode==target){
            if(result==0)result=probability
            else result*=probability}
    }

    return result
};
console.log(
    frogPosition(
        8,
        [[2,1],[3,2],[4,1],[5,1],[6,4],[7,1],[8,7]],
        7,
        7
    ))