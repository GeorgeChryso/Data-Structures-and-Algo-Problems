



// binary search the length 
// and kmp for the result



var longestDupSubstring = function(S) {
    S=S.split('')
    S=S.map((d,i)=>d.charCodeAt(0)-97)

    let lo=0,hi=S.length-1,result=0, idx=0
    while(lo<hi){

        let mid=(hi+lo)>>1
        if(mid===0)return ''
        //rabinkarp
        let memo=new Set(), acc=0,prime=1e9+9, base=26, flag=false
        for (let i = 0; i < S.length; i++) {
            if(i<mid){
                acc+=(S[i]*(base**(mid-i))) 
                acc%=prime
                console.log(i,acc,S.length)
                if(i===mid-1)memo.add(acc)
            }            
            else{
                acc=(acc * base + S[i] -( S[i - mid] * (base))) %prime
                if(memo.has(acc)){
                    console.log(acc)
                    result=mid
                    idx=i-mid
                    lo=mid+1
                    flag=true
                    break
                }
            }
        }
        if(!flag)hi=mid-1
    }
    return result!=0?S.slice(idx,idx+result+1):''
};


console.log(longestDupSubstring(

    "banana"
))

