


// var createTargetArray = function(nums, index) {
//    let target=[]
   
//    for (let i = 0; i < nums.length; i++) {
//        target.splice(index[i],0,nums[i])
//    }
//    return target
// };


// console.log(createTargetArray(
//     [1],[0]
// ))





// var sumFourDivisors = function(nums) {
//     let has4divisors=x=>{
//         let result=0
//         let totalSum=0
//         for (let i = 1; i <=x/2; i++) {
//             if(x%i==0){
//                 result++   
//                 if(result>4)return 0  
//                 totalSum+=i
//             }       
//         }

//         if(result==3)return totalSum+x
//         return 0
//     }
    
//     let primeFact=(x)=>{
//         let twos=0
//         while(x%2==0){
//             x/=2
//             twos++
//         }   
//         let factors={}
//         for (let i = 3; i <= Math.sqrt(x); i++) {
//             while(n%i==0)factors[i]=(factors[i]||0) +1           
//         }
//         if(x>2)factors[x]=1

//         return twos+1 + Object.values(factors).reduce((acc,curr)=>acc+curr+1)
//     }
//    // return nums.reduce((acc,curr)=>acc+primeFact(curr),0)

//     return nums.reduce((acc,curr)=>acc+has4divisors(curr),0)
// };


var hasValidPath = function(grid) {

    let visited=[...Array(grid.length)].map(d=>[...Array(grid[0].length)].map(q=>false))

    let paths={
        1:[[0,1],[0,-1]],
        2:[[-1,0],[1,0]],
        3:[[0,-1],[1,0]],
        4:[[0,1],[1,0]],
        5:[[0,-1],[-1,0]],
        6:[[-1,0],[0,1]]
    }

    let areConnected=([x1,y1],[x2,y2])=>{
        for (const [r,c] of paths[grid[x2][y2]]) {
            if(x2+r===x1&&y2+c===y1)return true
        }
        return false
    }
    let isValid=(x,y)=>x>=0&&y>=0&&x<grid.length&&y<grid[0].length
    let q=[[0,0]]
    while(q.length){
        console.log(q)
        let temp=[]
        for (const [x,y] of q) {
            visited[x][y]=true
            if(x===grid.length-1&&y===grid[0].length-1)return true

            for (const [r,c] of paths[grid[x][y]]) {
                if(isValid(x+r,y+c)&&visited[x+r][y+c]===false){
                    if(areConnected([x,y],[x+r,y+c]))temp.push([x+r,y+c])
                }
            }
        }
        q=temp
    }
    return false
};




var longestPrefix = function(s) {
    if(s.length===1)return ''
    let altered=[]
    let curr=s[0]
    let number=0
    for (let i = 0; i < s.length; i++) {
        if(curr==s[i]){
            number++
        }
        else{
            altered.push([number,curr])
            curr=s[i]
            number=1
        }   
    }
   
    altered.push([number,curr])
    console.log(altered)
    if(altered.length==1){
        let res= s.split('')
        res.pop()
        return res.join('')
    }
    let result=[]

    for (let i = 1; i < altered.length; i++) {

        if (altered[i][0]==altered[0][0] &&altered[i][1]===altered[0][1] && altered.length-i>result.length){
            //console.log(i)
            let memo=[]
            let tar=0
            let flag=true
            for (var j = i; j < altered.length; j++) {
                let [sv,ss]=altered[tar]
                let [cv,cs]=altered[j]
                    if(altered[tar][0]==altered[j][0] &&altered[tar][1]===altered[j][1]){
                        memo.push([altered[j][0],altered[j][1]])
                    }
                    if(altered[i][1]!==altered[0][1]){
                        flag=false
                        break
                    }   
                    tar++
            }
            //console.log(memo)
            if(flag&&result.length<memo.length){
                result=[...memo]
            }
        }
        
    }
    
    return result.map(([k,v])=>{
        let tot=''
        for (let i = 0; i <k; i++) {
            tot+=''+v            
        }
        return tot
    }).join('')
};




console.log(
    longestPrefix(
        "aaaaa"
    )
)

