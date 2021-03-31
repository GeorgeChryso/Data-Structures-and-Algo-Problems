/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function(s) {
    let freq=[...Array(26)].map(d=>0)
    s=s.split('')
    for(let c of s)
        freq[c.charCodeAt(0)-97]++
    let w=['zero','one','two','three','four','five','six','seven','eight','nine'].map(w=>{
        let c=[...Array(26)].map(d=>0)
        for(let i=0;i<w.length;i++)
            c[w[i].charCodeAt(0)-97]++
        return c
    })
    let memo=new Set(),st=[]
    let rec=()=>{
        if(memo.has(freq+''))
            return false
        if(freq.every(d=>d==0))
            return true
        let res=false
        memo.add(freq+'')
        for(let i=0;i<10&&res==false;i++){
            if(w[i].some((d,i)=>d>freq[i]))
                continue
            freq=freq.map((d,j)=>d-w[i][j])
            st.push(i)
            res|=rec()
            if(res)
                break
            freq=freq.map((d,j)=>d+w[i][j])
            st.pop()
        }
        return res
    }
    rec()
    return st.sort((a,b)=>a-b).join('')
};
console.log(originalDigits(`fviefuro`))