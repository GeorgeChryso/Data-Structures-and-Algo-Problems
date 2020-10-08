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
// Helper function
var numWays=(Arr)=>{
    let maxSum=Arr.reduce((acc,curr)=>acc+curr)
    let dp=[...Array(Arr.length+1)].map(d=>[...Array(maxSum+1).fill(0)])
    //dp[i][k]= number of ways of reaching sum k using the first i elements 
    //basecase 
    dp[0][0]=1
    for (let i = 1; i <= Arr.length; i++) {
        for (let k =maxSum; k>=0; k--) {//this doesnt really need to start from the end. but ok
            if(k>=Arr[i-1])dp[i][k]+=dp[i-1][k-Arr[i-1]]
            dp[i][k]+=dp[i-1][k]            
        }        
    }
    return dp 
}

//the above function can of course be reduced to O(maxSum) space
var numWaysShort=(Arr)=>{
    let maxSum=Arr.reduce((acc,curr)=>acc+curr)
    let dp=[...Array(maxSum+1)].map(d=>0)
    //dp[k]= number of ways of reaching sum k using the first i elements 
    //basecase 
    dp[0]=1
    for (let i = 1; i <= Arr.length; i++) {
        for (let k =maxSum; k>=0; k--) { //this starts from the end in order to correctly consider the previous line
            if(k>=Arr[i-1])dp[k]+=dp[k-Arr[i-1]]
        }        
    }
    return dp //result means that u can reach sum k in result[k] ways
}


// ATTENTION
// $$$$$$ DP[i][S-A[i]] $$$$$ means: the number of ways to construct S by always choosing A[i] and some other elements before that. DP[i][S] means: the number of ways to construct S by choosing or NOT choosing A[i].  
 

// THAT MEANS:
// Dp[i][S-A[i]] can give me JUST the subsets that add up to S, but they ALSO include A[i]
// #MENACING

// This will help me with the problem of repeated combinations: 
// Example: A=[ 1, 2 ,3 ,4 ,5 ]

//dp[2][5]=1 because i can reach five with {2,3}
//dp[3][5]=2 because i can reach five with {2,3} and {1,4}

//Notice that in both cases {2,3} is repeated?

//to remedy that, I can use DP[i][S-A[i]] instead, to always include the last element in my selection,meaning:
// dp[2][5-3]=dp[2][2]=1 I can get sum=2 by taking  {2}, but that means that i can reach sum five by 1 combination,. {2,3} (always including the last element  3)
// whereas
// dp[3][5-4]=dp[3][1]=1 I can get sum=1 by taking the first element{1},that means though that i can reach sum five by 1 combination, {1,4} =>always getting the last element 4

//See, by doing that, no combination is repeated. Both {2,3} and {1,4} were taken only once, as they should have.

//BUT WHYYY?
// Because dp[i][S-A[i]] does not count any previous combination of any dp[k][S], as in, S is not even reachable with the items dp[i][S-A[i]] considers.

//boilerplate for combinations




