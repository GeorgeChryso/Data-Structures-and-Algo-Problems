process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    function main() {
        let [n,m]=readline().split(' ').map(d=>Number(d))
        let A=[]
        for (let i = 0; i < n-1; i++) 
            A.push(readline().split(' ').map(d=>Number(d)))          
        let [k,x]=readline().split(' ').map(d=>Number(d))
          
        let result=solve(n,m,A,k,x)
        console.log(result.toString())
    }
    main();    
});


/* number of ways of assigning types from 1 to m to
     n tree nodes such that :
        there are at most x nodes of type k
        all adjacent nodes of a type k node, have their type<k
        (no two adjacent nodes can be of type k)
    
    A tree can be assigned M numbers to any of its N nodes. K<=M is a special number such that:
        there are at most X nodes assigned K,
        All adjacent nodes to a K node are assigned a number Q<K 

    dp[i][j][k] represents the count of numberings 
    where j  numbers are selected in the subtree rooted at i,
    and the state of the current node i is k .
*/
let solve=(n,m,A,k,x)=>{
    let mod=1e9+7


}