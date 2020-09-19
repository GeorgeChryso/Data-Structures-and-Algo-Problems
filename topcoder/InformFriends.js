// You wish to share as many facts as possible with a group of N people, but you only have time to tell one fact to each person in the group. When you tell someone a fact, you also instruct them to tell all their friends. However, the friends do not tell their friends: if A and B are friends, B and C are friends, but A and C are not friends, then after telling the fact to A it will be passed on to B but not to C. You must tell each fact to enough people so that every person either hears the fact from you, or is a friend of someone who heard it from you.

// friends contains N strings of N characters, each of which is either 'Y' or 'N'. The jth character of the ith element is 'Y' if members i and j are friends, and 'N' otherwise.
// Determine the maximum number of facts that can be shared with every person in the group.


// Constraints
// -friends will contain exactly N elements, where N is between 1 and 15, inclusive.
// -Each element of friends will contain exactly N characters.
// -Each character in friends will be either 'Y' or 'N'.
// -For i and j between 0 and N - 1, inclusive, character j of element i of friends will be the same as character i of element j.
// -For i between 0 and N - 1, inclusive, character i of element i of friends will be 'N'.








// -QUCIKLY, CALL AN AMBULANCE...
// . . .AFTER MULTIPLE WA 
// -BUT NOT FOR ME
//   3d question     ME 
// ┌( ͡° ͜ʖ ͡°)=ε/̵͇̿̿/’̿’̿ ̿  😨

// Essentially, asks me to find the MAXIMUM length of a PARTITION of my graph, into DOMINATING (disjoint) SUBSETS. A dominating subset means that every Node NOT in the subset is adjacent to at LEAST one node in the subset. The maximum length of a Partition into Dominating Subsets is called the DOMATIC NUMBER. 

/// TLDR observation: To find the domatic number of a set, you need to consider all its dominating subsets
// for each dominating subset B of a set A, the following holds:
// the difference A\B has always at least 1 Domatic number less than A, why?
// Because I can always just add B as an extra dominating subset, and create the partition 
// ( partition of (A\B) , B ) which adds 1 extra domianting subset to the picture ( B) and therefore
// increases the domatic number of A\B  by 1 ( 1 extra dominating subset (B) )
let FactthemUp=A=>{
    let N=A.length,
        dominating=[...Array(1<<N)].map(d=>false)// subset with binary rep i is Dominating
    // N<15, so I  can traverse each possible subset to determine whether it is DOMINATING
    // Aka, Any item NOT in the subset is connected with at least 1 item within the subset
    for (let subset = 0; subset <(1<<N); subset++) {
        let covers=subset // this will determine how many of the elements it covers
        // obviously, the subset covers itself
        for (let i = 0; i < N; i++) 
            for (let j = 0; j < N; j++) 
                //if the item i is present on my subset and covers the jth item
                if((subset&(1<<i))&&A[i][j]=='Y')
                    covers|=(1<<j)     //mark the j-th element as covered          

        if(covers==((1<<N)-1)) //if my subset is dominating (covers every node)
            dominating[subset]=true
    }
    //dp part
    let result=0,
        dp=[...Array(1<<N)].map(d=>0)//holds the DOMATIC number of subset with bin rep (i)
    //To find the domatic number of a subset A, we pick a dominating set D ⊆ A and note that the domatic number of A is at least one more than that of A − D, because as I 've already explained above, that means that the partition A-D,D is now possible increasing the domatic number by at least 1 (the new dominating subset D)


    for (let subset = 0; subset < (1<<N); subset++) {
        // A subset of a mask is a mask which has SOME of the ones of the original mask
        // for examle 0101 is a subset of 1101 
        //subsubset has to be a subset of my original subset

        // I can iterate immediately over all the subsets of subset with
        // subsubset=(subsubset-1)&subset, which generates the next subset of subset
        // BUT STARTING FROM subset to 0
        for(subsubset=subset;subsubset>0; ){
            // but NOT going through 0 
            if(dominating[subsubset]) //if it is a dominating subsubset
                dp[subset]=Math.max(dp[subsubset^subset]+1,dp[subset])
                // the difference between a set A and its subset B<=A is
                // A\B=A^B
            subsubset=(subsubset-1)&subset //generating the next subset of subset
        }
        result=Math.max(dp[subset],result)
    }

    //easier to come up with, but takes considerably more time because I have to generate ALL the subsets of subset
    // for (let subset = 0; subset < (1<<N); subset++) {
    //     //Instead I could just geenerate all the subsets OF my subset
    //     for(subsubset=0;subsubset<=subset;subsubset++ )
    //      // and ensure they re actually subsets if their union
    //         // equals the original subset
    //         if((subsubset|subset)==subset&&dominating[subsubset])// and take the similar formula for their diff
    //             dp[subset]=Math.max(dp[subsubset^subset]+1,dp[subset])
    //     result=Math.max(dp[subset],result)
    // }
    return result

}



