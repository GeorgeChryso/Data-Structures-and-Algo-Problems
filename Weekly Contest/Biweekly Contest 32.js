


    var canConvertString = function(s, t, k) {
        if(s.length!==t.length)return false
        let seen={}
        let memo=new Set()
        let result=0
        for (let i = 1; i <26; i++) {
            seen[i]=-1            
        }

        for (let i = 0; i < s.length; i++) {
            let a=s[i].charCodeAt(0)
            let b=t[i].charCodeAt(0)
            let answ=0
            if(a===b)continue
            if(a>b){
                answ=26-a+b
            }
            else{
                answ=b-a
            }

            let diff=answ
            
            if(seen[diff]===-1){
                seen[diff]=answ
                memo.add(diff)
                result=Math.max(result,answ)
                if(result>k)return false
                continue
            }

            answ=seen[diff]
            while(true){
                if(answ>k)return false
                
                if(!memo.has(answ)){
                    seen[diff]=answ
                    memo.add(answ)
                    result=Math.max(result,answ)
                    break
                }
                else{
                    answ+=26
                }
            }
        }
        return result<=k
    };

    // console.log(
    //     canConvertString(
    //         "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    //         "zyxwvuysrqponmlkjihgfedcba",
    //         100000000
    //     )
    // )


    var longestAwesome = function(s) {
        let freq={}
        let odd=0
        for (let i = 0; i < s.length; i++) {
            if(freq[s[i]]===undefined){
                freq[s[i]]=1
                odd++
            }
            else{
                freq[s[i]]++
                if(freq[s[i]]%2){
                    odd++
                }
                else odd--
            }       
        }
        if(odd<=1)return s.length
        let result=1
        for (let l = s.length-1; l>=0; l--) {
            let o=odd
            for (let i = l; i <s.length; i++) {
                freq[s[i]]--

                if(freq[s[i]]%2){
                    o++
                }   
                else{
                    o--
                }             
            }
            if(o<=1){
                result=Math.max(result,l)
                return result
            }

            let start=0

            for (let e = l; e <s.length; e++) {

                freq[s[start]]--
                  
                if(freq[s[start]]%2)
                    o++
                else 
                    o--

                freq[s[e]]++
     
                if(freq[s[e]]%2)
                    o++
                else
                    o--
                if(o<=1)return l
                start++
            }

            for (let i = 0; i <start; i++) {
                freq[s[i]]++
            }
        }
        return result
    };
    // console.log(
    //     longestAwesome(
    //         "234121442"
    //     )
    // )

    var minInsertions = function(s) {
        let l=0,running=0
        let arr=[]
        let regex=/\(\)\)/gi
        s=s.replace(regex,'')
        console.log(s)

        for (let i = 0; i < s.length; i++) {
            if(s[i]=='(')running+=2
            else running--

            console.log(running,s[i])

            if(running<=0){
                l+= Math.abs(running)
                running=0
            }
        }
        
        return ((l%2)?(l-1)/2+2:l/2)+running
    };

    console.log(minInsertions(
        "((())"
    ))


