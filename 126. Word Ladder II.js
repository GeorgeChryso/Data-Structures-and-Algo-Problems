// Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

// Only one letter can be changed at a time
// Each transformed word must exist in the word list. Note that beginWord is not a transformed word.


var ladderLength = function(S, E, D) {
    if (!D.includes(E))return 0
     // array of sequences [arrays]
    
    var time=1
    var queue=[S]
    var stoptime=Infinity

    const dict = new Set(D);


    var indexList=[]

    var startPath=[[S]]


    while(queue.length&&time<stoptime){
console.log(startPath)
        var result=[]

        const curChildren=[] // Helps us with segregating between the times ( levels )
        // I will process all the elements of my queue, and push their children()to curChildren
        // Then curChildren will become my new queue
        indexList=[]

        // [child node, parent node, available dictionary]
        for (var T of queue) {

            if(T===E){
                time=stoptime
                    }



            //essentially try replacing each letter of T with any letter, therefore creating a new word. Test that word against your dictionary and if it's there push it to curChildren.( Cos It is a children of T )
            var numberOfChildren=0

            for (let i = 0; i < T.length; i++) {

                for (let j = 0; j < 26; j++) {
                    const W= T.slice(0,i)
                    +String.fromCharCode(97 + j) // all letters of the alphabet (IN ORDER)
                    +T.slice(i + 1);
                    
                    if (dict.has(W)) {
                        if(W==E){
                            numberOfChildren++
                            curChildren.push([W,T])  
                            continue;
                        }
                      numberOfChildren++
                      curChildren.push(W)  
                      dict.delete(W)
                    }

                }
            }
            indexList.push(numberOfChildren)
        }


console.log(indexList, curChildren, `finished?: ${time==stoptime}` )

        var j=1

        startPath.forEach((path,i)=>{

                for (let k=0; k<=indexList[i];k++, j++) {
                    if(curChildren[j-1]!==undefined){
                        result.push(
                            path.concat(curChildren[j-1])
                        )                    
                    }
                }
        })



 console.log(`new paths: \n`,result,'\n','\n','\n')

        startPath=result
        queue= curChildren;
        time++;
    }

    return result.length?result:[]

};
console.log(ladderLength(
    beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]
))