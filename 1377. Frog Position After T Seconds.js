// Given an undirected tree consisting of n vertices numbered from 1 to n. A frog starts jumping from the vertex 1. In one second, the frog jumps from its current vertex to another unvisited vertex if they are directly connected. The frog can not jump back to a visited vertex. In case the frog can jump to several vertices it jumps randomly to one of them with the same probability, otherwise, when the frog can not jump to any unvisited vertex it jumps forever on the same vertex. 

// The edges of the undirected tree are given in the array edges, where edges[i] = [fromi, toi] means that exists an edge connecting directly the vertices fromi and toi.

// Return the probability that after t seconds the frog is on the vertex target.



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

    let result=0
    for (const [set,currnode,probability] of q) {
        if(currnode==target){
            if(result==0)result=probability
            else result*=probability}
    }

    return result
};