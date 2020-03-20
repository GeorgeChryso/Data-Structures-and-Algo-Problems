// In a special ranking system, each voter gives a rank from highest to lowest to all teams participated in the competition.

// The ordering of teams is decided by who received the most position-one votes. If two or more teams tie in the first position, we consider the second position to resolve the conflict, if they tie again, we continue this process until the ties are resolved. If two or more teams are still tied after considering all positions, we rank them alphabetically based on their team letter.

// Given an array of strings votes which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above.

// Return a string of all teams sorted by the ranking system.



//ΑΡΧΙΔΑΤΟ, ΑΝΤΡΙΚΙΟ ΜΕΘΑΝΙΩΤΙΚΟ ΣΟΡΤ ΚΑΙ ΑΝ ΚΑΤΑΛΑΒΕ ΚΑΤΑΛΑΒΕ
var rankTeams = function(votes) {
    let letters=new Set()
    let points={}

    for (let i = 0; i < votes[0].length; i++) {
        points[i]={}
        for (const vote of votes) {
            points[i][vote[i]]= ~~points[i][vote[i]]+1
            letters.add(vote[i])
        }
    }
  
    let sorting=(k1,k2)=>{
        let i=0
        while(i<votes[0].length&&points[i][k1]===points[i][k2])i++
        if(i===votes[0].length)return k1.charCodeAt(0)-k2.charCodeAt(0)
        return ~~points[i][k2]- ~~points[i][k1]
    }

    let result=[]
    letters.forEach(d=>result.push(d))
    
    return result.sort(sorting).join('')
};


console.log(rankTeams(
    ["WXYZ","XYZW"]
  //  ["ABC","ACB","ABC","ACB","ACB"]
//    ["FVSHJIEMNGYPTQOURLWCZKAX","AITFQORCEHPVJMXGKSLNZWUY","OTERVXFZUMHNIYSCQAWGPKJL","VMSERIJYLZNWCPQTOKFUHAXG","VNHOZWKQCEFYPSGLAMXJIUTR","ANPHQIJMXCWOSKTYGULFVERZ","RFYUXJEWCKQOMGATHZVILNSP","SCPYUMQJTVEXKRNLIOWGHAFZ","VIKTSJCEYQGLOMPZWAHFXURN","SVJICLXKHQZTFWNPYRGMEUAO","JRCTHYKIGSXPOZLUQAVNEWFM","NGMSWJITREHFZVQCUKXYAPOL","WUXJOQKGNSYLHEZAFIPMRCVT","PKYQIOLXFCRGHZNAMJVUTWES","FERSGNMJVZXWAYLIKCPUQHTO","HPLRIUQMTSGYJVAXWNOCZEKF","JUVWPTEGCOFYSKXNRMHQALIZ","MWPIAZCNSLEYRTHFKQXUOVGJ","EZXLUNFVCMORSIWKTYHJAQPG","HRQNLTKJFIEGMCSXAZPYOVUW","LOHXVYGWRIJMCPSQENUAKTZF","XKUTWPRGHOAQFLVYMJSNEIZC","WTCRQMVKPHOSLGAXZUEFYNJI"]
    ))