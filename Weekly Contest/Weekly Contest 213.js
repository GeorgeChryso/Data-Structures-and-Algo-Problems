




var canFormArray = function(arr, pieces) {
    
    let fr={}
    let k=pieces.length
    for (let i = 0; i <k; i++) 
        fr[pieces[i][0]]=pieces[i]        
    
    let n=arr.length,curr=[]
        let i=0
        while(true){
            if(i>=n)
                break
            if(curr.length==0){
                if(fr[arr[i]]===undefined)
                    return false
                else
                    curr=fr[arr[i]]
            }

            while(curr.length&&i<n){
                if(arr[i]!==curr.shift())
                    return false
                i++                
            }
            if(curr.length&&i>=n)
                return false
        }

    return true
};

console.log(
    canFormArray(
        [85],
[[85]]
    )
)

var countVowelStrings = function(n) {
    
    let dp=[...Array(n)].map(d=>[...Array(5)])

    //a, e, i, o, u

    //dp[i][j] number of strings of length i that end at letter j
    for(let i=0;i<5;i++)
        dp[0][i]=1
    for (let i = 1; i < n; i++) {
        let curr=0
        
        dp[i][0]=1
        dp[i][1]=dp[i-1][0]+dp[i-1][1]
        dp[i][2]=dp[i-1][0]+dp[i-1][1]+dp[i-1][2]
        dp[i][3]=dp[i-1][0]+dp[i-1][1]+dp[i-1][2]+dp[i-1][3]
        dp[i][4]=dp[i-1][0]+dp[i-1][1]+dp[i-1][2]+dp[i-1][3]+dp[i-1][4]
    }
    return dp[n-1].reduce((a,c)=>a+c)
};




var furthestBuilding = function(heights, bricks, ladders) {
    


};

console.log('ab'>'aa')
var kthSmallestPath = function(destination, kk) {

    let [n,m]=destination
    let len=n+m
    let mx=Math.max(m,n)

    let first= (1<<mx)-1
    for (let i = 0; i <kk; i++) {

        var r=''
        let mask=first
        
    
        for(let i=len-1;i>=0;i--)
        
            if((1<<i)&mask)
                r='H'+r
            
            else
                r='V'+r
        let next=snoob(first)
       
        first=next   

    }

    return r

            
};

let snooblo=y=>{
 let    t = y + 1;
  let  u = t ^ y;
   let  v = t & y;
  let   x = v - (v & -v) / (u + 1);
}
console.log(
    kthSmallestPath(
        [2,3],2

    )
)