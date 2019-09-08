// A query word matches a given pattern if we can insert lowercase letters to the pattern word so that it equals the query. (We may insert each character at any position, and may insert 0 characters.)

// Given a list of queries, and a pattern, return an answer list of booleans, where answer[i] is true if and only if queries[i] matches the pattern.

var camelMatch = function(queries, pattern) {

    pattern=new RegExp('^([a-z])*'+pattern.split('').join('([a-z])*')+'([a-z])*$')
    
    return queries.map(
        (d)=>(pattern.test(d)?true:false)
    )
};
console.log(camelMatch(
    ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"],
    "FB"
))

console.log(camelMatch(
    ["aksvbjLiknuTzqon","ksvjLimflkpnTzqn","mmkasvjLiknTxzqn","ksvjLiurknTzzqbn","ksvsjLctikgnTzqn","knzsvzjLiknTszqn"],
"ksvjLiknTzqn"

))
