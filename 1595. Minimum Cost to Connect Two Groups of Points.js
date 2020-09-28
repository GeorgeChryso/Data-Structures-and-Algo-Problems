// You are given two groups of points where the first group has size1 points, the second group has size2 points, and size1 >= size2.

// The cost of the connection between any two points are given in an size1 x size2 matrix where cost[i][j] is the cost of connecting point i of the first group and point j of the second group. The groups are connected if each point in both groups is connected to one or more points in the opposite group. In other words, each point in the first group must be connected to at least one point in the second group, and each point in the second group must be connected to at least one point in the first group.

// Return the minimum cost it takes to connect the two groups


// Input: cost = [[15, 96], [36, 2]]
// Output: 17
// Explanation: The optimal way of connecting the groups is:
// 1--A
// 2--B
// This results in a total cost of 17.


// Contest Approach: Brute Force Bit Mask TLE
var connectTwoGroups = function(cost) {
    let n=cost.length,m=cost[0].length
    let result=Infinity
    let masksums=[...Array(n)].map(d=>[...Array(1<<m)].map(d=>0))
    let memo=[...Array(n)].map(d=>Infinity)
    for (let i = 0; i < n; i++) {
        for (let mask = 1; mask < (1<<m); mask++) {
            masksums[i][mask]=0
            for (let j = 0; j <m; j++) {
                if(mask&(1<<j))
                    masksums[i][mask]+=cost[i][j]
            }
        }        
    }
   
    let recursion=(i,curr,costsofar)=>{

        if(i>=n){
            if((curr==(1<<m)-1)&&costsofar<result){
                return result=costsofar
            }
            else
                return
        }

        let com=((1<<m )-1)&(~curr)
        for (let mask = com;mask>0; mask=((mask-1)&com)) {
            let c=masksums[i][mask]
            memo[i]=costsofar+c
            recursion(i+1,curr|mask,costsofar+c)            
        }

    }
    recursion(0,0,0)
    return result
};


// dfs TLE, better
var connectTwoGroups = function(cost) {
    let n=cost.length,m=cost[0].length
    //cheapest way to connect elements of group two to group one
    let cheapSkate=[...Array(m)].fill(Infinity)
    for (let j = 0; j < m; j++) 
        for (let i = 0; i < n; i++)
            cheapSkate[j]=Math.min(cheapSkate[j],cost[i][j])            

    let res=Infinity
    // Here i try to connect every element of the first group
    // But I do it naively, checking each possible combination
    let dfs=(i,mask,totcost)=>{
        if(i==n){ //when the end is reached, any non connected nodes from group 2
            // are connnected with the minimum edge to the first group
            for (let i = 0; i < m; i++) {
                if((mask&(1<<i))==0)
                    totcost+=cheapSkate[i]
            }
            res=Math.min(res,totcost)
            return
        }
        for (let j = 0; j < m; j++) {
            let newm=mask|(1<<j)
            dfs(i+1,newm,totcost+cost[i][j])
        }
    }
    dfs(0,0,0)
    return res
};


// dfs memo bottom up dp
// Try each possible way to send out ONLY ONE EDGE from group one to group two
// FILL THE REMAINING NON CONNECTED EDGES FROM GROUP TWO, WITH THE CHEAPEST EDGES POSSIBLE
var connectTwoGroups = function (cost) {
    let n=cost.length,m=cost[0].length
    //cheapest way to connect elements of group two to group one
    let cheapSkate=[...Array(m)].fill(Infinity)
    for (let j = 0; j < m; j++) 
        for (let i = 0; i < n; i++)
            cheapSkate[j]=Math.min(cheapSkate[j],cost[i][j])            

    //the MINIMIMUM cost to connect the remaining n-i elements of the FIRST group with a mask m
    //dp[i][m]= Min(...dp[i+1][m|(1<<j)]+cost[i][j]) for every j
    let dp=[...Array(n)].map(d=>[...Array(2**m)].fill(-1))

    let dfs=( i, mask)=> { //dfs(i,j) is the MINIMUM cost to connect the REMAINING n-i elements of group 1, with a mask of already used elements from group 2 mask
        
        if (i == n) { // all the items from the first group are connected. 
            let remaining=0 //now u need to connect the non connected items from group 2
            for (let j = 0; j < m; j++)  // which I will do so, with the minimum cost already computed
                if ((mask & (1 << j)) === 0) 
                remaining += cheapSkate[j]
            return remaining 
        } 

        if (dp[i][mask] !== -1) 
            return dp[i][mask]

        let res = Infinity
        for (let j = 0; j < m; j++) 
            res = Math.min(
                res,
                cost[i][j] + dfs( i + 1, mask | (1 << j) )//connect i with j and take the minimum of the remaining elements
            )
        
        dp[i][mask] = res
        return res
    }
    
    return dfs( 0, 0 )
  }


  //there is another solution with polynomial time regarding bipartite matching. 
  console.log(connectTwoGroups(
    [[2,5,1],[3,4,7],[8,1,2],[6,2,4],[3,8,8]]
  ))