// You are the manager of a basketball team. For the upcoming tournament, you want to choose the team with the highest overall score. The score of the team is the sum of scores of all the players in the team.

// However, the basketball team is not allowed to have conflicts. A conflict exists if a younger player has a strictly higher score than an older player. A conflict does not occur between players of the same age.

// Given two lists, scores and ages, where each scores[i] and ages[i] represents the score and age of the ith player, respectively, return the highest overall score of all possible basketball teams




// Given an array of pairs [score,age]
// form the team with the biggest score, such that for every element in the team
// score[i]<score[j] <=> age[i]<age[j]

// O(n^2) dp
var bestTeamScore = function(scores, ages) {
    let people=scores.map((d,i)=>[d,ages[i]]),n=people.length
    // people[i]=[score,age]

    //dp[i]= the team with the biggest score up to index i
    //     = Max(dp[j])+score[i], such that j<i and ages[j]<ages[i] //if i sort score ascending 
    people.sort((a,b)=>a[0]==b[0]?a[1]-b[1]:a[0]-b[0])//everything ascending
    let dp=[...Array(n)].map(d=>0)
    dp[0]=people[0][0]// the first person's score

    for (let i = 1; i < n; i++) {
        let [si,ai]=people[i]
        for (let j = 0; j < i; j++) {
            let [sj,aj]=people[j]
            if(ai>=aj&&si>=sj)// if possible, extend some team of the past by the ith ele
                dp[i]=Math.max(dp[i],dp[j]+si,si)
            else // or start a new team with the i-th element
                dp[i]=Math.max(dp[i],si)
        }
    }
    return Math.max(...dp)
}
//similar to LIS, we can optimize to O(nlogn) complexity
// patience sorting: revisit

console.log(
    bestTeamScore(
        [1,3,7,3,2,4,10,7,5],
[4,5,2,1,1,2,4,1,4]
    )
)
