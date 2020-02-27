// In a project, you have a list of required skills req_skills, and a list of people.  The i-th person people[i] contains a list of skills that person has.

// Consider a sufficient team: a set of people such that for every required skill in req_skills, there is at least one person in the team who has that skill.  We can represent these teams by the index of each person: for example, team = [0, 1, 3] represents the people with skills people[0], people[1], and people[3].

// Return any sufficient team of the smallest possible size, represented by the index of each person.

// You may return the answer in any order.  It is guaranteed an answer exists.
// 1 <= req_skills.length <= 16
// 1 <= people.length <= 60
// 1 <= people[i].length, req_skills[i].length, people[i][j].length <= 16
// Elements of req_skills and people[i] are (respectively) distinct.
// req_skills[i][j], people[i][j][k] are lowercase English letters.
// Every skill in people[i] is a skill in req_skills.
// It is guaranteed a sufficient team exists.
 

// ok, the constraints scream 'Bitwise State compression'
var smallestSufficientTeam = function(req_skills, people) {
    //the dictionary will associate a skill with a number,
    // depending on the requirements' length, in order for me to create the necessary
    // bitwise representation of people according to what skill they have
    // for example, a person with the first and 3d skills will be 101
    // etc 
    let dictionary={}

    for (let i = 0; i < req_skills.length; i++) {
        dictionary[req_skills[i]]=i
    }

    //the maxskills is the target i want to achieve and in every case its 
    // a series of ones depending on the length
    maxskills=2**req_skills.length-1

    // i map each person to its corresponding skill number
    people=people.map((
        skillz=>{
            if(skillz.length==0)return 0
            let final=0
            for (const skill of skillz) {
                final|=(1<<dictionary[skill])
            }
            return final
        }
    ))

    //pruning the candidates?
    // people=people.map((d,j)=>people.some((q,i)=>((d&q)==d)&&j!==i)?0:d )

    //knapsack
    //dp[i][j]= [will be the minimum nubmer of people that need to be used to reach state j of skills using i people, their 30firstmask, their 30lastmask]
    // Notice that each dp[i][j][0] is set to infinity cos I am trying to find the minimum number
    let dp=[...Array(people.length+1)].fill(Array(maxskills+1).fill([Infinity,0,0]))
    //basecase 
    // to reach state 0 with 0 people i need 0 people 
    dp[0][0]=[0,0,0]

    // I will parse the lines a litte bit differently, doesnt matter though
    for (let i = 0; i < dp.length-1; i++) {
        let skill=people[i]
        if (people[i]==0){ 
        //if people[i]==[], then the map will make this 0
        // however it doesnt affect my row at all, so i just move to the next
            dp[i+1]=dp[i]
            continue
        }
        for (let j = 0; j < dp[0].length; j++) {
            //classic dp concept, an element can only change the case of it being used
            if(1+dp[i][j][0]<dp[i+1][j|skill][0]){
                let [chosen,first30,last30]=dp[i][j]
                if(i<=30)first30|=(1<<(i))
                else last30|=(1<<(i-31))
                dp[i+1][j|skill]=[chosen+1,first30,last30]
            }
            // or of it not being used
            if(dp[i][j][0]<dp[i+1][j][0]){
                dp[i+1][j]=dp[i][j]
            }
         
        }
    }
    //all that's left is to extract the result from the first30 and last30 masks
    // given that the max length of my peoples array is 60, I compress the choices on 2 32 bit integers 1 for chosen and 0 for not chosen, and now I unmap it into my result array
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
//["biflxurxdvb","yhiwcn"]["hkyodbbhr","p"]["hkyodbbhr","qq"]["x"]
console.log(
    smallestSufficientTeam(
        ["hkyodbbhr","p","biflxurxdvb","x","qq","yhiwcn"],
        [["yhiwcn"],[],[],[],["biflxurxdvb","yhiwcn"],["hkyodbbhr"],["hkyodbbhr","p"],["hkyodbbhr"],[],["yhiwcn"],["hkyodbbhr","qq"],["qq"],["hkyodbbhr"],["yhiwcn"],[],["biflxurxdvb"],[],["hkyodbbhr"],["hkyodbbhr","yhiwcn"],["yhiwcn"],["hkyodbbhr"],["hkyodbbhr","p"],[],[],["hkyodbbhr"],["biflxurxdvb"],["qq","yhiwcn"],["hkyodbbhr","yhiwcn"],["hkyodbbhr"],[],[],["hkyodbbhr"],[],["yhiwcn"],[],["hkyodbbhr"],["yhiwcn"],["yhiwcn"],[],[],["hkyodbbhr","yhiwcn"],["yhiwcn"],["yhiwcn"],[],[],[],["yhiwcn"],[],["yhiwcn"],["x"],["hkyodbbhr"],[],[],["yhiwcn"],[],["biflxurxdvb"],[],[],["hkyodbbhr","biflxurxdvb","yhiwcn"],[]]
    )
)