// A query word matches a given pattern if we can insert lowercase letters to the pattern word so that it equals the query. (We may insert each character at any position, and may insert 0 characters.)

// Given a list of queries, and a pattern, return an answer list of booleans, where answer[i] is true if and only if queries[i] matches the pattern.

var camelMatch = function(queries, pattern) {
    let arr=[]
    pattern=pattern.split('')
    for (let i=0,j=-1;i<pattern.length;i++) {
        if (/[A-Z]/.test(pattern[i])) {
            j++          
            arr[j]=['']
        }
        arr[j]+=pattern[i]
    }
    var regy=new RegExp(arr.join('([a-z])*')+'([a-z])*')
    return queries.map(
        (d)=>(regy.test(d)?true:false)
    )
};
console.log(camelMatch(
   ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"],"FoBaT"
))

var rego=/Fo([a-z])*Ba([a-z])*/.test('FooBar')

console.log(rego)