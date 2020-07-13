







var reformatDate = function(date) {
    date=date.split(' ')
    date[0]=date[0].split('')
    date[0].pop()
    date[0].pop()
    date[0]=date[0].join('')
    let months={
        "Jan":1,
         "Feb":2, 
         "Mar":3, "Apr":4, "May":5, "Jun":6, "Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12
    }
    let month=months[date[1]]
    let result=[date[2],month,date[0]]
    if(result[1].length==1)result[1]='0'+''+result[1]
    if(result[2].length==1)result[2]='0'+''+result[2]

    result=result.join('-')
    return result
};


var rangeSum = function(nums, n, left, right) {
    let mod=1e9+7
    let prefix=[0]
    for (let i = 0; i < nums.length; i++) {
        prefix.push((prefix[prefix.length-1]+nums[i])%mod)
    }

    let sums=[]
    for (let i = 0; i < prefix.length; i++) {
        for (let j = i+1; j < prefix.length; j++) {
            sums.push(prefix[j]-prefix[i])            
        }        
    }
    
    sums.sort((a,b)=>a-b)
    
    let result=0
    for (let i = left-1; i <right; i++) {
        result=(result+sums[i])%mod        
    }
    return result%mod
};


var minDifference = function(nums) {
    if(nums.length<=4)return 0
   
    nums.sort((a,b)=>a-b)

    let result=Infinity
    console.log(nums)

    if(nums.length==5){
        
        let r=Infinity
        for (let i = 0; i < nums.length-1; i++) {
            r=Math.min(r,nums[i+1]-nums[i])            
        }
        return r
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j <= 3-i; j++) {
            result=Math.min(result,nums[nums.length-1-j]-nums[i])
            result=Math.min(result,nums[nums.length-1-i]-nums[j])

        }
    }

    return result
};
console.log(minDifference(
    [20,66,68,57,45,18,42,34,37,58]
))


var winnerSquareGame = function(n) {
    

    let q=[n]
        
    let set=new Set()
    let moves=[]
    for (let i = 1; i < Math.sqrt(n)-1; i++) {
        if(i*i<n){
            set.add(i*i)
            moves.push(i*i)
        }
    }
    while(q.length){
        let temp=[]
        for (const ele of q) {
            
            for (let i = 0; i < moves.length; i++) {
                    if(moves[i]>ele)break
                    if(!set.has(ele-moves[i])){
                        temp.push(ele-moves[i])
                    }  
            }
        
        }
      
        q=temp
    }
    return false
};

