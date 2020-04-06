var groupAnagrams = function(strs) {

    
    //calculate hash
    let hash=str=>{

        let sum=0
        for (let i = 0; i < str.length; i++) {
            const letter = str[i];
            sum+=letter.charCodeAt(0)*7+(1-letter.charCodeAt(0))*letter.charCodeAt(0)*letter.charCodeAt(0)*7+1.33+7*letter.charCodeAt(0)
        }
        
        return sum
    }

   
    let codes={}

    for (const string of strs) {
        
        let h=hash(string)

        if(codes[h]===undefined)codes[h]=[string]
        else{
            codes[h].push(string)
        }
    }

    return Object.values(codes)
};