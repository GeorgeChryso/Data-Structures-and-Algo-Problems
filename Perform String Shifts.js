












//just do it
var stringShift = function(s, shift) {
    s=s.split('')
    for (var [dir,amount] of shift) {
        while(amount--)dir?s.unshift(s.pop()):s.push(s.shift())
    }
    return s.join('')
};

//left shift cancels right shift
var stringShift = function(s, shift) {
    s=s.split('')
    let z=shift.reduce((acc,[dir,amount])=>acc+(-1)**dir*amount,0)
    console.log(z)
    while(z){
        if(z>0){
            s.push(s.shift())
            z--
        }
        if(z<0){
            s.unshift(s.pop())
            z++
        }
    }
    return s.join('')
};

console.log(
    stringShift(
        "abc",[[0,1],[1,2]]
    )
)