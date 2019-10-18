// Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

// Only one letter can be changed at a time
// Each transformed word must exist in the word list. Note that beginWord is not a transformed word.


var ladderLength = function(S, E, D) {
    if (!D.includes(E))return []
     // array of sequences [arrays]
    var finish=false

    const dict = new Set(D);
    var queue=[ [S,dict] ]
    var time=1


    var startPath=[  [S]  ]
    var curChildren=[]

    while(queue.length && time<D.length+1){
        
        var childInfo=[]
        var result=[]
        curChildren=[]

        //find the children of the parents
        for (const [PARENT,DICTION] of queue) {
            


            for (let i = 0; i < PARENT.length; i++) {
                for (let j = 0; j < 26; j++) {
                    var DICT= new Set(DICTION)
                    const W= PARENT.slice(0,i)
                    +String.fromCharCode(97 + j) // all letters of the alphabet (IN ORDER)
                    +PARENT.slice(i + 1);
                    if (DICT.has(W)) {
                        if(W===E){
                            finish=true
                        }
                        DICT.delete(W)
                      childInfo.push([W,PARENT])
                      curChildren.push([W,DICT])
                    }

                }
            }

        }

//console.log(`my startPath is `,startPath)
//console.log(` found the children `,curChildren)
//console.log(`with info `,childInfo)


        //create the result sequences for this level
        for (let i = 0,j=0; i < startPath.length; i++) {



                 
                while(j<childInfo.length 
                    && childInfo[j][1]===(startPath[i][startPath[i].length-1])){

                    result.push(
                        startPath[i].concat(childInfo[j][0])
                    )
                    j++
                  
                }

              
        }
//console.log('\n sequences created',result)

        // finish filter
        if(finish){
            console.log('finish',result)
            return result.filter(d=>d[d.length-1]==E)
        }


console.log(time,'\n \n \n \n')
        startPath=result
        queue= curChildren;
        time++
    }

    return result.length?result:[]

};


var ladderLength = function(S, E, D) {
    if (!D.includes(E))return []
     // array of sequences [arrays]
    var finish=false

    const dict = new Set(D);
    var queue=[ [[S],dict]  ]
    var time=1


    var curPaths=[]

    while(queue.length && time<D.length+1){
        
        

        //find the children of the parents
        for (var [[...head,tail],DICTI] of queue) {
            


            for (let i = 0; i < PARENT.length; i++) {


                for (let j = 0; j < 26; j++) {
                    var DICT= new Set(DICTI)
                    var possibleTransmutation= tail.slice(0,i)
                    +String.fromCharCode(97 + j) // all letters of the alphabet (IN ORDER)
                    +tail.slice(i + 1);


                    if (DICT.has(possibleTransmutation)) {
                        if(possibleTransmutation===E){
                            finish=true
                        }
                        
                        
                        DICT.delete(possibleTransmutation)
                        
                        curPaths.push(
                            [head.concat(tail,possibleTransmutation),DICT]
                        )
                    }

                }
            }

        }

//console.log(`my startPath is `,startPath)
//console.log(` found the children `,curChildren)
//console.log(`with info `,childInfo)


       
//console.log('\n sequences created',result)

        // finish filter
        if(finish){
            return curPaths.map(d=>{
                if(d[0][d[0].length-1]===E){
                    return d[0]
                }
                return []  
            }).filter(d=>d.length)
        }


        queue= curPaths
        time++
    }

    return result.length?result:[]

};
console.log(laddderLength(
    "hit",
    "cog",
    ["hot","dot","dog","lot","log"]
    
    
    )
    
    
    )