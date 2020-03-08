


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


//BFS
var numOfMinutes = function(n, headID, manager, informTime) {

    let manages={} // key: boss, val:[i1,i2...] where i subordinates of boss
    for (let i = 0; i < manager.length; i++) {
        if(manager[i]===-1)continue
        if(manages[manager[i]]===undefined)manages[manager[i]]=[i]
        else manages[manager[i]].push(i)        
    }

    let result=0

    // pairs of [currentNode,timesoFar]
    let q=[[headID,0]]
    while(q.length){
        let tempu=[]

        for (const [curr,it] of q) {
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
    
    //adjacency Matrix
    let edges=[...Array(n+1)].map(d=>Array(n+1).fill(Infinity))
    for (const [source,to] of conns) {
        edges[source][to]=true
        edges[to][source]=true
    }


    let start=new Set()
    start.add(1)

    let q=[ [start,1,1] ] // [Set of visited nodes,currnode,currProbability]


    let time=0
    while(time<t){
        let temp=[]
        
        for (const [set,currnode,probability] of q) {


            //count how many available children my currnode has
            let prob=0
            for (let i = 0; i < edges[currnode].length; i++) {
                if(edges[currnode][i]!==Infinity && !set.has(i)){
                   prob++
                }                
            }

            //I want to maintain the triplet of my target if no other children are available
            if(currnode==target&&prob==0){
                temp.push([set,currnode,probability])
                continue
            }

            //push the children nodes to my q
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

    //check my end queue for all the potential target nodes
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