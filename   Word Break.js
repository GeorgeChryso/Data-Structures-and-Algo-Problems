// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note:

// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.


// not wurft, TLE
var wordBreak = function(s, wordDict) {
   let base=26
   //hash each word from my dictionar to a number
   wordDict= wordDict.map(word=>{ 
        let n=word.length,res=0
        for (let i = 0; i < n; i++) 
            res+= (word.charCodeAt(i)-64)*(base**(i))           
        return res
   })
   // recurse through every possible position creating a number which represents 
   // the curr word being considered, if that number is in my set, then i can pick it
   // or not pick it
   let dict=new Set(wordDict),n=s.length
       ,rec=(realidx,hashidx,curr)=>{
        if(realidx==n)
            return curr==0
        let res=false
        curr+=(s.charCodeAt(realidx)-64)*(base**(hashidx))  
        if(dict.has(curr))
            res=res||rec(realidx+1,0,0)
        return res||rec(realidx+1,hashidx+1,curr)
   }
   return rec(0,0,0)
};


//dp  but with  a slice, we can do better than that 
var wordBreak = function(s, wordDict) {
   
    // dp[j]=is it possible to create s[0:j] 
    // if( s[j-word[i].length:j]==wordDict[i]
    // dp[j]=dp[j]||( dp[i][j-word[i].length] ), for every i

   let n=wordDict.length,m=s.length
        ,dp=[...Array(m+1)].map(d=>false)
    
   dp[0]=true

   for (let j = 1; j <=m; j++) 
        for (let i = 1; i <=n; i++) {
            if(dp[j]==true)
                break
            let word=wordDict[i-1]   
            if(j>=word.length)
                if(dp[j-word.length]==true)
                    dp[j]=s.slice(j-word.length,j)==word
            
        }       
   
   return dp[m]
};

// Intuition:
// in order to avoid using slice for the string comparison, first i will hash my dictionary 
// just like the first solution and then i will instead search through the previous indices of my string 
// instead of going through all the possible wordDict words, looking for a known hash value
var wordBreak = function(s, wordDict) {
     //hashing 
     let base=26,mod=1e9+9

     //hash each word from my wordDict to a number
     wordDict= wordDict.map(word=>{ 
          let n=word.length,res=0
          for (let i =n-1;i>=0; i--) 
              res+= (word.charCodeAt(i)-64)*(base**(n-1-i))          
          return res%mod
     })


    // dp[j]=is it possible to create s[0:j] 
    // if( s[j-word[i].length:j]==wordDict[i]
    // dp[j]=dp[j]||( dp[i][j-word[i].length] ), for every i

   let  dict=new Set(wordDict),m=s.length
        ,dp=[...Array(m+1)].map(d=>false)
    
   dp[0]=true
   for (let j = 1; j <=m; j++){
        let curr=0
        for (let i = j-1; i>=0; i--) {
            if(dp[j])break 
            curr+=(s.charCodeAt(i)-64)*(base**(j-i-1)) 
            if(dict.has(curr%mod))
                dp[j]=dp[i]
        }
   }
   return dp[m]
};




