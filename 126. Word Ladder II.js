// Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

// Only one letter can be changed at a time
// Each transformed word must exist in the word list. Note that beginWord is not a transformed word.

// SO UNECESSARY!!!!
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



// WORKS, but MEMORY PROBLEM, HEAP EXCEEDED
var findLadders = function(S, E, D) {
    if (!D.includes(E))return []
    var finish=false

    const dict = new Set(D);
    var queue=[ [[S],dict]  ]
    //queue has elements of type [ sequence, dictionary]
    var time=1


    var curPaths=[]

    while(queue.length && time<D.length+1){
        curPaths=[]

        //find the children of the parents
        for (let [T,DICTI] of queue) {
            
           let tail=T[T.length-1]

            for (let i = 0; i < tail.length; i++) {


                for (let j = 0; j < 26; j++) {

                    let possibleTransmutation= tail.slice(0,i)
                    +String.fromCharCode(97 + j) // all letters of the alphabet (IN ORDER)
                    +tail.slice(i + 1);


                    if (DICTI.has(possibleTransmutation)) {
                        let DICT= new Set(DICTI)
                        if(possibleTransmutation===E){
                            finish=true
                        }
                        
                        
                        DICT.delete(possibleTransmutation)
                        
                        curPaths.push(
                            [T.concat(possibleTransmutation),DICT]
                        )
                    }

                }
            }

        }

        while(queue.length){

            let [T,DICTI]=queue.shift()
            let tail=T[T.length-1]

            for (let i = 0; i < tail.length; i++) {


                for (let j = 0; j < 26; j++) {

                    let possibleTransmutation= tail.slice(0,i)
                    +String.fromCharCode(97 + j) // all letters of the alphabet (IN ORDER)
                    +tail.slice(i + 1);


                    if (DICTI.has(possibleTransmutation)) {
                        let DICT= new Set(DICTI)
                        if(possibleTransmutation===E){
                            finish=true
                        }
                        
                        
                        DICT.delete(possibleTransmutation)
                        
                        curPaths.push(
                            [T.concat(possibleTransmutation),DICT]
                        )
                    }

                }
            }


        }
       

        // finish filter
        if(finish){
            console.log('finished')
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

    return curPaths.length?curPaths:[]

};


var findLadders=function(beginWord, endWord, wordList){
    let results=[]
    let visited={}
    let steps=Number.MAX_SAFE_INTEGER
    let pathq=[[beginWord]]
    let wordset=new Set(wordList)
    
    while(pathq.length>0){
        
        
        let curpath=pathq.shift()
        let curword=curpath[curpath.length-1]
        
        
        if(curpath.length>=steps){
                break
        }
        
        for(let i = 97; i < 123; i++){
            for(let j=0;j<curword.length;j++){
            let w=curword.substring(0, j)+String.fromCharCode(i)+curword.substring(j+1)
            if(w!==curword&&wordset.has(w)){
               if(!visited[w]){
                    pathq.push([...curpath,w])
                }
                if(w===endWord){
                    if(curpath.length<steps){
                        steps=curpath.length+1
                    }
                    results.push([...curpath,w])
                }
                
            }
        }
    }
        visited[curword]=true
        
        
        
    }
    
    return results
}

console.log(findLadders(
"cet",
"ism",
["kid","tag","pup","ail","tun","woo","erg","luz","brr","gay","sip","kay","per","val","mes","ohs","now","boa","cet","pal","bar","die","war","hay","eco","pub","lob","rue","fry","lit","rex","jan","cot","bid","ali","pay","col","gum","ger","row","won","dan","rum","fad","tut","sag","yip","sui","ark","has","zip","fez","own","ump","dis","ads","max","jaw","out","btu","ana","gap","cry","led","abe","box","ore","pig","fie","toy","fat","cal","lie","noh","sew","ono","tam","flu","mgm","ply","awe","pry","tit","tie","yet","too","tax","jim","san","pan","map","ski","ova","wed","non","wac","nut","why","bye","lye","oct","old","fin","feb","chi","sap","owl","log","tod","dot","bow","fob","for","joe","ivy","fan","age","fax","hip","jib","mel","hus","sob","ifs","tab","ara","dab","jag","jar","arm","lot","tom","sax","tex","yum","pei","wen","wry","ire","irk","far","mew","wit","doe","gas","rte","ian","pot","ask","wag","hag","amy","nag","ron","soy","gin","don","tug","fay","vic","boo","nam","ave","buy","sop","but","orb","fen","paw","his","sub","bob","yea","oft","inn","rod","yam","pew","web","hod","hun","gyp","wei","wis","rob","gad","pie","mon","dog","bib","rub","ere","dig","era","cat","fox","bee","mod","day","apr","vie","nev","jam","pam","new","aye","ani","and","ibm","yap","can","pyx","tar","kin","fog","hum","pip","cup","dye","lyx","jog","nun","par","wan","fey","bus","oak","bad","ats","set","qom","vat","eat","pus","rev","axe","ion","six","ila","lao","mom","mas","pro","few","opt","poe","art","ash","oar","cap","lop","may","shy","rid","bat","sum","rim","fee","bmw","sky","maj","hue","thy","ava","rap","den","fla","auk","cox","ibo","hey","saw","vim","sec","ltd","you","its","tat","dew","eva","tog","ram","let","see","zit","maw","nix","ate","gig","rep","owe","ind","hog","eve","sam","zoo","any","dow","cod","bed","vet","ham","sis","hex","via","fir","nod","mao","aug","mum","hoe","bah","hal","keg","hew","zed","tow","gog","ass","dem","who","bet","gos","son","ear","spy","kit","boy","due","sen","oaf","mix","hep","fur","ada","bin","nil","mia","ewe","hit","fix","sad","rib","eye","hop","haw","wax","mid","tad","ken","wad","rye","pap","bog","gut","ito","woe","our","ado","sin","mad","ray","hon","roy","dip","hen","iva","lug","asp","hui","yak","bay","poi","yep","bun","try","lad","elm","nat","wyo","gym","dug","toe","dee","wig","sly","rip","geo","cog","pas","zen","odd","nan","lay","pod","fit","hem","joy","bum","rio","yon","dec","leg","put","sue","dim","pet","yaw","nub","bit","bur","sid","sun","oil","red","doc","moe","caw","eel","dix","cub","end","gem","off","yew","hug","pop","tub","sgt","lid","pun","ton","sol","din","yup","jab","pea","bug","gag","mil","jig","hub","low","did","tin","get","gte","sox","lei","mig","fig","lon","use","ban","flo","nov","jut","bag","mir","sty","lap","two","ins","con","ant","net","tux","ode","stu","mug","cad","nap","gun","fop","tot","sow","sal","sic","ted","wot","del","imp","cob","way","ann","tan","mci","job","wet","ism","err","him","all","pad","hah","hie","aim","ike","jed","ego","mac","baa","min","com","ill","was","cab","ago","ina","big","ilk","gal","tap","duh","ola","ran","lab","top","gob","hot","ora","tia","kip","han","met","hut","she","sac","fed","goo","tee","ell","not","act","gil","rut","ala","ape","rig","cid","god","duo","lin","aid","gel","awl","lag","elf","liz","ref","aha","fib","oho","tho","her","nor","ace","adz","fun","ned","coo","win","tao","coy","van","man","pit","guy","foe","hid","mai","sup","jay","hob","mow","jot","are","pol","arc","lax","aft","alb","len","air","pug","pox","vow","got","meg","zoe","amp","ale","bud","gee","pin","dun","pat","ten","mob"]
    
    
    )
    
    
    )