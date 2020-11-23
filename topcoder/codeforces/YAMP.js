'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    main();    
});

let YAMPDC2=(A,m)=>{
        let n=A.length
    
        let dp=[...Array(m+1)].map(d=>[...Array(n+1)].map(d=>1e9))
        dp[0][0]=0
    
        let freq=[...Array(n+2)].map(d=>0),nl=0,nr=-1,sum=0
        let fixnl=target=>{
            while(nl<target){          
                freq[A[nl]]--
                sum-=freq[A[nl]]
                nl++
            }
            while(nl>target){
                nl--
                sum+=freq[A[nl]]
                freq[A[nl]]++
            }
        }
        let fixnr=target=>{
            while(nr<target){
                nr++
                sum+=freq[A[nr]]
                freq[A[nr]]++
            }
            while(nr>target){
                freq[A[nr]]--
                sum-=freq[A[nr]]
                nr--
            }
        }
        let DC=(i,jleft,jright,kleft,kright)=>{
            if(jleft>jright)
                return
            let bestk=-1,mid=(jleft+jright)>>1
    
            fixnr(mid-1)
            for (let k = Math.max(0,kleft); k <= Math.min(mid-1,kright); k++){
                fixnl(k)
                if(dp[i-1][k]+sum<dp[i][mid])
                    dp[i][mid]=dp[i-1][k]+sum,
                    bestk=k       
            } 
            DC(i,jleft,mid-1,kleft,bestk)
            DC(i,mid+1,jright,bestk,kright)
        }
        for (let i = 1; i <=m; i++) 
            DC(i,1,n,0,n-1)
        return dp[m][n]
    }


// Note there's no need to do it for every test case like kickstart
// tests: $ cat input.txt | node "c:\....name.js"
function main() {

    
    let [n,m]=readline().split(' ').map(d=>Number(d)) //reads just the n for a simple test case
    let A=readline().split(" ").map(d=>Number(d))
    let result=YAMPDC2(A,m) //solves a simple test case
    console.log(result.toString())
}



