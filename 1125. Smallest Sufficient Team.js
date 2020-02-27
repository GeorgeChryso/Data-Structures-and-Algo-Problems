// In a project, you have a list of required skills req_skills, and a list of people.  The i-th person people[i] contains a list of skills that person has.

// Consider a sufficient team: a set of people such that for every required skill in req_skills, there is at least one person in the team who has that skill.  We can represent these teams by the index of each person: for example, team = [0, 1, 3] represents the people with skills people[0], people[1], and people[3].

// Return any sufficient team of the smallest possible size, represented by the index of each person.

// You may return the answer in any order.  It is guaranteed an answer exists.

 


var smallestSufficientTeam = function(req_skills, people) {
    let dictionary={}

    for (let i = 0; i < req_skills.length; i++) {
        dictionary[req_skills[i]]=i
    }

    maxskills=2**req_skills.length-1

    people=people.map((
        skillz=>{
            let final=0
            for (const skill of skillz) {
                final|=(1<<dictionary[skill])
            }
            return final
        }
    ))
    let unreachableElement=Array(people.length+1)
    //dp[i][j] will be the minimum students that need to be used to reach state j of skills
    let dp=[...Array(people.length+1)].fill(Array(maxskills+1).fill([Infinity,0,0]))
    //basecase
    dp[0][0]=[0,0,0]
    for (let i = 0; i < dp.length-1; i++) {
        let skill=people[i]
        for (let j = 0; j < dp[0].length; j++) {

            // dp[i+1][j|skill]=Math.min(dp[i][[j|skill]],dp[i+1][j|skill],1+dp[i][j])
            if(1+dp[i][j][0]<dp[i+1][j|skill][0]){
                let [chosen,first30,last30]=dp[i][j]
                if(i<=30)first30|=(1<<(i))
                else last30|=(1<<(i-30))
                dp[i+1][j|skill]=[chosen,first30,last30]
            }
            if(dp[i][j][0]<dp[i+1][j][0]){
                dp[i+1][j]=dp[i][j]
            }
         
        }
    }
    
    dp.forEach(d=>console.log(d))
    let result=[]
    let [chosen,first30,last30]=dp[people.length][maxskills]
    for (let i = 0; i <= 60; i++) {
        if(i<=30){
            if(first30&1)result.push(i)
            first30>>>=1
        }
        else{
            if(last30&1)result.push(i)
            last30>>>=1
        }
        
    }
    return result
};  

console.log(
    smallestSufficientTeam(
        ["gvp","jgpzzicdvgxlfix","kqcrfwerywbwi","jzukdzrfgvdbrunw","k"]
        [[],[],[],[],["jgpzzicdvgxlfix"],["jgpzzicdvgxlfix","k"],["jgpzzicdvgxlfix","kqcrfwerywbwi"],["gvp"],["jzukdzrfgvdbrunw"],["gvp","kqcrfwerywbwi"]]
    )
)