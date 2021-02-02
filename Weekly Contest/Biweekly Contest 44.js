// 1739. Building Boxes

// You have a cubic storeroom where the width, length, and height of the room are all equal to n units. You are asked to place n boxes in this room where each box is a cube of unit side length. There are however some rules to placing the boxes:

// You can place the boxes anywhere on the floor.
// If box x is placed on top of the box y, then each side of the four vertical sides of the box y must either be adjacent to another box or to a wall.
// Given an integer n, return the minimum possible number of boxes touching the floor.




/**
 * @param {number} n
 * @return {number}
 */
var minimumBoxes = function(n) {
    if(n==1)
        return 1
    
    //calculate height
    let lo=1,hi=n
    let h=x=>x*(x+1)*(x+2)/6

    while(lo+1<hi){
        let mid=lo+hi>>1

        if(h(mid)<n)
            lo=mid
        else if(h(mid)==n){
            lo=mid
            break
        }
        else 
            hi=mid
    }
    let result=(lo)*(lo+1)/2
    n-=h(lo)
    if(n==0)
        return result
    let f=(x)=>Math.floor(Math.sqrt(2*x)+1/2)
    return result+f(n)
};


console.log(minimumBoxes(
    15
))


console.log(minimumBoxes(
    4
))

console.log(minimumBoxes(
    10
))


 let sol=A=>{
    let n=A.length,result=0
    if(n==1)
        return 1
    let ok=len=>{
        console.log(`len:`,len)

        for(let i=0;i<=n-len;i++){
            let j=i+len-1,min=Infinity,r=false
            for(let k=i;k<=j;k++)
                min=Math.min(min,A[k])
            let Z=[...Array(len)].map(d=>0)
            for(let k=i;k<=j;k++)
                if(A[k]>=min+len)
                    r=true
                else
                    Z[A[k]-min]++
                    console.log(i,Z,r)
            if(r)
                continue

            if(Z.every(d=>d==1))
                return true
        }
        return false
    }
    let lo=0,hi=n
    while(lo<=hi){
        let mid=lo+hi>>1
        console.log(lo,hi,mid,ok(mid))
        if(ok(mid))
            result=Math.max(result,mid),
            lo=mid+1
        else
            hi=mid-1
    }
    return result
 }

 console.log(sol(
    [1,0,3,2]
 ))
 
