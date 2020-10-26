// There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

// In each round of the game, Alice divides the row into two non-empty rows (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice's score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.

// The game ends when there is only one stone remaining. Alice's is initially zero.

// Return the maximum score that Alice can obtain.
// Example 1:

// Input: stoneValue = [6,2,3,4,5,5]
// Output: 18
// Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11.
// In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5).
// The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.
// Example 2:

// Input: stoneValue = [7,7,7,7,7,7,7]
// Output: 28
// Example 3:

// Input: stoneValue = [4]
// Output: 0
 

// Constraints:

// 1 <= stoneValue.length <= 500
// 1 <= stoneValue[i] <= 10^6


// prefix sum, + interval dp 
var stoneGameV = function(stoneValue) {
    // prefix Sum for O(1) range sum queries
    let prefixSum=[0],n=stoneValue.length
    for(let i=0;i<n;i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+stoneValue[i])

    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))

    //basecases
    for(let i=0;i<n;i++)
        dp[i][i]=0
    
    for (let len = 2; len <= n; len++) 
        for (let i = 0; i <n-len+1; i++) {
            let j=i+len-1
            for (let k = 0; k < j; k++) {
                let leftSum=prefixSum[k+1]-prefixSum[i],
                    rightSum=prefixSum[j+1]-prefixSum[k+1]
                // only take the minimum prefixsum choice every time
                if(leftSum>rightSum) //you can only pick right
                    dp[i][j]=Math.max(dp[i][j],dp[k+1][j]+rightSum)
                else if(leftSum<rightSum)
                    dp[i][j]=Math.max(dp[i][j],dp[i][k]+leftSum)
                else
                    //if they re equal, we need to consider the overall gain instead
                    // cos we re considering both intervals
                    dp[i][j]=Math.max(
                                    dp[i][j],
                                    dp[i][k]+leftSum,
                                    dp[k+1][j]+rightSum
                                )
            }            
        }        
    return dp[0][n-1]
};
        

//Knuth Optimization
var stoneGameV = function(stoneValue) {
    let prefixSum=[0],n=stoneValue.length
    for(let i=0;i<n;i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+stoneValue[i])

    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0)),
        h=[...Array(n)].map(d=>[...Array(n)].map(d=>0)) //argmax(dp[i][j])

    for(let i=0;i<n;i++)
        dp[i][i]=0,
        h[i][i]=i
    
    for (let len = 2; len <= n; len++) 
        for (let i = 0; i <n-len+1; i++) {
            let j=i+len-1
            for (let k = Math.max(h[i][j-1]-1,0); k < Math.min(j,h[i+1][j]+2); k++) {
                let leftSum=prefixSum[k+1]-prefixSum[i],
                    rightSum=prefixSum[j+1]-prefixSum[k+1]
                if(leftSum>rightSum && dp[i][j]<dp[k+1][j]+rightSum) 
                    dp[i][j]=dp[k+1][j]+rightSum,
                    h[i][j]=k
                else if(leftSum<rightSum && dp[i][j]<dp[i][k]+leftSum)
                    dp[i][j]=dp[i][k]+leftSum,
                    h[i][j]=k
                else if(leftSum==rightSum && dp[i][j]<Math.max(dp[i][k]+leftSum,dp[k+1][j]+rightSum))
                    dp[i][j]=Math.max(dp[i][k]+leftSum,dp[k+1][j]+rightSum),
                    h[i][j]=k
            }            
        }        
    return dp[0][n-1]
};


console.log(stoneGameV(
   [206497,594973,865673,967312,704343,85637,383732,731741,703915,790651,686737,243077,843113,701624,928171,343208,569476,488937,44456,600411,778974,773712,50060,131657,136641,727566,261762,41568,678086,951813,289511,923301,355868,850517,339661,433621,141106,913322,655047,273662,23432,286124,544989,694351,556786,968543,39297,26659,969375,941882,91787,221930,430721,560978,208360,836069,600879,227093,712077,379315,777182,973221,652974,491966,553893,191462,49535,9773,877320,783147,106631,915520,79476,868650,168592,913895,604071,713370,697993,201451,246475,306954,388851,876459,569337,749749,486963,393369,61960,824524,353302,1581,72574,104660,95005,353138,724022,587336,269626,698110,810492,213803,1617,836860,251761,113991,766626,638988,333731,570699,968995,985772,563165,84651,123745,96938,247000,205374,437824,271007,531083,744838,994988,992134,659662,696301,918676,470200,930543,373176,108293,232128,560013,919258,830704,492787,549802,842802,834173,661401,4314,692085,642055,607233,594683,145322,178801,773520,69721,576349,674578,972312,56905,63453,709056,562812,792344,587003,776160,702221,359238,652690,392247,544520,800695,100698,191774,263091,214046,130917,225359,474876,961377,327622,754235,11166,872941,793874,96770,452331,611136,981264,233723,608094,907849,750226,187157,418844,541218,444735,121394,543277,802677,939200,687396,412566,203256,922990,190833,608995,244692,196273,921030,322820,504977,774165,948887,42667,760470,115428,311617,909425,531554,509908,827134,437290,410895,712586,275753,228572,763420,104989,526772,745305,241560,263314,313906,492770,375437,766020,356748,197933,691295,273962,765102,522331,518363,923273,980196,354838,195139,170027,270128,23877,285367,209611,512489,745827,17610,97656,892308,43553,546603,650506,561837,788928,821432,508235,795733,504376,203356,946572,657292,391466,167916,920821,295075,455246,655441,903629,931734,893047,341374,848239,263378,623131,185952,423658,489401,467032,157525,748303,290439,79824,377975,936682,757747,226112,659371,233862,136967,486646,704557,514292,626559,193217,317444,796790,839966,992428,761763,798643,30066,468602,762869,132865,730038,205165,614812,108972,194164,200509,185013,757685,990912,191517,200813,237234,491334,142357,80144,787928,910730,809050,786015,61397,259581,995663,34998,680142,472589,45033,369418,122255,610279,910352,230606,881411,251756,816331,927385,533372,748238,611756,438771,131119,90563,238718,483662,650437,933987,380193,848464,394233,101042,739953,919079,55059,802205,239180,89928,42660,590369,753787,16161,529951,267547,454064,627376,934603,915440,716609,187241,857946,368594,929853,894097,753774,351765,897711,619228,683574,147586,217485,827991,470709,269194,804352,273650,260402,331555,827490,696820,724322,660864,37994,925822,458399,521378,938096,242598,672374,89071,278539,135745,338245,133532,634049,873370,760396,956368,414045,352083,554537,799561,985425,98350,788811,958095,63605,232736,627493,564600,925727,943031,502514,29248,188403,922321,925188,373911,30805,221828,64711,523619,766326,518144]
))

console.log(stoneGameV(
    //[2,3,1,4] //7
    [6,2,3,4,5,5] //18
))