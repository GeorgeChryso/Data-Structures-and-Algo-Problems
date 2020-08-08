


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
        let freq={0:0}, result=-1, curr=0
        for (let i = 0; i < s.length; i++) {
           curr^=(1<<(Number(s[i])))
           if(freq[curr]!==undefined)
                result=Math.max(result,i-freq[curr]+1)
           for (let j = 0; j <10; j++) {
                let ele=1<<j
                if(freq[curr^ele]!==undefined)
                    result=Math.max(result,i-freq[curr^ele]+1)
           }
           if(freq[curr]===undefined)freq[curr]=i+1
        }
     
        return result
    };

    console.log(
        longestAwesome(
            "3242415"
        )
    )

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

    // console.log(minInsertions(
    //     "((())"
    // ))


