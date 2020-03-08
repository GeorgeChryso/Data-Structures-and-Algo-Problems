// A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company has is the one with headID.

// Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also it's guaranteed that the subordination relationships have a tree structure.

// The head of the company wants to inform all the employees of the company of an urgent piece of news. He will inform his direct subordinates and they will inform their subordinates and so on until all employees know about the urgent news.

// The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e After informTime[i] minutes, all his direct subordinates can start spreading the news).

// Return the number of minutes needed to inform all the employees about the urgent news.


// Input: n = 1, headID = 0, manager = [-1], informTime = [0]
// Output: 0
// Explanation: The head of the company is the only employee in the company

// Input: n = 7, headID = 6, manager = [1,2,3,4,5,6,-1], informTime = [0,6,5,4,3,2,1]Output: 21

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