let results=[14,15,5,7,1,6,3,1,3,2]
let testcases=[
    ["NYYYYYYYYYYYYYY", "YNYYYYYYYYYYYYY", "YYNYYYYYYYYYYYY", "YYYNYYYYYYYYYYY", "YYYYNYYYYYYYYYY", "YYYYYNYYYYYYYYY", "YYYYYYNYYYYYYYY", "YYYYYYYNYYYYYYY", "YYYYYYYYNYYYYYY", "YYYYYYYYYNYYYYY", "YYYYYYYYYYNYYYY", "YYYYYYYYYYYNYYY", "YYYYYYYYYYYYNYY", "YYYYYYYYYYYYYNN", "YYYYYYYYYYYYYNN"],
    ["NYYYYYYYYYYYYYY", "YNYYYYYYYYYYYYY", "YYNYYYYYYYYYYYY", "YYYNYYYYYYYYYYY", "YYYYNYYYYYYYYYY", "YYYYYNYYYYYYYYY", "YYYYYYNYYYYYYYY", "YYYYYYYNYYYYYYY", "YYYYYYYYNYYYYYY", "YYYYYYYYYNYYYYY", "YYYYYYYYYYNYYYY", "YYYYYYYYYYYNYYY", "YYYYYYYYYYYYNYY", "YYYYYYYYYYYYYNY", "YYYYYYYYYYYYYYN"],
    ["NYYYYYNYNYYNNYN", "YNNNNNYYYYNYYNN", "YNNNYYNNNYNNNNN", "YNNNNYYNYYNNYYY", "YNYNNNYYNNYYNYY", "YNYYNNNNYYYNYNN", "NYNYYNNNNYNNYNN", "YYNNYNNNYNNYYNY", "NYNYNYNYNNNYNNY", "YYYYNYYNNNNNYYY", "YNNNYYNNNNNYYNY", "NYNNYNNYYNYNYNN", "NYNYNYYYNYYYNNY", "YNNYYNNNNYNNNNY", "NNNYYNNYYYYNYYN"],
    ["NYYNYYNYYYYYNYY", "YNYYYNYNNYYYYNY", "YYNYYNYYYNNYYYN", "NYYNYYNYNYNNYYY", "YYYYNYNYYNNYYNN", "YNNYYNYYYNYYYNY", "NYYNNYNYNYYYYNY", "YNYYYYYNNNNYYNY", "YNYNYYNNNNYYYNY", "YYNYNNYNNNYYNYY", "YYNNNYYNYYNYYYY", "YYYNYYYYYYYNYNY", "NYYYYYYYYNYYNYN", "YNYYNNNNNYYNYNN", "YYNYNYYYYYYYNNN"],
    ["NYYNYYYYYYYYYYY", "YNYNYYYYYYYYYYY", "YYNNYYYYYYYYYYY", "NNNNNNNNNNNNNNN", "YYYNNYYYYYYYYYY", "YYYNYNYYYYYYYYY", "YYYNYYNYYYYYYYY", "YYYNYYYNYYYYYYY", "YYYNYYYYNYYYYYY", "YYYNYYYYYNYYYYY", "YYYNYYYYYYNYYYY", "YYYNYYYYYYYNYYY", "YYYNYYYYYYYYNYY", "YYYNYYYYYYYYYNY", "YYYNYYYYYYYYYYN"],
    ["NYNYYYYYNN", "YNNNYNYYYY", "NNNNYYYYYY", "YNNNYYNYYY", "YYYYNYYYYY", "YNYYYNYYYY", "YYYNYYNYYY", "YYYYYYYNYY", "NYYYYYYYNY", "NYYYYYYYYN"],
    ["NYYN",
    "YNYY",
    "YYNY",
    "NYYN"],
    ["NYYN",
    "YNYN",
    "YYNN",
    "NNNN"],
    ["NYNNNY",
    "YNYNNN",
    "NYNYNN",
    "NNYNYN",
    "NNNYNY",
    "YNNNYN"],
    ["NYNY",
    "YNYN",
    "NYNY",
    "YNYN"],
]

testcases.forEach((d,i)=>{
    console.log(FactthemUp(d)==results[i])
})