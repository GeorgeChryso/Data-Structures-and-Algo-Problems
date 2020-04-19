






var reformat = function(s) {
    
    let chars=''
    let nums=''
    let result=''
    for (const char of s) {
        if(char.charCodeAt(0)<97)nums=nums+''+char
        else chars=chars+''+char
    }
    console.log(chars,nums)
    if(Math.abs(chars.length-nums.length)>1)return ''
    
    if(chars.length>nums.length){

        for (var i = 0; i < nums.length; i++) {
            result+=''+chars[i]+''+nums[i]
        }
        
        for (let r = i; r < chars.length; r++) {
            result=result+''+chars[i]            
        }
    }
    else{

            for (var i = 0; i < chars.length; i++) {
                result+=''+nums[i]+''+chars[i]
            }
            
            for (let r = i; r < nums.length; r++) {
                result=result+''+nums[i]            
            }
        
    }
    return result
};

var displayTable = function(orders) {
    
    let tables={}

    let food={}
    for (const [n,t,f] of orders) {
        
        if(tables[t]==undefined){
            tables[t]={}
            tables[t][f]=1
        }
        else{
            
            if(tables[t][f]==undefined)tables[t][f]=1
            else tables[t][f]++

        }

        if(food[f]==undefined){
            food[f]=[]
        }
    }

    let result=[]
    let foods=[...Object.keys(food)]
    foods.sort()
    foods.unshift('Table')

    let tab=Object.keys(tables).sort((a,b)=>Number(a)-Number(b))
    

    result.push([...foods])
    for (const tableNum of tab) {
        let row=[tableNum]
        for (const f of foods) {
            if(f=='Table')continue
            if(tables[tableNum][f]==undefined)row.push('0')
            else row.push(String(tables[tableNum][f]))
        }
        result.push(row)
    }   
    return result
};


var minNumberOfFrogs = function(s) {
    let r=0
    let q=[]
    let memo=-1
    for (let i = 0; i < s.length; i++) {
        if(s[i]=='c'){
            q.push('c')
        }
        if(s[i]=='r'){
            let fl=false
           for (let k = 0; k < q.length; k++) {
                if(q[k]=='c'){
                    fl=true
                    q[k]+='r'
                    break
                } 
           }
           if(fl==false)return -1
        }
        if(s[i]=='o'){
            let fl=false
            for (let k = 0; k < q.length; k++) {
                 if(q[k]=='cr'){
                     fl=true
                     q[k]+='o'
                     break
                 } 
            }
            if(fl==false)return -1
        }
        if(s[i]=='a'){
            let fl=false
            for (let k = 0; k < q.length; k++) {
                 if(q[k]=='cro'){
                     fl=true
                     q[k]+='a'
                     break
                 } 
            }
            if(fl==false)return -1
        }
        if(s[i]=='k'){
            let fl=false
            for (let k = 0; k < q.length; k++) {
                 if(q[k]=='croa'){
                     fl=true
                     q[k]+='k'
                     r++
                     break
                 } 
            }
            if(fl==false)return -1
        }
    }
    console.log(q,memo)
    if(q[q.length-1]!=='croak')return -1
    let res
    if(memo!==-1){
        res=q.reduce((acc,curr,i)=>acc+(i<=memo?Number(curr=='croak'):0),0)
    }
    else{
        res=q.reduce((acc,curr,i)=>acc+Number(curr=='croak'),0)
    }
    return res==0?-1:res
};
console.log(minNumberOfFrogs(
    //"croakcroak"
  //  "crcoakroak"
  "crocakcroraoakk"
  //  "ccrrooaakk"
))