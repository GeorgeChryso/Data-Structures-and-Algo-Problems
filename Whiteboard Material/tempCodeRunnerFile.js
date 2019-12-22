var canPartition=(A)=>{
    A.sort((a,b)=>a-b)
    const sum= A.reduce((acc,curr)=>acc+curr)
    if(sum&1)return false

    let target=sum/2
    console.log(target)

    var twoChoices=(pick,ignore,index)=>{
        console.log(pick,ignore,index)
        if(pick<target|| ignore<target ||index<0)return false
        if(pick==target||ignore==target)return true

        return twoChoices(pick-A[index],ignore,index-1)||twoChoices(ignore-A[index],pick,index-1)

    }

    return twoChoices(sum,sum,A.length-1)
}