
//Start End Dictionary


var ladderLength = function(S, E, D) {
    if (!D.includes(E))return 0


    var time=1
    var queue=[S]


    const dict = new Set(D);



    while(queue.length){
        const next=[] // Helps us with segregating between the times
        for (var T of queue) {
            if(T===E)return time
            
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