var howMany=A=>{
    let n=A.length,MaxSum=A.reduce((acc,curr)=>acc+curr),

    //boilerplate for combinations
    combmemo=[...Array(n+1)].map(d=>[...Array(n+1)]) //combinations n choose k 

    var combinations=(n,k)=>{
        //base cases
        if(n===k||k===0)return 1
        if(k==1)return n
        if(combmemo[n][k]!==undefined)return combmemo[n][k]
        combmemo[n][k]=combinations(n-1,k-1)+combinations(n-1,k)//known formula
        return combmemo[n][k]
    }

    A.sort((a,b)=>a-b)//we want to find a split point on the sorted list to satisfy Policy 1

    //          I will create 2 matrices


    // WaysBelow is an n x Sum(MaxSum) matrix
    let WaysBelow=numWays(A)
    // where WaysBelow[i][s]= the number of ways to reach sum s using(some of)the first i elements
    // WaysAbove isa  nx Sum(MaxSum)matrix 
    //WaysBelow.forEach(d=>console.log(d+''))



    let B=[...A] // i reverse this because i m gonna be cutting 
    B.reverse()
    let WaysAbove=numWays(B)
    // where WaysAbove[i][s]= the number of ways to reach sum s using(some of)the last i items
    //WaysAbove.forEach(d=>console.log(d+''))


    //then
    let result=0

    //for every cut point (cut point doesnt actually go well with what i m doing regarding DUPLICATES (read below))
    // but rather, it is a cut point that separates different elements and not duplicates
    for (let i = 0; i <n; ) {
        let count=1 //count of consecutive A[i] s (duplicates)
        while(i+count<n&&A[i+count]==A[i]){
            count++
        }        
        //how many A[i]'s am I (BOB)gonna use?
        for (let j = 1; j <=count; j++) { // <======== DO NOT think of this as a cut , it's just the POSSIBLE number of the same elements i m allowed to pick 
            let startSum=A[i]*j // I m using  j  A[i]'s
            // so i m gonna update the sums from this point onwards
            for (let sum = startSum; sum <=MaxSum; sum++){
                result+=combinations(count,j) * WaysBelow[i][sum-(A[i]*j)] * WaysAbove[n-i-j][sum]
            }
            //in how many ways can I Pick these A[i]'s //include the A[i] //# of ways onwards
        }

        //noticethat i m incrementing my i by the count
        i+=count
    }

    return result  
}
//https://stackoverflow.com/questions/48059479/need-help-understanding-the-solution-for-the-jewelry-topcoder-solution/48061551#48061551

// QUESTION: What I cannot understand: Why do duplicates mess up the result?
// ANSWER: That was easy afterall, consider the array [5,5] and target =10
// what are the results? 
// output should be 2, because bob can take both the first 5 and the second 5, 
// with the possible answers being [[5,5], [5,5]]
// this is precisely why WaysBelow[sum-A[i]]*WaysAbove[sum] WOULDNT work, because 
// waysbelow would be 1 ( the first 5) and ways Above would be 1 ( the second 5)
// so the result would be 1*1=1 =/= 2 (THE CORRECT ANSWER)

// Remedy: 

// Combinatorics: 
// Example: 
// Say I have an array of [1,2,2,2,2,4]

// I have calculated my waysAbove and WaysBelow Tables through typical knapsack
// Now, during my typical iteration of elements, i come across the first 2
// Let's say that Bob and Patrick want to both pick elements that add up to 2. 
// Now that would have to be 
// [{2},{2}] but with all the combinations of two's  possible. 









//short no commenting
var numWays=(Arr)=>{
    let maxSum=Arr.reduce((acc,curr)=>acc+curr),dp=[...Array(Arr.length+1)].map(d=>[...Array(maxSum+1)].map(dd=>0))
    dp[0][0]=1
    for (let i = 1; i <= Arr.length; i++) 
        for (let k =maxSum; k>=Arr[i-1]; k--) 
            dp[i][k]=dp[i-1][k-Arr[i-1]]+dp[i-1][k] 
    return dp 
}
var howMany=A=>{
    let n=A.length,MaxSum=A.reduce((a,c)=>a+c),combmemo=[...Array(n+1)].map(d=>[...Array(n+1)]) 
    var combinations=(n,k)=>{
        if(n===k||k===0)return 1
        if(combmemo[n][k]===undefined)
            combmemo[n][k]=combinations(n-1,k-1)+combinations(n-1,k)
        return combmemo[n][k]
    }
    A.sort((a,b)=>a-b)
    let WaysBelow=numWays(A),B=[...A].reverse(),WaysAbove=numWays(B),result=0,count=1
    for (let i = 0; i <n; i+=count ) {
        count=1
        while(i+count<n&&A[i+count]==A[i])count++
        for (let j = 1; j <=count; j++) 
            for (let sum = A[i]*j; sum <=MaxSum; sum++)
                result+=combinations(count,j) * WaysBelow[i][sum-A[i]*j] * WaysAbove[n-i-j][sum]
    }
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


cases.forEach(d=>console.log(howMany(d)))