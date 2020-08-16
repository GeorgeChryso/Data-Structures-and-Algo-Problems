// You have been given a list of jewelry items that must be split amongst two people: Frank and Bob. Frank likes very expensive jewelry. Bob doesn't care how expensive the jewelry is, as long as he gets a lot of jewelry. Based on these criteria you have devised the following policy:
// 1) Each piece of jewelry given to Frank must be valued greater than or equal to each piece of jewelry given to Bob. In other words, Frank's least expensive piece of jewelry must be valued greater than or equal to Bob's most expensive piece of jewelry.
// 2) The total value of the jewelry given to Frank must exactly equal the total value of the jewelry given to Bob.
// 3) There can be pieces of jewelry given to neither Bob nor Frank.
// 4) Frank and Bob must each get at least 1 piece of jewelry.

//Constraints
// -	values will contain between 2 and 30 elements inclusive.
// -	Each element of values will be between 1 and 1000 inclusive.

// Given the value of each piece, you will determine the number of different ways you can allocate the jewelry to Bob and Frank following the above policy

//EXAMPLE
// values = {1,2,5,3,4,5}
// Valid allocations are:
//   Bob       		Frank
//   1,2		         3
//   1,3        		 4
//   1,4		         5  (first 5)
//   1,4         		 5  (second 5)
//   2,3 		         5  (first 5)
//   2,3         		 5  (second 5)
//    5  (first 5)		 5  (second 5)
//    5  (second 5)	 5  (first 5)
// 1,2,3,4       		5,5
// Note that each '5' is a different piece of jewelry and needs to be accounted for separately. There are 9 legal ways of allocating the jewelry to Bob and Frank given the policy, so your method would return 9.



//calculates the number of ways to reach various sums (Knapsack Variant)
var numWays=(Arr)=>{
    let maxSum=Arr.reduce((acc,curr)=>acc+curr)
    let dp=[...Array(Arr.length+1)].map(d=>[...Array(maxSum+1).fill(0)])
    //dp[i][k]= number of ways of reaching sum k using the first i elements 
    //basecase 
    dp[0][0]=1
    for (let i = 1; i <= Arr.length; i++) {
        for (let k =maxSum; k>=0; k--) {
            if(k>=Arr[i-1])dp[i][k]+=dp[i-1][k-Arr[i-1]]
            dp[i][k]+=dp[i-1][k]            
        }        
    }
    return dp[Arr.length] //result means that u can reach sum k in result[k] ways
}

//the above function can of course be reduced to O(maxSum) space
var numWays=(Arr)=>{
    let maxSum=Arr.reduce((acc,curr)=>acc+curr)
    let dp=[...Array(maxSum+1)].map(d=>0)
    //dp[k]= number of ways of reaching sum k using the first i elements 
    //basecase 
    dp[0]=1
    for (let i = 1; i <= Arr.length; i++) {
        for (let k =maxSum; k>=0; k--) {
            if(k>=Arr[i-1])dp[k]+=dp[k-Arr[i-1]]
        }        
    }
    return dp //result means that u can reach sum k in result[k] ways
}
console.log(numWays([1,2,5,3,4,5]))

let howMany=J=>{
    let result=0
    J=J.sort((a,b)=>a-b)//we want to find a split point on the sorted list to satisfy Policy 1


    return result
}






let cases=[
    [1,2,5,3,4,5], //9
    [1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000], //18252025766940
    [1,2,3,4,5],//4
    [7,7,8,9,10,11,1,2,2,3,4,5,6],//607
    [123,217,661,678,796,964,54,111,417,526,917,923] //0
]