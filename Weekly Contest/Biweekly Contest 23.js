


var countLargestGroup = function(n) {
    
    let memo={}

    for (let i = 1; i <=n; i++) {
       let num=i
       let sum=0
       while(num>=1){
            sum+=num%10
            num=Math.floor(num/10)
       }    
       memo[sum]=(memo[sum]||0)+1
    }
    let max=Math.max(...Object.values(memo))

    return Object.keys(memo).filter(d=>memo[d]==max).length
};
console.log(
    countLargestGroup(13)
)




var canConstruct = function(s, k) {
    if(s.length==k)return true
    if(k>s.length)return false
    let used= new Set()
    //k <=s.length

    let freq={}

    for (const str of s) {
        freq[str]=(freq[str]||0) +1
    }


    for (const k in freq) {
        freq[k]%=2
    }
    return Object.keys(freq).filter(d=>freq[d]==1).length <=k
};

var maxSatisfaction = function(satisfaction) {
    
    satisfaction.sort((a,b)=>a-b)
    if(satisfaction[0]>=0){
        let sum=0
        for (let i = 0; i < satisfaction.length; i++) {
            sum+=(i+1)*satisfaction[i]            
        }
        return sum
    }
    if(satisfaction[satisfaction.length-1]<=0)return 0
    let max=-1
    let maxindex=0
    let n = satisfaction.length
    let point=0
    for (let i = 0; i < satisfaction.length; i++) {
        if(satisfaction[i]>=0)break

            satisfactiony=satisfaction.slice(i)
            let sum=0

            for (let i = 0; i < satisfactiony.length; i++) {
                sum+=(i+1)*satisfactiony[i]            
            }
            max=Math.max(sum,max)    
        
    }



 

    return max
};


console.log(
    maxSatisfaction(
        // [
        //     -99, -89, -72, -60, -46, -36, -35,
        //     -32, -26,  -8,  -7,   1,  20,  24,
        //      27,  37,  40,  55,  58,  76,  77,
        //      83
        //   ]
       //   [-1,-8,0,5,-7]
    )
)
