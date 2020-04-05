



var minSubsequence = function(nums) {
    nums.sort((a,b)=>b-a)
    let totalSum=nums.reduce((a,b)=>a+b)
    let result=[]
    let prefix=[0]
    let sum=0
    

    for (let i = 0; i < array.length; i++) {

        sum+=nums[i]
        result.push(nums[i])
        if(sum>totalSum-sum)break
    }
    return result
};




var longestDiverseString = function(a, b, c) {
    let maxLength=0;
    let result=""
    
    let left={
        'a':a,
        'b':b,
        'c':c
    }

    let start=''
    let max=Math.max(a,b,c)
    if(max==a)start='a'
    if(max==b)start='b'
    if(max==c)start='c'
    let choices={
        'a':['a','bb','b','c','cc'],
        'b':['a','aa','b','c','cc'],
        'c':['c','aa','a','b','bb'],
        'aa':['c','cc','b','bb'],
        'bb':['a','aa','c','cc'],
        'cc':['a','aa','b','bb']
    }

    let seen=new Set()
    let recursion=(str,left)=>{
        if(seen.has(str))return
        console.log(str)

        if(str.length>=2&&choices[str.slice(str.length-2)]!==undefined){
            let z=str[str.length-2]+''+str[str.length-1]
            console.log(z,choices[z])
            let curry=str[str.length-1]

            for (let i = 0; i < choices[z].length; i++) {
                let q=choices[z][i]
                let el=choices[z][i][choices[z][i].length-1]
                if(left[choices[z][i][choices]]>=choices[z][i].length){
                    let proxy=Object.assign({},left)
                    proxy[el]-=q.length
                    recursion(str+''+q,proxy)
                }
            }
        }
        else{
            let z=str[str.length-1]
            console.log(z,choices[z])
            for (let i = 0; i < choices[z].length; i++) {

                if(left[choices[z][i]]>=choices[z][i].length){
                    let q=choices[z][i]
                    let el=choices[z][i][choices[z][i].length-1]
                    if(left[choices[z][i][choices]]>=choices[z][i].length){
                        let proxy=Object.assign({},left)
                        proxy[el]-=q.length
                        recursion(str+''+q,proxy)
                    }
                }
            }
        }

    }

    recursion(start,left)
    return result
};


console.log(longestDiverseString(1,1,7))
