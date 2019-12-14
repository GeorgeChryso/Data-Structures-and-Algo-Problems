var findSpecialInteger = function(A) {
    var dict={}
    var result=0
    var integer=0

    for (let i = 0; i < A.length; i++) {
        dict[A[i]]=(dict[A[i]]||0) +1
        if(dict[A[i]]>result){
            result=dict[A[i]]
            integer=A[i]
        }
    }

    return integer
};


var removeCoveredIntervals = function(INT) {
    
    return INT.filter(([start,end],i)=>{
        let flag=true
        INT.forEach(([s,e])=>{
            console.log([start,end],[s,e],(s<=start && end<e) || (s<start&&end<=e))
            if((s<=start && end<e) || (s<start&&end<=e))flag=false
        })
        return flag
    })
};

/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function(characters, combinationLength) {
    this.chars=characters.split()
    this.combl=combinationLength
    this.indices=Array(combinationLength).fill(0)
    this.indices=this.indices.map((d,i)=>i)
    this.time=0
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function() {
    if(this.time==0){
        this.time=1
        let result=this.indices.map(d=>this.chars[d])
        return result.join('')
    }
    let change=false
    let leftAt=this.indices.length-1
    while(change==false&&leftAt>=0){
        if(leftAt+1<=(this.chars.length-1)){
            this.indices[leftAt]++
            change=true
            break
        }
        else{
            
        }
        leftAt--
    }

};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function() {
    
};

/** 
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */




var minFallingPathSum = function(A) {
    if(A.length==1)return Math.min(...A)
    var result=Infinity
    var hash={}
    var dp=(sum,i,j,indexof2nd)=>{
        console.log(i,j)
        if(i>=A.length-1){
            console.log(`hoaisdfjoaid`)
            result=Math.min(result,sum+A[i][j])
            if(hash[indexof2nd]>(sum+A[i][j])){
                hash[indexof2nd]=sum+A[i][j]
            }
            return
        }
        
        A[i+1].forEach((el,jj)=>{
            if(i==1){indexof2nd=jj}
            if(jj!==j)dp(sum+A[i][j],i+1,jj,indexof2nd)
        })
    }

    dp(0,0,0,0)
    Object.keys(hash).forEach(d=>hash[d]-=A[0][0])

    console.log(`hi`)
    A[0].forEach((el,j)=>{
        Object.keys(hash).forEach( jj=>{
            if(jj!==j)result=Math.min(result,hash[jj]+el)

            }   
        )
    })
    return result
};



console.log(
    minFallingPathSum(
        [[-2,-18,31,-10,-71,82,47,56,-14,42],[-95,3,65,-7,64,75,-51,97,-66,-28],[36,3,-62,38,15,51,-58,-90,-23,-63],[58,-26,-42,-66,21,99,-94,-95,-90,89],[83,-66,-42,-45,43,85,51,-86,65,-39],[56,9,9,95,-56,-77,-2,20,78,17],[78,-13,-55,55,-7,43,-98,-89,38,90],[32,44,-47,81,-1,-55,-5,16,-81,17],[-87,82,2,86,-88,-58,-91,-79,44,-9],[-96,-14,-52,-8,12,38,84,77,-51,52]] 
    )
)