console.log(
    wordBreak(
        "fohhemkkaecojceoaejkkoedkofhmohkcjmkggcmnami",
        [
             "kfomka","hecagbngambii","anobmnikj","c","nnkmfelneemfgcl","ah","bgomgohl","lcbjbg","ebjfoiddndih","hjknoamjbfhckb","eioldlijmmla","nbekmcnakif","fgahmihodolmhbi","gnjfe","hk","b","jbfgm","ecojceoaejkkoed","cemodhmbcmgl","j","gdcnjj","kolaijoicbc","liibjjcini","lmbenj","eklingemgdjncaa","m","hkh","fblb","fk","nnfkfanaga","eldjml","iejn","gbmjfdooeeko","jafogijka","ngnfggojmhclkjd","bfagnfclg","imkeobcdidiifbm","ogeo","gicjog","cjnibenelm","ogoloc","edciifkaff","kbeeg","nebn","jdd","aeojhclmdn","dilbhl","dkk","bgmck","ohgkefkadonafg","labem","fheoglj","gkcanacfjfhogjc","eglkcddd","lelelihakeh","hhjijfiodfi","enehbibnhfjd","gkm","ggj","ag","hhhjogk","lllicdhihn","goakjjnk","lhbn","fhheedadamlnedh","bin","cl","ggjljjjf","fdcdaobhlhgj","nijlf","i","gaemagobjfc","dg","g","jhlelodgeekj","hcimohlni","fdoiohikhacgb","k","doiaigclm","bdfaoncbhfkdbjd","f","jaikbciac","cjgadmfoodmba","molokllh","gfkngeebnggo","lahd","n","ehfngoc","lejfcee","kofhmoh","cgda","de","kljnicikjeh","edomdbibhif","jehdkgmmofihdi","hifcjkloebel","gcghgbemjege","kobhhefbbb","aaikgaolhllhlm","akg","kmmikgkhnn","dnamfhaf","mjhj","ifadcgmgjaa","acnjehgkflgkd","bjj","maihjn","ojakklhl","ign","jhd","kndkhbebgh","amljjfeahcdlfdg","fnboolobch","gcclgcoaojc","kfokbbkllmcd","fec","dljma","noa","cfjie","fohhemkka","bfaldajf","nbk","kmbnjoalnhki","ccieabbnlhbjmj","nmacelialookal","hdlefnbmgklo","bfbblofk","doohocnadd","klmed","e","hkkcmbljlojkghm","jjiadlgf","ogadjhambjikce","bglghjndlk","gackokkbhj","oofohdogb","leiolllnjj","edekdnibja","gjhglilocif","ccfnfjalchc","gl","ihee","cfgccdmecem","mdmcdgjelhgk","laboglchdhbk","ajmiim","cebhalkngloae","hgohednmkahdi","ddiecjnkmgbbei","ajaengmcdlbk","kgg","ndchkjdn","heklaamafiomea","ehg","imelcifnhkae","hcgadilb","elndjcodnhcc","nkjd","gjnfkogkjeobo","eolega","lm","jddfkfbbbhia","cddmfeckheeo","bfnmaalmjdb","fbcg","ko","mojfj","kk","bbljjnnikdhg","l","calbc","mkekn","ejlhdk","hkebdiebecf","emhelbbda","mlba","ckjmih","odfacclfl","lgfjjbgookmnoe","begnkogf","gakojeblk","bfflcmdko","cfdclljcg","ho","fo","acmi","oemknmffgcio","mlkhk","kfhkndmdojhidg","ckfcibmnikn","dgoecamdliaeeoa","ocealkbbec","kbmmihb","ncikad","hi","nccjbnldneijc","hgiccigeehmdl","dlfmjhmioa","kmff","gfhkd","okiamg","ekdbamm","fc","neg","cfmo","ccgahikbbl","khhoc","elbg","cbghbacjbfm","jkagbmfgemjfg","ijceidhhajmja","imibemhdg","ja","idkfd","ndogdkjjkf","fhic","ooajkki","fdnjhh","ba","jdlnidngkfffbmi","jddjfnnjoidcnm","kghljjikbacd","idllbbn","d","mgkajbnjedeiee","fbllleanknmoomb","lom","kofjmmjm","mcdlbglonin","gcnboanh","fggii","fdkbmic","bbiln","cdjcjhonjgiagkb","kooenbeoongcle","cecnlfbaanckdkj","fejlmog","fanekdneoaammb","maojbcegdamn","bcmanmjdeabdo","amloj","adgoej","jh","fhf","cogdljlgek","o","joeiajlioggj","oncal","lbgg","elainnbffk","hbdi","femcanllndoh","ke","hmib","nagfahhljh","ibifdlfeechcbal","knec","oegfcghlgalcnno","abiefmjldmln","mlfglgni","jkofhjeb","ifjbneblfldjel","nahhcimkjhjgb","cdgkbn","nnklfbeecgedie","gmllmjbodhgllc","hogollongjo","fmoinacebll","fkngbganmh","jgdblmhlmfij","fkkdjknahamcfb","aieakdokibj","hddlcdiailhd","iajhmg","jenocgo","embdib","dghbmljjogka","bahcggjgmlf","fb","jldkcfom","mfi","kdkke","odhbl","jin","kofig","bid","ohnohi","fcbojdgoaoa","dj","ifkbmbod","dhdedohlghk","nmkeakohicfdjf","ahbifnnoaldgbj","egldeibiinoac","iehfhjjjmil","bmeimi","ombngooicknel","lfdkngobmik","ifjcjkfnmgjcnmi","fmf","aoeaa","an","ffgddcjblehhggo","hijfdcchdilcl","hacbaamkhblnkk","najefebghcbkjfl","hcnnlogjfmmjcma","njgcogemlnohl","ihejh","ej","ofn","ggcklj","omah","hg","obk","giig","cklna","lihaiollfnem","ionlnlhjckf","cfdlijnmgjoebl","dloehimen","acggkacahfhkdne","iecd","gn","odgbnalk","ahfhcd","dghlag","bchfe","dldblmnbifnmlo","cffhbijal","dbddifnojfibha","mhh","cjjol","fed","bhcnf","ciiibbedklnnk","ikniooicmm","ejf","ammeennkcdgbjco","jmhmd","cek","bjbhcmda","kfjmhbf","chjmmnea","ifccifn","naedmco","iohchafbega","kjejfhbco","anlhhhhg",
            "kcjmkggcmnami"]
    )
)

326426434
326425922