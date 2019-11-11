var reconstructMatrix = function(U, L, COLSUM) {
    var overall=COLSUM.reduce((a,b)=>a+b)
    if(overall!==U+L)return []

    var RESULT=[new Array(COLSUM.length).fill(0),new Array(COLSUM.length).fill(0)]
    
    COLSUM.forEach((sum,i)=>{
        console.log(`met ${sum}`)
        if(sum==2){
            RESULT[0][i]=1
            U--
            L--
            RESULT[1][i]=1
        }
        else if(sum==1){
            if(U>=L){
                RESULT[0][i]=1
                U--
            }
            else{
                RESULT[1][i]=1
                L--
            }

        }
        console.log(RESULT[0]+'' ,U)
        console.log(RESULT[1]+'' ,L)
        console.log('\n')


    })
    if(U<0||L<0)return []
    return RESULT
};


console.log(reconstructMatrix(
    9,
    2,
    [0,1,2,0,0,0,0,0,2,1,2,1,2]
))