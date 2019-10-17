// Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

// Only one letter can be changed at a time
// Each transformed word must exist in the word list. Note that beginWord is not a transformed word.


var ladderLength = function(S, E, D) {
    if (!D.includes(E))return 0
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
        for (const [PARENT,DICT] of queue) {
            


            for (let i = 0; i < PARENT.length; i++) {
                for (let j = 0; j < 26; j++) {
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



        for (let i = 0,j=0; i < startPath.length; i++) {



                 
                while(j<childInfo.length 
                    && childInfo[j][1]===(startPath[i][startPath.length-1])){
                    result.push(
                        startPath[i].concat(childInfo[j][0])
                    )
                    j++
                  
                }

              
        }
        if(finish){
            return result.filter(d=>d[d.length-1]==E)
        }
        console.log(curChildren,result)
        startPath=result
        result=[]
        queue= curChildren;
    }

    return result.length?result:[]

};
console.log(ladderLength(
    beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]
))