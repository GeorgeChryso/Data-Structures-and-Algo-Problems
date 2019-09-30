// In a town, there are N people labelled from 1 to N.  There is a rumor that one of these people is secretly the town judge.

// If the town judge exists, then:

// The town judge trusts nobody.
// Everybody (except for the town judge) trusts the town judge.
// There is exactly one person that satisfies properties 1 and 2.
// You are given trust, an array of pairs trust[i] = [a, b] representing that the person labelled a trusts the person labelled b.

// If the town judge exists and can be identified, return the label of the town judge.  Otherwise, return -1.

var findJudge = function(N, trust) {
  var cand={...Array(N+1).fill(0)}
  delete cand[0]
  trust.forEach(([t,d])=>{
      delete cand[t]
      if(cand[d]!=undefined)cand[d]++
  }) 

  if(Object.values(cand)[0]==N-1){
      return Object.keys(cand)[0]
  }

  return -1
};

var findJudge = function(N, trust) {
   
    const counts = Array(N+1).fill(0);
    
    for(let [i,j] of trust) {
        counts[i] =-1
        counts[j]!=-1?counts[j]++:null
    }

   
    for(let i = 1; i < counts.length; i++) {
        if (counts[i]==(N-1)) {
            return i;
        }
    }
    
    return -1
};

console.log(
    findJudge(
        3,[[1,3],[1,3],[3,1]]
    )
)