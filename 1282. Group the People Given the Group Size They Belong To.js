// There are n people whose IDs go from 0 to n - 1 and each person belongs exactly to one group. Given the array groupSizes of length n telling the group size each person belongs to, return the groups there are and the people's IDs each group includes.

// You can return any solution in any order and the same applies for IDs. Also, it is guaranteed that there exists at least one solution. 

 

var groupThePeople = function(groupSizes) {
    let memo={}
    groupSizes.forEach((d,i)=>memo[d]===undefined?memo[d]=[i]:memo[d].push(i))
    let result=[]
    Object.keys(memo).forEach(
        (key)=>{
            let arr=memo[key]
            while(arr.length){
                let temp=[]
                for (let i = 0; i < key; i++) {
                    temp.push(arr.shift())
                }
                result.push(temp)
            }
        }
    )
    return result
};