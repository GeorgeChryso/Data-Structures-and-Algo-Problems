


// var threeConsecutiveOdds = function(arr) {
//     let count=0

//     for (let i = 0; i < arr.length; i++) {
//         if(arr[i]%2)count++
//         else count=0
        
//         if(count===3)return true
//     }

//     return false
// };


// var minOperations = function(n) {
    
//     let result=0,start,tar
//     if(n%2==0){
//         tar=n
//         start=n+1
//     }
//     else{
//         tar=n
//         start=n
//     }
//     for (let i = start; i < 2*n+1; i+=2) {
//         result+=i-tar        
//         console.log(i,result)

//     }
//     return result
// };

// console.log(minOperations(3))




var maxDistance = function(position, m) {
    if(position.length===2)return Math.abs(position[0]-position[1])
    position.sort((a,b)=>a-b)
    console.log(position)
    let result=-1
    let helper=num=>{
        let count=1,pos=position[0]
        for (let i=1; i<position.length; i++) 
        { 
            if (position[i] - pos >= num) { 
                pos = position[i]; 
                count++;
            } 
        } 
        return count>=m; 
    }
    if(m===position.length){
        let res=Infinity
        for (let i = 0; i < position.length-1; i++) {
            res=Math.min(res,position[i+1]-position[i])            
        }
        return res
    }

    let lo=position[0],hi=position[position.length-1]-position[0]

    while(lo+1<hi){
        let mid=(lo+hi)>>1
        if(helper(mid)){
            result=Math.max(result,mid)
            lo=mid
        }
        else
            hi=mid
        
    }
    return result


};

var maxDistance = function(position, m) {
    if(position.length===2)return Math.abs(position[0]-position[1])
    position.sort((a,b)=>a-b)
    let result=-Infinity
    let helper=num=>{
        let count=1,pos=position[0]
        for (let i=1; i<position.length; i++) 
        { 
            if (position[i] - pos >= num) { 
                pos = position[i]; 
                count++;
                
            } 
        } 
        return count>=m; 
    }
     if(m===position.length){
        let res=Infinity
        for (let i = 0; i < position.length-1; i++) {
            res=Math.min(res,position[i+1]-position[i])            
        }
        return res
    }

    let lo=0,hi=position[position.length-1]
    while(lo<hi){
        let mid=(lo+hi)>>1
        if(helper(mid)){
            result=Math.max(result,mid)
            lo=mid+1
        }
        else
            hi=mid
        
    }
    return result


};



var minDays = function(n) {
    let dp=[...Array(n+1)].map(d=>[...Array(n+1)].map(q=>Infinity))
    let helper=(k,i)=>{
        if(k==0)return i
        if(k==1)return i+1
        if(k<0||i>n)return Infinity
        if(dp[k][i]!==Infinity)return dp[k][i]
        let z=Infinity
        if(k%2==0&& k%3===0){
             z= Math.min(helper(k-(2*k/3),i+1),helper(k-1,i+1),helper(k-(k/2),i+1))
        }
        else if(k%2==0){
            z=Math.min(helper(k-(k/2),i+1),helper(k-1,i+1))
        }
        else if(k%3==0){
            z= Math.min(helper(k-(2*k/3),i+1),helper(k-1,i+1))
        }
        else z= helper(k-1,i+1)
        dp[k][i]=z
        return z

    }
    return helper(n,0)
};

console.log(minDays(5617))