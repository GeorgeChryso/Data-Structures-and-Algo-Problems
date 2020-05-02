











var numJewelsInStones = function(J, S) {
    let s=new Set()
    let result=0
    for (let i = 0; i < J.length; i++) {
        s.add(J[i])        
    }
    for (let i = 0; i < S.length; i++) {
        result+=Number(s.has(S[i]))        
    }
    return result
};