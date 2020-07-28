// You are given a char array representing tasks CPU need to do. It contains capital letters A to Z where each letter represents a different task. Tasks could be done without the original order of the array. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

// However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

// You need to return the least number of units of times that the CPU will take to finish all the given tasks.

 

// Example 1:

// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation: 
// A -> B -> idle -> A -> B -> idle -> A -> B
// There is at least 2 units of time between any two same tasks.
// Example 2:

// Input: tasks = ["A","A","A","B","B","B"], n = 0
// Output: 6
// Explanation: On this case any permutation of size 6 would work since n = 0.
// ["A","A","A","B","B","B"]
// ["A","B","A","B","A","B"]
// ["B","B","B","A","A","A"]
// ...
// And so on.
// Example 3:

// Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
// Output: 16
// Explanation: 
// One possible solution is
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A


//O(m*(mlogm + n))
var leastInterval = function(tasks, n) {
    let memo={}
    let total=tasks.length
    for (const ele of tasks) {
        memo[ele]=(memo[ele]||0)+1
    }
    let result=[]
    let arr=Object.keys(memo)

    let idx=0
    while(total){
        arr.sort((a,b)=>memo[b]-memo[a])
        idx=0
        for (let i = 0; i <= n; i++) {
            if(!total)break
            if(idx===arr.length){
                result.push('IDLE')
            }
            else{
                if(memo[arr[idx]]){
                    result.push(arr[idx])
                    memo[arr[idx]]--
                    idx++
                    total--
                }
                else{
                    idx++
                    i--
                }

            }
        }
    }
    return result.length
};

console.log((leastInterval(
    ["A","A","A","A","A","A","B","C","D","E","F","G"],2
)))