



var maxScore = function(s) {
    
    s=s.split('')
    let ones=s.reduce((acc,curr)=>acc+Number(curr=='1'),0)
    let zeroes=0

    let result=-1
    for (let i = 0; i < s.length; i++) {
        if(s[i]=='0'){
            zeroes++
        }        
        else{
            ones--
        }
        if(i==s.length-1)break
        result=Math.max(result,zeroes+ones)
    }
    return result
};



var maxScore = function(cardPoints, k) {
    
};



var findDiagonalOrder = function(nums) {
    let result=[]
    let res=[]


    let maxJ=nums.reduce((acc,curr)=>Math.max(acc,curr.length),0)

    for (let q = 0; q< nums.length; q++) {

        let i=q
        let j=0

        let ii=nums.length-1
        let jj=q
        while(i>=0){
            if(nums[i][j]!==undefined){
                result.push(nums[i][j])
            }
            if(nums[ii][jj]!==undefined){
                res.push(nums[ii][jj])
            }
            i--
            j++
        }

    }

    for (let q = maxJ-1; q>=1; q--) {

        let i=nums.length-1
        let j=q
        while(j<maxJ&&i>=0){
            console.log(i,j)
            if(nums[i][j]!==undefined){
                res.push(nums[i][j])
            }

            i--
            j++
        }

    }


    return result.concat(res.reverse())
};


console.log(
    findDiagonalOrder(
  //[[1,2,3],[4,5,6],[7,8,9]]
  [[14,12,19,16,9],[13,14,15,8,11],[11,13,1]]
    )
)