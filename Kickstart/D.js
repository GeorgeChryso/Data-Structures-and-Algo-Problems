var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line) {
    let [T,n,Q]=line.split(' ').map(d=>Number(d))
    ////////
    for (let t = 0; t <T; t++) { //for each testcase
        // input  logic
        let res=[]
        console.log('1 2 3')
        rl.on('line',(ans)=>{
            if(ans==='1')
                res=['2','1','3']
            else if(ans==='3')
                res=['1','3','2']
            else
                res=['1','2','3']
        })
        for(let i=0;i<=n-4;i++){
            let k=(i+4)+'',a=res.shift(),b=res.shift()
            console.log(a+' '+b+' '+k)
            rl.on('line',ans=>{
                if(ans===k)
                    res.unshift(b),res.unshift(k),res.unshift(a)
                else if( ans===a)
                    res.unshift(b),res.unshift(a),res.unshift(k)
                else{
                    for(let j=0;j<res.length-1;j++){
                        let f=res[j],s=res[j+1],br=false
                        console.log(f+' '+s+' '+k)
                        rl.on('line',ansa=>{
                            if(ansa===f)
                                res.splice(j,0,k),
                                br=true
                            else if(ansa===k)
                                res.splice(j+1,0,k).
                                br=true
                        } )
                        if(br)
                            break
                    }
                    res.unshift(b),res.unshift(a)
                }
            })
        }
        console.log(res.join(' '))
    }
    ///////
   rl.close()
})
.on('close',function(){
    process.exit(0);
});
