// We are given two sentences A and B.  (A sentence is a string of space separated words.  Each word consists only of lowercase letters.)

// A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

// Return a list of all uncommon words. 

// You may return the list in any order.




var uncommonFromSentences = function(A, B) {
    A=A.split(' ')
    B=B.split(' ')
    let memoA={}
    let memoB={}
    A.forEach(d=>memoA[d]=(memoA[d]||0)+1)
    B.forEach(d=>memoB[d]=(memoB[d]||0)+1)
    let result=[]
    Object.keys(memoA).forEach(
        d=>memoA[d]===1&&memoB[d]===undefined?result.push(d):null
    )
    Object.keys(memoB).forEach(
        d=>memoB[d]===1&&memoA[d]===undefined?result.push(d):null
    )
    return result
};