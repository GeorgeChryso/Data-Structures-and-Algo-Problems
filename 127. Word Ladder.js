
//Start End Dictionary

//typical BrFS where time matters. 
var ladderLength = function(S, E, D) {
    if (!D.includes(E))return 0


    var time=1
    var queue=[S]


    const dict = new Set(D);



    while(queue.length){
        const next=[] // Helps us with segregating between the times ( levels )
        // I will process all the elements of my queue, and push their children()to next
        // Then next will become my new queue
        for (var T of queue) {
            console.log(T,dict)
            if(T===E)return time



            //essentially try replacing each letter of T with any letter, therefore creating a new word. Test that word against your dictionary and if it's there push it to next.( Cos It is a children of T )
            for (let i = 0; i < T.length; i++) {
                for (let j = 0; j < 26; j++) {
                    const W= T.slice(0,i)
                    +String.fromCharCode(97 + j) // all letters of the alphabet (IN ORDER)
                    +T.slice(i + 1);
                    
                    if (dict.has(W)) {
                      next.push(W)
                      dict.delete(W)
                    }

                }
            }

          
        }
        console.log(next)
        queue= next;
        time++;
    }
    return 0

};

console.log(ladderLength(
    "hit",
    "cog",
    ["hot","dot","dog","lot","log","cog"]
))

